'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface AnalysisResult {
  status: 'halal' | 'haram' | 'unknown'
  confidence: number
  reasoning: string
  detected_ingredients: string[]
  haram_ingredients: string[]
  warnings: string[]
  feedback_message: string
}

export default function ResultPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const storedResult = sessionStorage.getItem('analysisResult')
    const storedImage = sessionStorage.getItem('scannedImage')

    if (!storedResult) {
      router.push('/scan')
      return
    }

    setResult(JSON.parse(storedResult))
    setImageUrl(storedImage || '')
  }, [router])

  if (!result) {
    return null
  }

  const statusConfig = {
    halal: {
      color: 'emerald',
      icon: '✓',
      title: 'HALAL',
      bgGradient: 'from-emerald-600 to-emerald-500',
    },
    haram: {
      color: 'blue',
      icon: '✕',
      title: 'HARAM',
      bgGradient: 'from-blue-700 to-blue-600',
    },
    unknown: {
      color: 'amber',
      icon: '?',
      title: 'UNKNOWN',
      bgGradient: 'from-amber-600 to-amber-500',
    },
  }

  const config = statusConfig[result.status]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 pb-12">
      {/* Result Header */}
      <div className={`bg-gradient-to-r ${config.bgGradient} text-white py-12 px-6`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-4xl font-bold">{config.icon}</span>
          </div>
          <h1 className="text-5xl font-bold mb-3">{config.title}</h1>
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-sm font-medium">
              {Math.round(result.confidence * 100)}% Confidence
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-6">
        {/* Feedback Message Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">📋</span>
            Analysis Result
          </h2>
          <p className="text-gray-700 leading-relaxed">{result.feedback_message}</p>
        </div>

        {/* Scanned Image */}
        {imageUrl && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">📸</span>
              Scanned Image
            </h2>
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt="Scanned product"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Detected Ingredients */}
        {result.detected_ingredients.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">🔍</span>
              Detected Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.detected_ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {result.detected_ingredients.length} ingredients scanned
            </p>
          </div>
        )}

        {/* Haram Ingredients */}
        {result.haram_ingredients.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Haram Ingredients Found
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.haram_ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {result.warnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
            <h2 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Warnings
            </h2>
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li key={index} className="text-amber-900 text-sm flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reasoning */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">💭</span>
            Analysis Reasoning
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{result.reasoning}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/scan"
            className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Scan Another
          </Link>
          <Link
            href="/"
            className="flex-1 py-4 px-6 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold text-center hover:border-gray-300 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}
