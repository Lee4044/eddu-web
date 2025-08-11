'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer, Info, CheckCircle, Play, FileText, Save, Type, Image, ArrowRight, ArrowLeft, BookOpen, Globe } from 'lucide-react'

// Language Context
const useLanguage = () => {
  const [language, setLanguage] = useState('en') // 'en' for English, 'ar' for Arabic
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en')
  }
  
  return { language, toggleLanguage }
}

// Translation object
const translations = {
  en: {
    languageSwitcher: "العربية",
    wordTutorial: "Microsoft Word Tutorial",
    step: "Step",
    of: "of",
    previous: "Previous",
    next: "Next",
    completed: "Completed",
    complete: "Complete This Step",
    openingWord: {
      title: "Opening Microsoft Word",
      steps: [
        {
          title: "Finding Microsoft Word",
          instruction: "Click on the Microsoft Word icon on your desktop",
          description: "Look for the blue \"W\" icon labeled \"Microsoft Word\""
        },
        {
          title: "Or use Start Menu", 
          instruction: "Alternatively, click the Start button and search for \"Word\"",
          description: "You can also find Word through the Windows Start menu"
        },
        {
          title: "Word Start Screen",
          instruction: "Choose \"Blank Document\" to create a new document", 
          description: "The Start Screen shows templates and recent documents"
        }
      ]
    },
    interfaceTour: {
      title: "Word Interface Tour",
      hotspots: [
        {
          title: "Title Bar",
          description: "Shows the document name and program controls",
          details: "The title bar displays \"Document1 - Word\" for new documents. The minimize, maximize, and close buttons are on the right."
        },
        {
          title: "Quick Access Toolbar",
          description: "Frequently used commands like Save, Undo, and Redo",
          details: "This toolbar can be customized to include your most-used commands for quick access."
        },
        {
          title: "Ribbon",
          description: "Main command interface organized by tabs",
          details: "The Ribbon contains all Word commands organized into logical groups. Click tabs like Home, Insert, Layout to access different features."
        }
      ]
    }
  },
  ar: {
    languageSwitcher: "English",
    wordTutorial: "دروس مايكروسوفت وورد",
    step: "خطوة",
    of: "من",
    previous: "السابق",
    next: "التالي", 
    completed: "مكتمل",
    complete: "أكمل هذه الخطوة",
    openingWord: {
      title: "فتح مايكروسوفت وورد",
      steps: [
        {
          title: "العثور على مايكروسوفت وورد",
          instruction: "انقر على أيقونة مايكروسوفت وورد على سطح المكتب",
          description: "ابحث عن الأيقونة الزرقاء \"W\" المسماة \"Microsoft Word\""
        },
        {
          title: "أو استخدم قائمة ابدأ",
          instruction: "بدلاً من ذلك، انقر على زر ابدأ وابحث عن \"Word\"",
          description: "يمكنك أيضاً العثور على وورد من خلال قائمة ابدأ في ويندوز"
        },
        {
          title: "شاشة بداية وورد",
          instruction: "اختر \"مستند فارغ\" لإنشاء مستند جديد",
          description: "تُظهر شاشة البداية القوالب والمستندات الأخيرة"
        }
      ]
    },
    interfaceTour: {
      title: "جولة في واجهة وورد",
      hotspots: [
        {
          title: "شريط العنوان",
          description: "يعرض اسم المستند وعناصر التحكم في البرنامج",
          details: "يعرض شريط العنوان \"Document1 - Word\" للمستندات الجديدة. أزرار التصغير والتكبير والإغلاق على اليمين."
        },
        {
          title: "شريط الأدوات السريع",
          description: "الأوامر المستخدمة بكثرة مثل حفظ وتراجع وإعادة",
          details: "يمكن تخصيص هذا الشريط لتضمين الأوامر الأكثر استخداماً للوصول السريع."
        },
        {
          title: "الشريط",
          description: "واجهة الأوامر الرئيسية منظمة حسب علامات التبويب",
          details: "يحتوي الشريط على جميع أوامر وورد منظمة في مجموعات منطقية. انقر على علامات التبويب مثل الصفحة الرئيسية وإدراج وتخطيط للوصول إلى ميزات مختلفة."
        }
      ]
    }
  }
}

// Language Switcher Component
const LanguageSwitcher = ({ language, toggleLanguage }) => {
  return (
    <motion.button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${language === 'ar' ? 'font-arabic' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="w-4 h-4" />
      <span>{translations[language].languageSwitcher}</span>
    </motion.button>
  )
}

// Interactive Lesson 1: Opening Microsoft Word
const OpeningWordLesson = ({ language = 'en' }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const t = translations[language]
  const isRTL = language === 'ar'

  const steps = t.openingWord.steps.map((step, index) => ({
    ...step,
    x: 25 + index * 25,
    y: 30 + index * 10,
    completed: false
  }))

  const handleStepClick = (stepIndex) => {
    setCompletedSteps(new Set([...completedSteps, stepIndex]))
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">{t.openingWord.title}</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Mock Desktop Environment */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
        
        {/* Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 flex items-center px-2">
          <motion.button
            className="w-10 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold mr-2"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleStepClick(0)}
          >
            ⊞
          </motion.button>
          <div className="flex-1 flex items-center space-x-1">
            <div className="w-8 h-8 bg-gray-600 rounded"></div>
            <div className="w-8 h-8 bg-gray-600 rounded"></div>
          </div>
          <div className="text-white text-sm">12:34 PM</div>
        </div>

        {/* Start Menu (conditional) */}
        {completedSteps.has(0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-12 left-2 w-64 bg-white rounded-lg shadow-xl p-4"
          >
            <div className="mb-4">
              <input 
                type="text" 
                placeholder={language === 'ar' ? "اكتب هنا للبحث" : "Type here to search"}
                className="w-full px-3 py-2 border rounded"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <motion.button
                className="p-3 text-center hover:bg-gray-100 rounded"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleStepClick(1)}
              >
                <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-1"></div>
                <div className="text-xs">Word</div>
              </motion.button>
              <div className="p-3 text-center">
                <div className="w-8 h-8 bg-green-600 rounded mx-auto mb-1"></div>
                <div className="text-xs">Excel</div>
              </div>
              <div className="p-3 text-center">
                <div className="w-8 h-8 bg-orange-600 rounded mx-auto mb-1"></div>
                <div className="text-xs">PowerPoint</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating step indicators */}
        {steps.map((step, index) => (
          <motion.button
            key={index}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
              completedSteps.has(index) ? 'bg-green-500' : index === currentStep ? 'bg-yellow-400' : 'bg-blue-500'
            } text-white`}
            style={{ left: `${step.x}%`, top: `${step.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => handleStepClick(index)}
            whileHover={{ scale: 1.1 }}
          >
            {completedSteps.has(index) ? <CheckCircle className="w-5 h-5" /> : index + 1}
          </motion.button>
        ))}

        {/* Current Step Instructions */}
        <AnimatePresence>
          {currentStep < steps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <h4 className="font-semibold text-gray-900 mb-1">{steps[currentStep].title}</h4>
              <p className="text-sm text-gray-700 mb-2">{steps[currentStep].instruction}</p>
              <p className="text-xs text-gray-500">{steps[currentStep].description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Word Online Simulator with Arabic Support
const WordOnlineSimulator = ({ language = 'en' }) => {
  const [isDocumentReady, setIsDocumentReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const t = translations[language]
  const isRTL = language === 'ar'

  // Auto-loading simulation
  useState(() => {
    const timer = setTimeout(() => {
      setIsDocumentReady(true)
      setProgress(100)
    }, 2000)
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Browser Header */}
      <div className="bg-gray-100 px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
            office.com/word
          </div>
        </div>
      </div>

      {/* Word Online Interface */}
      <div className="bg-white">
        {/* Word Ribbon */}
        <div className="border-b bg-gray-50">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-semibold">{language === 'ar' ? 'مستند1' : 'Document1'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  {language === 'ar' ? 'مشاركة' : 'Share'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-4">
            <div className="flex space-x-6 text-sm">
              <button className="px-2 py-1 border-b-2 border-blue-600 text-blue-600">
                {language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
              </button>
              <button className="px-2 py-1 text-gray-600 hover:text-gray-900">
                {language === 'ar' ? 'إدراج' : 'Insert'}
              </button>
              <button className="px-2 py-1 text-gray-600 hover:text-gray-900">
                {language === 'ar' ? 'تخطيط' : 'Layout'}
              </button>
              <button className="px-2 py-1 text-gray-600 hover:text-gray-900">
                {language === 'ar' ? 'مراجع' : 'References'}
              </button>
            </div>
          </div>
        </div>

        {/* Document Area */}
        <div className="p-8 bg-gray-100 min-h-96">
          {!isDocumentReady ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 mb-2">
                {language === 'ar' ? 'جارٍ تحميل وورد أونلاين...' : 'Loading Word Online...'}
              </p>
              <div className="w-64 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
              style={{ aspectRatio: '8.5/11' }}
            >
              <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="text-xs text-gray-400">
                    {language === 'ar' ? 'حفظ تلقائي مُفعّل' : 'AutoSave on'}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>

                {/* Cursor indicator */}
                <motion.div
                  className="w-0.5 h-4 bg-black"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ marginLeft: isRTL ? 'auto' : '0', marginRight: isRTL ? '0' : 'auto' }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Interactive Element Component with Language Support
export default function InteractiveElement({ type, step, language: propLanguage }) {
  const { language: contextLanguage, toggleLanguage } = useLanguage()
  const language = propLanguage || contextLanguage
  
  return (
    <div className="space-y-4">
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher language={language} toggleLanguage={toggleLanguage} />
      </div>
      
      {/* Main Content */}
      <div className={language === 'ar' ? 'font-arabic' : ''}>
        {(() => {
          switch (type) {
            case 'opening-word':
              return <OpeningWordLesson language={language} />
            case 'word-online-simulator':
              return <WordOnlineSimulator language={language} />
            default:
              return (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600">Interactive element: {type}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Available types: opening-word, word-online-simulator
                  </p>
                </div>
              )
          }
        })()}
      </div>
    </div>
  )
}
