'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import InteractiveElement from '@/components/InteractiveElementClean'
import { Globe, BookOpen, Play, Monitor } from 'lucide-react'

export default function WordTutorialPage() {
  const [currentLesson, setCurrentLesson] = useState('opening-word')
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }

  const lessons = {
    en: [
      {
        id: 'opening-word',
        title: 'Opening Microsoft Word',
        description: 'Learn how to start Microsoft Word on your computer',
        icon: <Play className="w-6 h-6" />,
        duration: '3 min'
      },
      {
        id: 'word-online-simulator', 
        title: 'Word Online Experience',
        description: 'Interactive simulation of Microsoft Word Online',
        icon: <Monitor className="w-6 h-6" />,
        duration: '5 min'
      }
    ],
    ar: [
      {
        id: 'opening-word',
        title: 'فتح مايكروسوفت وورد',
        description: 'تعلم كيفية بدء تشغيل مايكروسوفت وورد على جهاز الكمبيوتر',
        icon: <Play className="w-6 h-6" />,
        duration: '3 دقائق'
      },
      {
        id: 'word-online-simulator',
        title: 'تجربة وورد أونلاين',
        description: 'محاكاة تفاعلية لمايكروسوفت وورد أونلاين',
        icon: <Monitor className="w-6 h-6" />,
        duration: '5 دقائق'
      }
    ]
  }

  const translations = {
    en: {
      title: "Microsoft Word Tutorial for Beginners",
      subtitle: "Interactive lessons to master Microsoft Word",
      languageSwitch: "العربية",
      selectLesson: "Select a Lesson",
      currentLesson: "Current Lesson"
    },
    ar: {
      title: "دروس مايكروسوفت وورد للمبتدئين",
      subtitle: "دروس تفاعلية لإتقان مايكروسوفت وورد",
      languageSwitch: "English",
      selectLesson: "اختر درساً",
      currentLesson: "الدرس الحالي"
    }
  }

  const t = translations[language]
  const isRTL = language === 'ar'

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className={`text-4xl font-bold text-gray-900 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t.title}
              </h1>
            </div>
            
            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span>{t.languageSwitch}</span>
            </motion.button>
          </div>
          
          <p className={`text-xl text-gray-600 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Lesson Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Lesson List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <h2 className={`text-2xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.selectLesson}
            </h2>
            
            <div className="space-y-4">
              {lessons[language].map((lesson) => (
                <motion.button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    currentLesson === lesson.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-lg ${
                        currentLesson === lesson.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {lesson.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-gray-900 ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {lesson.title}
                        </h3>
                        <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {lesson.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content - Interactive Lesson */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className={`text-2xl font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {t.currentLesson}
                </h2>
                <div className="h-1 bg-gray-200 rounded-full">
                  <motion.div
                    className="h-1 bg-blue-600 rounded-full"
                    animate={{ width: currentLesson === 'opening-word' ? '50%' : '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Interactive Element */}
              <InteractiveElement 
                type={currentLesson} 
                language={language}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Arabic Font Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
        
        .font-arabic {
          font-family: 'Cairo', sans-serif;
        }
        
        /* RTL support */
        [dir="rtl"] {
          text-align: right;
        }
        
        [dir="rtl"] .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
        }
        
        /* Arabic typography improvements */
        [dir="rtl"] p, [dir="rtl"] span {
          line-height: 1.8;
        }
        
        /* Ensure proper Arabic text rendering */
        .font-arabic {
          font-feature-settings: "liga" 1, "calt" 1;
          text-rendering: optimizeLegibility;
        }
      `}</style>
    </div>
  )
}
