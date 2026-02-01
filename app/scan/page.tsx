'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ScanPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState<string>('reading')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis phases
    const phases = ['reading', 'analyzing', 'searching', 'verifying']
    for (let i = 0; i < phases.length; i++) {
      setProgress(phases[i])
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // Convert to base64 and store
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      sessionStorage.setItem('scannedImage', base64)
      sessionStorage.setItem('fileName', file.name)

      // Analyze and redirect to result
      analyzeImage(base64)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (base64Image: string) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      })

      const result = await response.json()
      sessionStorage.setItem('analysisResult', JSON.stringify(result))
      router.push('/result')
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Analysis failed. Please try again.')
      setIsAnalyzing(false)
    }
  }

  const progressSteps = {
    reading: {
      title: 'Reading Image...',
      subtitle: 'Extracting text from photo',
    },
    analyzing: {
      title: 'Analyzing Ingredients...',
      subtitle: 'Checking for Halal/Haram status',
    },
    searching: {
      title: 'Searching Web...',
      subtitle: 'Looking up product information',
    },
    verifying: {
      title: 'Verifying Results...',
      subtitle: 'Cross-checking ingredients',
    },
  }

  if (isAnalyzing) {
    const currentStep = progressSteps[progress as keyof typeof progressSteps]
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-700 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3">{currentStep.title}</h2>
          <p className="text-emerald-100">{currentStep.subtitle}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/40 p-6">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>

      {/* Upload area */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          Upload Product Image
        </h1>
        <p className="text-gray-600 mb-12 text-center">
          Take a photo of the ingredients label or upload an image
        </p>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-300 bg-white/60 backdrop-blur-sm hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {isDragging ? 'Drop image here' : 'Click or drag image here'}
          </h3>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG, HEIC
          </p>
        </div>

        {/* Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Good Lighting</h4>
              <p className="text-sm text-gray-600">
                Ensure the label is well-lit and clearly visible
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
            <div className="text-2xl">📸</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Close Up</h4>
              <p className="text-sm text-gray-600">
                Take a close-up photo of the ingredients list
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
