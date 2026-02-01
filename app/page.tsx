'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ko'>('en')

  const t = {
    en: {
      title: 'Halal Scan',
      subtitle: 'AI-Powered Halal Verification',
      description: 'Instantly verify if food products are halal using advanced AI technology',
      startScan: 'Start Scanning',
      features: {
        instant: {
          title: 'Instant Analysis',
          desc: 'Get results in seconds'
        },
        accurate: {
          title: 'AI-Powered',
          desc: 'Advanced ingredient detection'
        },
        comprehensive: {
          title: 'Comprehensive',
          desc: 'Checks all ingredients'
        }
      }
    },
    ko: {
      title: '할랄 스캔',
      subtitle: 'AI 기반 할랄 인증',
      description: '고급 AI 기술을 사용하여 식품이 할랄인지 즉시 확인하세요',
      startScan: '스캔 시작',
      features: {
        instant: {
          title: '즉시 분석',
          desc: '몇 초 만에 결과 확인'
        },
        accurate: {
          title: 'AI 기반',
          desc: '고급 성분 감지'
        },
        comprehensive: {
          title: '종합적',
          desc: '모든 성분 확인'
        }
      }
    }
  }

  const text = t[language]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/40">
      {/* Decorative circles */}
      <div className="fixed top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="fixed bottom-[-50px] left-[-100px] w-[250px] h-[250px] rounded-full bg-emerald-500/5 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 py-4">
        <div className="w-10" />
        <button
          onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
          className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
        >
          {language === 'en' ? '한국어' : 'English'}
        </button>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 rounded-full blur-2xl w-[180px] h-[180px]" />
          <div className="relative w-32 h-32 flex items-center justify-center">
            <span className="text-7xl">🕌</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4">
          <span className="text-5xl md:text-6xl font-extrabold text-emerald-700 tracking-tight">
            Halal
          </span>
          <span className="text-5xl md:text-6xl font-light text-gray-800 tracking-tight">
            Scan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl">
          {text.description}
        </p>

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 mb-12">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-emerald-700 tracking-wide">
            AI-Powered Analysis
          </span>
        </div>

        {/* CTA Button */}
        <Link
          href="/scan"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
        >
          <span>{text.startScan}</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {text.features.instant.title}
            </h3>
            <p className="text-sm text-gray-600">
              {text.features.instant.desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {text.features.accurate.title}
            </h3>
            <p className="text-sm text-gray-600">
              {text.features.accurate.desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {text.features.comprehensive.title}
            </h3>
            <p className="text-sm text-gray-600">
              {text.features.comprehensive.desc}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
