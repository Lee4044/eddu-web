'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  ArrowLeft,
  ArrowRight,
  Download,
  Share2,
  Bookmark
} from 'lucide-react'
import VideoPlayer from '../../../components/VideoPlayer'
import InteractiveElement from '../../../components/InteractiveElement'

const lessonData = {
  1: {
    id: 1,
    title: "Getting Started with Word",
    description: "Learn the basics of Microsoft Word interface, ribbon, and essential tools",
    duration: "25 min",
    difficulty: "Beginner",
    category: "Basics",
    videoSrc: "/videos/lesson1.mp4",
    completed: false,
    rating: 4.8,
    enrolledCount: 12567,
    sections: [
      {
        id: 1,
        title: "Opening Microsoft Word",
        type: "interactive",
        duration: "3 min",
        content: "Learn different ways to open Microsoft Word on your computer",
        completed: false,
        interactiveType: "opening-word"
      },
      {
        id: 2,
        title: "Understanding the Word Interface",
        type: "interactive",
        duration: "8 min",
        content: "Explore all parts of the Microsoft Word interface with our interactive tour",
        completed: false,
        interactiveType: "interface-tour"
      },
      {
        id: 3,
        title: "Creating Your First Document",
        type: "interactive",
        duration: "5 min",
        content: "Step-by-step guide to creating a new blank document",
        completed: false,
        interactiveType: "create-document"
      },
      {
        id: 4,
        title: "Typing Your First Text",
        type: "interactive",
        duration: "4 min",
        content: "Practice typing text in your Word document",
        completed: false,
        interactiveType: "basic-typing"
      },
      {
        id: 5,
        title: "Basic Text Formatting",
        type: "interactive",
        duration: "6 min",
        content: "Learn to make text bold, italic, change colors and sizes",
        completed: false,
        interactiveType: "text-formatting"
      },
      {
        id: 6,
        title: "Saving Your Document",
        type: "interactive",
        duration: "4 min",
        content: "Learn how to save your work properly",
        completed: false,
        interactiveType: "save-document"
      },
      {
        id: 7,
        title: "Adding Images to Documents",
        type: "interactive",
        duration: "5 min",
        content: "Insert and format images in your Word documents",
        completed: false,
        interactiveType: "insert-images"
      },
      {
        id: 8,
        title: "Review and Practice",
        type: "interactive",
        duration: "10 min",
        content: "Review everything you've learned and practice your new skills",
        completed: false,
        interactiveType: "final-review"
      },
      {
        id: 9,
        title: "Word Online Experience",
        type: "interactive",
        duration: "15 min",
        content: "Experience a realistic Word Online browser simulation with interactive features",
        completed: false,
        interactiveType: "word-online-simulator"
      }
    ],
    objectives: [
      "Open Microsoft Word successfully",
      "Understand all parts of the Word interface",
      "Create and save new documents",
      "Type and format text professionally",
      "Insert images into documents",
      "Navigate Word efficiently for basic tasks"
    ],
    prerequisites: [
      "Basic computer navigation skills",
      "Microsoft Word installed on your computer",
      "Mouse and keyboard familiarity"
    ],
    resources: [
      {
        title: "Word Interface Reference Card",
        type: "pdf",
        url: "/resources/word-interface-guide.pdf"
      },
      {
        title: "Keyboard Shortcuts Guide",
        type: "pdf", 
        url: "/resources/word-shortcuts.pdf"
      },
      {
        title: "Practice Exercises",
        type: "interactive",
        url: "/practice/basic-word-skills"
      }
    ]
  }
}

export default function LessonDetail() {
  const params = useParams()
  const router = useRouter()
  const lessonId = parseInt(params.id)
  const lesson = lessonData[lessonId]

  const [currentSection, setCurrentSection] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [sectionProgress, setSectionProgress] = useState({})
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (!lesson) {
      router.push('/lessons')
      return
    }
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`lesson-${lessonId}-progress`)
    if (savedProgress) {
      setSectionProgress(JSON.parse(savedProgress))
    }

    const bookmarks = JSON.parse(localStorage.getItem('bookmarked-lessons') || '[]')
    setIsBookmarked(bookmarks.includes(lessonId))
  }, [lessonId, lesson, router])

  const markSectionComplete = (sectionIndex) => {
    const newProgress = {
      ...sectionProgress,
      [sectionIndex]: true
    }
    setSectionProgress(newProgress)
    localStorage.setItem(`lesson-${lessonId}-progress`, JSON.stringify(newProgress))
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked-lessons') || '[]')
    let newBookmarks
    
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(id => id !== lessonId)
    } else {
      newBookmarks = [...bookmarks, lessonId]
    }
    
    localStorage.setItem('bookmarked-lessons', JSON.stringify(newBookmarks))
    setIsBookmarked(!isBookmarked)
  }

  const shareLesson = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: lesson.title,
          text: lesson.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Lesson URL copied to clipboard!')
    }
  }

  const getCompletedSections = () => {
    return Object.values(sectionProgress).filter(Boolean).length
  }

  const getProgressPercentage = () => {
    const completed = getCompletedSections()
    return Math.round((completed / lesson.sections.length) * 100)
  }

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const currentSectionData = lesson.sections[currentSection]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/lessons')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{lesson.title}</h1>
                <p className="text-sm text-gray-600">
                  {getCompletedSections()}/{lesson.sections.length} sections completed
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100'
                }`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button
                onClick={shareLesson}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-primary-600">{getProgressPercentage()}%</span>
            </div>
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Lesson Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {lesson.difficulty}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{lesson.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{lesson.enrolledCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{lesson.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{lesson.description}</p>
              
              {/* Learning Objectives */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Current Section */}
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentSectionData.title}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-600">{currentSectionData.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentSectionData.type === 'video' ? 'bg-blue-100 text-blue-800' :
                      currentSectionData.type === 'interactive' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {currentSectionData.type.charAt(0).toUpperCase() + currentSectionData.type.slice(1)}
                    </span>
                  </div>
                </div>
                
                {sectionProgress[currentSection] && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>

              {/* Section Content */}
              <div className="mb-6">
                {currentSectionData.type === 'video' && (
                  <div>
                    <div className="bg-gray-100 rounded-lg aspect-video mb-4 flex items-center justify-center">
                      <button
                        onClick={() => setShowVideo(true)}
                        className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </button>
                    </div>
                    <p className="text-gray-700">{currentSectionData.content}</p>
                  </div>
                )}

                {currentSectionData.type === 'interactive' && (
                  <div>
                    <InteractiveElement type={currentSectionData.interactiveType} />
                    <p className="text-gray-700 mt-4">{currentSectionData.content}</p>
                  </div>
                )}

                {currentSectionData.type === 'practice' && (
                  <div>
                    <p className="text-gray-700 mb-4">{currentSectionData.content}</p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Practice Exercises:</h4>
                      {currentSectionData.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{exercise}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentSection === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => markSectionComplete(currentSection)}
                    disabled={sectionProgress[currentSection]}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      sectionProgress[currentSection]
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {sectionProgress[currentSection] ? 'Completed' : 'Mark Complete'}
                  </button>

                  <button
                    onClick={() => setCurrentSection(Math.min(lesson.sections.length - 1, currentSection + 1))}
                    disabled={currentSection === lesson.sections.length - 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentSection === lesson.sections.length - 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Table of Contents */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>
              <div className="space-y-2">
                {lesson.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === currentSection
                        ? 'bg-primary-50 border-l-4 border-primary-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {sectionProgress[index] ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{section.title}</h4>
                          <p className="text-xs text-gray-500">{section.duration}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <div className="space-y-3">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-5 h-5 text-primary-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">{resource.title}</h4>
                      <p className="text-xs text-gray-500 uppercase">{resource.type}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <VideoPlayer
          src={lesson.videoSrc}
          title={currentSectionData.title}
          onClose={() => setShowVideo(false)}
          autoplay={true}
        />
      )}
    </div>
  )
}
