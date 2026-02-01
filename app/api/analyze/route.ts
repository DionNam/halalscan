import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL_NAME = 'google/gemini-2.0-flash-001'

interface AnalysisResult {
  status: 'halal' | 'haram' | 'unknown'
  confidence: number
  reasoning: string
  detected_ingredients: string[]
  haram_ingredients: string[]
  warnings: string[]
  has_halal_mark: boolean
  red_packaging: boolean
  image_quality: {
    is_blurry: boolean
    has_text: boolean
    is_ingredient_label: boolean
  }
  feedback_message: string
}

const HALAL_PROMPT = `You are a Halal food certification expert. Analyze this product image and determine if it's Halal, Haram, or Unknown.

PRIORITY RULES (check in this order):
1. Image Quality Check (highest priority for rejection)
   - If image is blurry or has no text → UNKNOWN

2. Halal Mark Detection (highest priority for acceptance)
   - If official halal certification mark present → HALAL

3. Red Packaging Rule (without halal mark)
   - If red packaging AND no halal mark → HARAM (85% confidence)

4. Ingredient Analysis
   - Check all ingredients against halal/haram lists
   - Any meat without halal certification → HARAM
   - Any alcohol/pork derivatives → HARAM

5. If no clear determination → UNKNOWN

Return JSON format:
{
  "status": "halal" | "haram" | "unknown",
  "confidence": 0.0-1.0,
  "reasoning": "explanation",
  "detected_ingredients": ["ingredient1", "ingredient2"],
  "haram_ingredients": ["haram1"],
  "warnings": ["warning1"],
  "has_halal_mark": boolean,
  "red_packaging": boolean,
  "image_quality": {
    "is_blurry": boolean,
    "has_text": boolean,
    "is_ingredient_label": boolean
  },
  "feedback_message": "user-friendly message"
}

Respond with ONLY valid JSON.`

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Call OpenRouter API
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://halalscan.vercel.app',
        'X-Title': 'Halal Scan Web',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: image,
                },
              },
              {
                type: 'text',
                text: HALAL_PROMPT,
              },
            ],
          },
        ],
        temperature: 0.1,
        max_tokens: 2048,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      return NextResponse.json(
        { error: 'AI analysis failed' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const responseText = data.choices?.[0]?.message?.content

    if (!responseText) {
      return NextResponse.json(
        { error: 'Empty response from AI' },
        { status: 500 }
      )
    }

    // Extract JSON from response
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonString = jsonMatch ? jsonMatch[1].trim() : responseText.trim()

    const result: AnalysisResult = JSON.parse(jsonString)

    // Apply conservative verification
    const finalResult = applyConservativeChecks(result)

    return NextResponse.json(finalResult)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      {
        error: 'Analysis failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function applyConservativeChecks(result: AnalysisResult): AnalysisResult {
  // Conservative mode: if any uncertainty, mark as HARAM or UNKNOWN
  const { detected_ingredients, haram_ingredients } = result

  // Check for any meat-related ingredients
  const meatKeywords = ['chicken', 'beef', 'meat', 'gelatin', 'enzyme', 'rennet']
  const hasMeat = detected_ingredients.some(ing =>
    meatKeywords.some(keyword => ing.toLowerCase().includes(keyword))
  )

  if (hasMeat && !result.has_halal_mark) {
    return {
      ...result,
      status: 'haram',
      confidence: 0.9,
      feedback_message: 'Contains meat ingredients without halal certification.',
      haram_ingredients: detected_ingredients.filter(ing =>
        meatKeywords.some(keyword => ing.toLowerCase().includes(keyword))
      ),
    }
  }

  return result
}
