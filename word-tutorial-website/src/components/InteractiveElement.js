'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer, Info, CheckCircle, Play, FileText, Save, Type, Image, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react'

// Interactive Lesson 1: Opening Microsoft Word
const OpeningWordLesson = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())

  const steps = [
    {
      id: 'desktop',
      title: 'Find Microsoft Word on Desktop',
      instruction: 'Click on the Microsoft Word icon on your desktop',
      description: 'Look for the blue "W" icon labeled "Microsoft Word"',
      x: 25, y: 30,
      completed: false
    },
    {
      id: 'start-menu',
      title: 'Or use Start Menu',
      instruction: 'Alternatively, click the Start button and search for "Word"',
      description: 'You can also find Word through the Windows Start menu',
      x: 10, y: 85,
      completed: false
    },
    {
      id: 'start-screen',
      title: 'Word Start Screen',
      instruction: 'Choose "Blank Document" to create a new document',
      description: 'The Start Screen shows templates and recent documents',
      x: 50, y: 50,
      completed: false
    }
  ]

  const handleStepClick = (stepIndex) => {
    setCompletedSteps(new Set([...completedSteps, stepIndex]))
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 1: Opening Microsoft Word</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mock Desktop Environment */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
        {/* Desktop Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
        
        {/* Desktop Icons */}
        <motion.div
          className="absolute w-16 h-20 cursor-pointer"
          style={{ left: '25%', top: '30%', transform: 'translate(-50%, -50%)' }}
          onClick={() => handleStepClick(0)}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-1">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-white text-xs text-center block">Microsoft Word</span>
        </motion.div>

        {/* Start Button */}
        <motion.div
          className="absolute bottom-0 left-0 w-12 h-10 bg-gray-800 flex items-center justify-center cursor-pointer"
          onClick={() => handleStepClick(1)}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
        </motion.div>

        {/* Interactive Hotspots */}
        {steps.map((step, index) => (
          <motion.button
            key={step.id}
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

// Word Online Simulator - Interactive Browser-Based Word Experience
const WordOnlineSimulator = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userAction, setUserAction] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [isWordLoaded, setIsWordLoaded] = useState(false)
  const [documentContent, setDocumentContent] = useState('')

  const wordInterfaceSteps = [
    {
      id: 0,
      title: "Launch Word Online",
      instruction: "Click to launch Microsoft Word in your browser",
      expectedAction: "launchWord",
      hint: "Click anywhere on the Word Online launch screen to begin your tutorial.",
      feedback: {
        correct: "Perfect! Word Online is now loading. This cloud-based version gives you access to Word from any browser.",
        incorrect: "Click on the Word Online launch area to start the application."
      },
      learningObjective: "Learn how to access Word Online from your browser"
    },
    {
      id: 1,
      title: "Explore the Ribbon Interface",
      instruction: "Click on the Ribbon tabs to explore Word's main tools",
      expectedAction: "exploreRibbon",
      hint: "The Ribbon contains all of Word's main features organized into tabs like Home, Insert, Design, etc.",
      feedback: {
        correct: "Great! The Ribbon is Word's main toolbar. Each tab contains related tools and features.",
        incorrect: "Try clicking on different tabs in the Ribbon at the top of the interface."
      },
      learningObjective: "Understand the Ribbon interface and its organization"
    },
    {
      id: 2,
      title: "Explore the Document Area", 
      instruction: "Click in the document area to start typing",
      expectedAction: "exploreInterface",
      hint: "The white document area is where you'll type and edit your content. Click anywhere in it to place your cursor.",
      feedback: {
        correct: "Excellent! You've activated the document area. This is where all your writing and editing happens.",
        incorrect: "Click in the white document area in the center of the screen."
      },
      learningObjective: "Learn to navigate and use the main document editing area"
    }
  ]

  const handleUserAction = (action) => {
    setUserAction(action)
    setAttempts(attempts + 1)
    
    if (action === wordInterfaceSteps[currentStep].expectedAction) {
      setScore(score + 1)
      
      if (action === "launchWord") {
        setIsWordLoaded(true)
      }
      
      setTimeout(() => {
        if (currentStep < wordInterfaceSteps.length - 1) {
          setCurrentStep(currentStep + 1)
          setUserAction(null)
        } else {
          setCompleted(true)
        }
      }, 2000)
    }
  }

  const currentStepData = wordInterfaceSteps[currentStep]

  // Simulated Word Online Interface
  const WordOnlineInterface = () => (
    <div className="w-full h-[500px] border-2 border-gray-300 rounded-lg bg-gray-100 overflow-hidden font-sans">
      {/* Browser Header */}
      <div className="h-8 bg-gray-800 flex items-center px-3 text-white text-xs">
        <div className="flex gap-1 mr-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="bg-gray-600 px-3 py-1 rounded flex-1">
          https://office.live.com/start/Word.aspx
        </div>
      </div>

      {/* Word Online Header */}
      <div className="h-10 bg-blue-600 flex items-center px-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-800 rounded flex items-center justify-center font-bold text-sm">
            W
          </div>
          <span className="text-lg font-medium">Word Online</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-blue-200">
            {isWordLoaded ? '✓ Auto-saved' : 'Loading...'}
          </span>
          <div className="w-6 h-6 rounded-full bg-blue-800">👤</div>
        </div>
      </div>

      {/* Ribbon Interface */}
      <div className="h-24 bg-gray-50 border-b border-gray-300">
        {/* Ribbon Tabs */}
        <div className="h-8 flex items-end px-3 border-b border-gray-300">
          {['Home', 'Insert', 'Design', 'Layout', 'References'].map((tab, index) => (
            <div
              key={tab}
              onClick={() => handleUserAction('exploreRibbon')}
              className={`px-4 py-1 cursor-pointer text-sm border border-gray-300 ${
                index === 0 ? 'bg-white border-b-0' : 'bg-transparent border-0'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Ribbon Content */}
        <div className="h-16 bg-white p-2 flex gap-4">
          {/* Clipboard Group */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-gray-300 rounded text-xs">
                Paste
              </button>
            </div>
            <span className="text-xs text-gray-600">Clipboard</span>
          </div>

          {/* Font Group */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-gray-300 rounded font-bold">B</button>
              <button className="px-2 py-1 border border-gray-300 rounded italic">I</button>
              <button className="px-2 py-1 border border-gray-300 rounded underline">U</button>
            </div>
            <span className="text-xs text-gray-600">Font</span>
          </div>
        </div>
      </div>

      {/* Document Area */}
      <div className="h-[calc(100%-160px)] bg-gray-200 flex justify-center p-5 overflow-auto">
        <div
          onClick={() => handleUserAction('exploreInterface')}
          className={`w-[595px] min-h-[400px] bg-white shadow-lg p-24 cursor-text border ${
            userAction === 'exploreInterface' ? 'border-blue-600 border-2' : 'border-gray-300'
          }`}
        >
          <textarea
            value={documentContent}
            onChange={(e) => setDocumentContent(e.target.value)}
            placeholder="Start typing your document here..."
            className="w-full h-72 border-none outline-none text-xs font-calibri leading-normal resize-none bg-transparent"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-2 text-blue-600">🌐 Interactive Word Online Tutorial</h3>
      <p className="text-gray-600 mb-6">Experience Microsoft Word in your browser with this interactive tutorial!</p>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold">
            Step {currentStep + 1} of {wordInterfaceSteps.length}: {currentStepData.title}
          </span>
          <span className="text-sm text-gray-600">
            Score: {score}/{attempts} attempts
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / wordInterfaceSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Instructions */}
      <div className="p-4 bg-blue-50 rounded-lg mb-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          📋 {currentStepData.instruction}
        </h4>
        <p className="text-blue-800">
          <strong>Learning Goal:</strong> {currentStepData.learningObjective}
        </p>
      </div>

      {/* Word Online Interface */}
      {!isWordLoaded && currentStep === 0 ? (
        <div 
          onClick={() => handleUserAction('launchWord')}
          className="h-72 flex flex-col items-center justify-center bg-blue-500 rounded-lg cursor-pointer text-white text-center transition-all duration-300 hover:bg-blue-600"
        >
          <div className="w-20 h-20 bg-blue-700 rounded-xl flex items-center justify-center text-4xl font-bold mb-5">
            W
          </div>
          <h3 className="text-2xl font-bold mb-3">Microsoft Word Online</h3>
          <p className="text-lg">Click here to launch Word in your browser</p>
        </div>
      ) : (
        <WordOnlineInterface />
      )}

      {/* Hint Button */}
      {!completed && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Need Help? 💡'}
          </button>
          
          {showHint && (
            <div className="mt-3 p-3 bg-orange-50 rounded border border-orange-200">
              <p className="text-orange-800">
                💡 <strong>Hint:</strong> {currentStepData.hint}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {userAction && (
        <div className={`mt-6 p-4 rounded-lg border-2 ${
          userAction === currentStepData.expectedAction 
            ? 'bg-green-50 border-green-500' 
            : 'bg-red-50 border-red-500'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            userAction === currentStepData.expectedAction ? 'text-green-800' : 'text-red-800'
          }`}>
            {userAction === currentStepData.expectedAction ? '✅ Correct!' : '❌ Try Again'}
          </h4>
          <p className={userAction === currentStepData.expectedAction ? 'text-green-800' : 'text-red-800'}>
            {userAction === currentStepData.expectedAction 
              ? currentStepData.feedback.correct 
              : currentStepData.feedback.incorrect}
          </p>
        </div>
      )}

      {/* Completion */}
      {completed && (
        <div className="mt-6 p-6 bg-green-50 rounded-lg text-center border-2 border-green-500">
          <h3 className="text-green-800 font-bold text-xl mb-4">
            🎉 Congratulations! Tutorial Complete!
          </h3>
          <p className="text-green-800 mb-4 text-lg">
            You've successfully completed the Word Online interactive tutorial!
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((score / attempts) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {score}/{wordInterfaceSteps.length}
              </div>
              <div className="text-sm text-gray-600">Steps Completed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/*
// REMOVED DUPLICATE SECTION - START
// This duplicate OpeningWordLesson was removed to fix compilation errors
// All code from here until the real InterfaceTourLesson is commented out
const oldDuplicateCode = () => {
  // Removed duplicate OpeningWordLesson
  // const InterfaceTourLesson = () => {
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [completedHotspots, setCompletedHotspots] = useState(new Set())

  const hotspots = [
    {
      title: "Finding Microsoft Word",
      description: "Learn how to locate and open Microsoft Word on your computer.",
      interactive: true
    },
    {
      title: "Understanding the Start Screen", 
      description: "Get familiar with Word's welcome interface and template options.",
      interactive: true
    },
    {
      title: "Creating a New Document",
      description: "Start with a blank document to begin your Word journey.",
      interactive: true
    }
  ]

  const handleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]))
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 2)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 1: Opening Microsoft Word</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Interactive Lesson 2: Word Interface Tour
const InterfaceTourLesson = () => {
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [completedHotspots, setCompletedHotspots] = useState(new Set())

  const hotspots = [
    {
      id: 'title-bar',
      x: 50, y: 8,
      title: 'Title Bar',
      description: 'Shows the document name and program controls',
      details: 'The title bar displays "Document1 - Word" for new documents. The minimize, maximize, and close buttons are on the right.'
    },
    {
      id: 'quick-access',
      x: 15, y: 15,
      title: 'Quick Access Toolbar',
      description: 'Shortcuts to frequently used commands',
      details: 'By default, it includes Save, Undo, and Redo. You can customize it by clicking the dropdown arrow.'
    },
    {
      id: 'ribbon',
      x: 50, y: 25,
      title: 'The Ribbon',
      description: 'Main command center with tabs and tools',
      details: 'Contains tabs like Home, Insert, Design. Each tab has groups of related commands.'
    },
    {
      id: 'ruler',
      x: 20, y: 40,
      title: 'Ruler',
      description: 'Helps with margins, tabs, and indents',
      details: 'Shows measurements in inches or centimeters. Can be hidden/shown from View tab.'
    },
    {
      id: 'document',
      x: 50, y: 60,
      title: 'Document Area',
      description: 'Where you type and edit your text',
      details: 'The white area where your document content appears. This is where you do most of your work.'
    },
    {
      id: 'status-bar',
      x: 50, y: 90,
      title: 'Status Bar',
      description: 'Shows document information',
      details: 'Displays page numbers, word count, language, and zoom controls.'
    },
    {
      id: 'view-buttons',
      x: 85, y: 90,
      title: 'View Buttons',
      description: 'Switch between different document views',
      details: 'Read Mode, Print Layout, Web Layout, and Outline views are available.'
    },
    {
      id: 'zoom',
      x: 75, y: 90,
      title: 'Zoom Slider',
      description: 'Zoom in or out of your document',
      details: 'Drag the slider or click + and - buttons to change zoom level.'
    }
  ]

  const handleHotspotClick = (hotspot) => {
    setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)
    if (!completedHotspots.has(hotspot.id)) {
      setCompletedHotspots(new Set([...completedHotspots, hotspot.id]))
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 2: Exploring the Word Interface</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Click on each blue dot to learn about the interface</span>
          <span>{completedHotspots.size}/{hotspots.length} explored</span>
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedHotspots.size / hotspots.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mock Word Interface */}
      <div className="relative aspect-video bg-white">
        {/* Title Bar */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-blue-600 text-white text-xs flex items-center px-4">
          <span>Document1 - Microsoft Word</span>
          <div className="ml-auto flex space-x-1">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
            <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
            <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
          </div>
        </div>

        {/* Quick Access Toolbar */}
        <div className="absolute top-8 left-4 flex space-x-1">
          <div className="w-6 h-6 bg-gray-200 rounded border"></div>
          <div className="w-6 h-6 bg-gray-200 rounded border"></div>
          <div className="w-6 h-6 bg-gray-200 rounded border"></div>
        </div>

        {/* Ribbon */}
        <div className="absolute top-8 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-gray-100 border-b">
          <div className="flex items-center h-8 px-4 space-x-4 text-sm border-b">
            <span>File</span>
            <span className="px-2 py-1 bg-white rounded border">Home</span>
            <span>Insert</span>
            <span>Design</span>
            <span>Layout</span>
            <span>References</span>
            <span>Mailings</span>
            <span>Review</span>
            <span>View</span>
          </div>
          <div className="h-12 p-2 flex space-x-1">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-8 h-6 bg-gray-300 rounded"></div>
              <span className="text-xs">Paste</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
              <span className="text-xs">Cut</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
              <span className="text-xs">Copy</span>
            </div>
          </div>
        </div>

        {/* Ruler */}
        <div className="absolute top-28 left-8 right-8 h-4 bg-gray-100 border-b text-xs flex items-center">
          <div className="w-full h-2 bg-white border"></div>
        </div>

        {/* Document Area */}
        <div className="absolute top-42 left-8 right-8 bottom-8 bg-white shadow-sm border rounded">
          <div className="p-8">
            <div className="w-3/4 h-4 bg-gray-200 rounded mb-3"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded mb-6"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded mb-3"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100 border-t flex items-center justify-between px-4 text-xs text-gray-600">
          <span>Page 1 of 1</span>
          <span>0 words</span>
          <div className="flex items-center space-x-2">
            <span>100%</span>
            <div className="w-16 h-1 bg-gray-300 rounded">
              <div className="w-8 h-1 bg-blue-500 rounded"></div>
            </div>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Interactive Hotspots */}
        {hotspots.map((hotspot) => (
          <div key={hotspot.id}>
            <motion.button
              className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors ${
                completedHotspots.has(hotspot.id) ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleHotspotClick(hotspot)}
              whileHover={{ scale: 1.1 }}
            >
              {completedHotspots.has(hotspot.id) ? <CheckCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </motion.button>

            <AnimatePresence>
              {activeHotspot === hotspot.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute z-10 bg-white rounded-lg shadow-xl border p-4 max-w-xs"
                  style={{
                    left: hotspot.x > 50 ? 'auto' : `${hotspot.x + 5}%`,
                    right: hotspot.x > 50 ? `${100 - hotspot.x + 5}%` : 'auto',
                    top: hotspot.y > 50 ? 'auto' : `${hotspot.y + 5}%`,
                    bottom: hotspot.y > 50 ? `${100 - hotspot.y + 5}%` : 'auto',
                  }}
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{hotspot.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{hotspot.description}</p>
                  <p className="text-xs text-gray-500 mb-3">{hotspot.details}</p>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Got it!
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

// Interactive Lesson 3: Creating a New Document
const CreateDocumentLesson = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())

  const steps = [
    {
      title: 'Click File Tab',
      instruction: 'Click on the "File" tab in the top-left corner',
      x: 10, y: 20
    },
    {
      title: 'Select New',
      instruction: 'Click on "New" in the left sidebar',
      x: 20, y: 40
    },
    {
      title: 'Choose Blank Document',
      instruction: 'Click on "Blank document" template',
      x: 50, y: 50
    },
    {
      title: 'Document Created',
      instruction: 'Your new document is ready! The cursor will be blinking in the document.',
      x: 50, y: 70
    }
  ]

  const handleStepClick = (stepIndex) => {
    setCompletedSteps(new Set([...completedSteps, stepIndex]))
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 3: Creating a New Document</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative aspect-video bg-white">
        {currentStep < 3 && (
          <div className="absolute inset-0 bg-blue-50">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">New</h2>
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="bg-white border-2 border-blue-500 rounded-lg p-4 cursor-pointer hover:shadow-lg"
                  onClick={() => handleStepClick(2)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-center">Blank document</h3>
                </motion.div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-100 rounded mb-2"></div>
                  <h3 className="font-semibold text-center text-gray-600">Resume</h3>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-100 rounded mb-2"></div>
                  <h3 className="font-semibold text-center text-gray-600">Letter</h3>
                </div>
              </div>
            </div>
            
            {/* Left Sidebar */}
            <div className="absolute left-0 top-0 w-48 h-full bg-gray-200 border-r p-4">
              <div className="space-y-2">
                <motion.div
                  className="p-2 bg-white rounded cursor-pointer"
                  onClick={() => handleStepClick(1)}
                  whileHover={{ scale: 1.02 }}
                >
                  New
                </motion.div>
                <div className="p-2 text-gray-600">Open</div>
                <div className="p-2 text-gray-600">Recent</div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="absolute inset-0">
            {/* Regular Word interface after document creation */}
            <div className="h-8 bg-blue-600 text-white text-xs flex items-center px-4">
              Document1 - Microsoft Word
            </div>
            <div className="h-20 bg-gray-50 border-b p-2">
              <div className="text-sm mb-2">Home | Insert | Design | Layout</div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex-1 p-8 bg-white">
              <div className="border-2 border-dashed border-blue-300 h-64 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-0.5 h-6 bg-black mx-auto mb-2"
                  ></motion.div>
                  <p className="text-gray-600">Start typing here...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step indicators */}
        {steps.map((step, index) => (
          <motion.button
            key={index}
            className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
              completedSteps.has(index) ? 'bg-green-500' : index === currentStep ? 'bg-yellow-400' : 'bg-blue-500'
            } text-white font-bold`}
            style={{ left: `${step.x}%`, top: `${step.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => handleStepClick(index)}
            whileHover={{ scale: 1.1 }}
          >
            {completedSteps.has(index) ? <CheckCircle className="w-5 h-5" /> : index + 1}
          </motion.button>
        ))}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-1">{steps[currentStep].title}</h4>
          <p className="text-sm text-gray-700">{steps[currentStep].instruction}</p>
        </div>
      </div>
    </div>
  )
}

// Interactive Lesson 4: Basic Text Typing
const BasicTypingLesson = () => {
  const [typedText, setTypedText] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const targetText = "Welcome to Microsoft Word! This is my first document."

  const steps = [
    "Click in the document area to place your cursor",
    "Type the following text: 'Welcome to Microsoft Word!'",
    "Press Enter to create a new line",
    "Type: 'This is my first document.'"
  ]

  const handleTextChange = (e) => {
    setTypedText(e.target.value)
    if (e.target.value.length >= 25 && currentStep === 1) {
      setCurrentStep(2)
    }
    if (e.target.value === targetText && currentStep === 3) {
      setCurrentStep(4)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 4: Your First Text</h3>
        <div className="text-sm text-gray-600 mb-2">Step {currentStep + 1} of {steps.length}</div>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative aspect-video bg-white">
        <div className="h-8 bg-blue-600 text-white text-xs flex items-center px-4">
          Document1 - Microsoft Word
        </div>
        <div className="h-16 bg-gray-50 border-b flex items-center px-4">
          <div className="flex space-x-2">
            <Type className="w-6 h-6 text-gray-600" />
            <span className="text-sm text-gray-600">Start typing...</span>
          </div>
        </div>
        
        <div className="p-8">
          <div 
            className="min-h-64 p-4 bg-white border-2 border-blue-200 rounded cursor-text"
            onClick={() => setCurrentStep(Math.max(currentStep, 1))}
          >
            <textarea
              className="w-full h-full border-none outline-none resize-none text-lg"
              value={typedText}
              onChange={handleTextChange}
              placeholder="Click here and start typing..."
              style={{ fontFamily: 'Times New Roman, serif' }}
            />
            
            {currentStep < 4 && (
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-0.5 h-6 bg-black"
                style={{ marginLeft: `${typedText.length * 0.5}ch` }}
              />
            )}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-gray-900">{steps[currentStep]}</p>
          {currentStep === 4 && (
            <p className="text-sm text-green-600 mt-2">✓ Excellent! You've typed your first text in Word.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Interactive Lesson 5: Text Formatting
const TextFormattingLesson = () => {
  const [selectedText, setSelectedText] = useState('')
  const [textStyles, setTextStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: 12,
    color: '#000000'
  })
  const [completedActions, setCompletedActions] = useState(new Set())

  const formatActions = [
    { id: 'select', title: 'Select Text', description: 'Click and drag to select "Microsoft Word"' },
    { id: 'bold', title: 'Make Bold', description: 'Click the Bold button (B) in the toolbar' },
    { id: 'italic', title: 'Make Italic', description: 'Click the Italic button (I) in the toolbar' },
    { id: 'color', title: 'Change Color', description: 'Click the text color button and choose blue' },
    { id: 'size', title: 'Change Size', description: 'Change font size to 16pt' }
  ]

  const handleFormatAction = (action) => {
    setCompletedActions(new Set([...completedActions, action]))
    if (action === 'bold') setTextStyles({...textStyles, bold: true})
    if (action === 'italic') setTextStyles({...textStyles, italic: true})
    if (action === 'color') setTextStyles({...textStyles, color: '#0066cc'})
    if (action === 'size') setTextStyles({...textStyles, fontSize: 16})
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 5: Text Formatting</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedActions.size / formatActions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative aspect-video bg-white">
        <div className="h-8 bg-blue-600 text-white text-xs flex items-center px-4">
          Document1 - Microsoft Word
        </div>
        
        {/* Formatting Toolbar */}
        <div className="h-16 bg-gray-50 border-b p-2">
          <div className="flex items-center space-x-2">
            <select className="text-sm border rounded px-2 py-1">
              <option>Calibri</option>
            </select>
            <select 
              className="text-sm border rounded px-2 py-1"
              value={textStyles.fontSize}
              onChange={(e) => handleFormatAction('size')}
            >
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="18">18</option>
            </select>
            
            <div className="flex space-x-1 border-l pl-2">
              <motion.button
                className={`w-8 h-8 rounded border font-bold ${textStyles.bold ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => handleFormatAction('bold')}
                whileHover={{ scale: 1.05 }}
              >
                B
              </motion.button>
              <motion.button
                className={`w-8 h-8 rounded border italic ${textStyles.italic ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => handleFormatAction('italic')}
                whileHover={{ scale: 1.05 }}
              >
                I
              </motion.button>
              <motion.button
                className={`w-8 h-8 rounded border underline ${textStyles.underline ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => handleFormatAction('underline')}
                whileHover={{ scale: 1.05 }}
              >
                U
              </motion.button>
              <motion.button
                className="w-8 h-8 rounded border bg-white flex items-center justify-center"
                onClick={() => handleFormatAction('color')}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-4 h-4 border" style={{ backgroundColor: textStyles.color }}></div>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="min-h-64 p-4 bg-white border rounded">
            <p className="text-lg mb-4">
              Learning{' '}
              <span
                className="cursor-pointer bg-blue-100 px-1"
                onClick={() => handleFormatAction('select')}
                style={{
                  fontWeight: textStyles.bold ? 'bold' : 'normal',
                  fontStyle: textStyles.italic ? 'italic' : 'normal',
                  color: textStyles.color,
                  fontSize: `${textStyles.fontSize}px`
                }}
              >
                Microsoft Word
              </span>
              {' '}is easy and fun!
            </p>
            <p className="text-sm text-gray-600">
              Try formatting the highlighted text using the toolbar above.
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">
                {formatActions[completedActions.size]?.title || 'All Done!'}
              </p>
              <p className="text-xs text-gray-600">
                {formatActions[completedActions.size]?.description || 'You\'ve learned basic text formatting!'}
              </p>
            </div>
            <span className="text-sm text-gray-500">{completedActions.size}/{formatActions.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Interactive Lesson 6: Saving Documents
const SaveDocumentLesson = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [fileName, setFileName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const steps = [
    { title: 'Use Ctrl+S', instruction: 'Press Ctrl+S or click File > Save' },
    { title: 'Choose Location', instruction: 'Select where to save your document' },
    { title: 'Name Your File', instruction: 'Enter a name for your document' },
    { title: 'Click Save', instruction: 'Click the Save button to save your document' }
  ]

  const handleSaveStep = (step) => {
    setCurrentStep(step)
    if (step === 1) setShowSaveDialog(true)
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 6: Saving Your Document</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative aspect-video bg-white">
        {!showSaveDialog && (
          <div className="h-full">
            <div className="h-8 bg-blue-600 text-white text-xs flex items-center px-4">
              Document1 - Microsoft Word
            </div>
            <div className="h-12 bg-gray-50 border-b flex items-center px-4">
              <motion.button
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                onClick={() => handleSaveStep(1)}
                whileHover={{ scale: 1.05 }}
              >
                <Save className="w-4 h-4 inline mr-1" />
                Save
              </motion.button>
            </div>
            <div className="p-8">
              <p className="text-lg mb-4">My first Word document</p>
              <p className="text-gray-600">This document needs to be saved!</p>
            </div>
          </div>
        )}

        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-4 bg-white border shadow-lg rounded-lg"
          >
            <div className="h-8 bg-gray-100 border-b flex items-center px-4 text-sm font-medium">
              Save As
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Save in:</label>
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Documents</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">File name:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="My First Document"
                  onFocus={() => handleSaveStep(2)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Save as type:</label>
                <select className="w-full p-2 border rounded">
                  <option>Word Document (*.docx)</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 border rounded text-sm">Cancel</button>
                <motion.button
                  className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  onClick={() => handleSaveStep(3)}
                  whileHover={{ scale: 1.05 }}
                  disabled={!fileName}
                >
                  Save
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium">{steps[currentStep]?.title}</p>
          <p className="text-xs text-gray-600">{steps[currentStep]?.instruction}</p>
        </div>
      </div>
    </div>
  )
}

// Interactive Lesson 7: Working with Images
const ImagesLesson = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [imageInserted, setImageInserted] = useState(false)
  const [imageSelected, setImageSelected] = useState(false)

  const steps = [
    'Click Insert tab in the ribbon',
    'Click Pictures button',
    'Choose an image from your computer',
    'Click and drag to resize the image',
    'Right-click for more options'
  ]

  const handleImageAction = (action) => {
    if (action === 'insert') {
      setImageInserted(true)
      setCurrentStep(3)
    } else if (action === 'select') {
      setImageSelected(true)
      setCurrentStep(4)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Step 7: Adding Images</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative aspect-video bg-white">
        <div className="h-8 bg-blue-600 text-white text-xs flex items-center px-4">
          Document1 - Microsoft Word
        </div>
        
        <div className="h-16 bg-gray-50 border-b">
          <div className="flex items-center h-8 px-4 text-sm border-b">
            <span className="px-2 py-1 bg-white rounded border mr-2">Home</span>
            <motion.span
              className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() => setCurrentStep(1)}
              whileHover={{ scale: 1.05 }}
            >
              Insert
            </motion.span>
            <span className="px-2 py-1 ml-2">Design</span>
          </div>
          <div className="flex items-center h-8 px-4 space-x-2">
            <motion.button
              className="flex items-center space-x-1 px-3 py-1 border rounded text-sm hover:bg-gray-100"
              onClick={() => handleImageAction('insert')}
              whileHover={{ scale: 1.05 }}
            >
              <Image className="w-4 h-4" />
              <span>Pictures</span>
            </motion.button>
            <button className="flex items-center space-x-1 px-3 py-1 border rounded text-sm">
              <span>Icons</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="min-h-64 p-4 bg-white border rounded">
            <h2 className="text-xl font-bold mb-4">My Document with Images</h2>
            <p className="mb-4">Here's how to add images to your Word document:</p>
            
            {imageInserted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-32 h-24 bg-gradient-to-br from-green-200 to-blue-200 border-2 rounded cursor-pointer mb-4 ${
                  imageSelected ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => handleImageAction('select')}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-600" />
                </div>
                {imageSelected && (
                  <div className="absolute -inset-1 border-2 border-blue-500 pointer-events-none">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </motion.div>
            )}
            
            <p className="text-gray-600">
              Images make your documents more engaging and professional.
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium">Step {currentStep + 1}: {steps[currentStep]}</p>
          {currentStep === 4 && (
            <p className="text-sm text-green-600 mt-1">✓ Great! You've learned how to work with images.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Interactive Lesson 8: Final Review
const FinalReviewLesson = () => {
  const [completedLessons, setCompletedLessons] = useState(new Set())
  
  const lessons = [
    { id: 'opening-word', title: 'Opening Microsoft Word', icon: '📂' },
    { id: 'interface-tour', title: 'Interface Tour', icon: '🖥️' },
    { id: 'create-document', title: 'Creating Documents', icon: '📄' },
    { id: 'basic-typing', title: 'Basic Typing', icon: '⌨️' },
    { id: 'text-formatting', title: 'Text Formatting', icon: '🎨' },
    { id: 'save-document', title: 'Saving Documents', icon: '💾' },
    { id: 'insert-images', title: 'Adding Images', icon: '🖼️' }
  ]

  const handleLessonComplete = (lessonId) => {
    setCompletedLessons(new Set([...completedLessons, lessonId]))
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b">
        <h3 className="font-semibold text-gray-900 mb-2">Final Review: Your Microsoft Word Journey</h3>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${(completedLessons.size / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                completedLessons.has(lesson.id)
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'bg-white border-gray-300 hover:border-blue-500'
              }`}
              onClick={() => handleLessonComplete(lesson.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{lesson.icon}</span>
                <div>
                  <h4 className="font-semibold">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">
                    {completedLessons.has(lesson.id) ? '✓ Completed' : 'Click to review'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {completedLessons.size === lessons.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center"
          >
            <h3 className="text-green-800 font-bold text-xl mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-green-700 mb-4">
              You've completed all Microsoft Word lessons and are ready to create amazing documents!
            </p>
            <div className="flex justify-center">
              <div className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold">
                Certificate of Completion
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function InteractiveElement({ type, step }) {
  switch (type) {
    case 'opening-word':
      return <OpeningWordLesson />
    case 'interface-tour':
      return <InterfaceTourLesson />
    case 'create-document':
      return <CreateDocumentLesson />
    case 'basic-typing':
      return <BasicTypingLesson />
    case 'text-formatting':
      return <TextFormattingLesson />
    case 'save-document':
      return <SaveDocumentLesson />
    case 'insert-images':
      return <ImagesLesson />
    case 'final-review':
      return <FinalReviewLesson />
    case 'word-online-simulator':
      return <WordOnlineSimulator />
    default:
      return (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">Interactive element: {type}</p>
          <p className="text-sm text-gray-500 mt-2">Available types: opening-word, interface-tour, create-document, basic-typing, text-formatting, save-document, insert-images, final-review, word-online-simulator</p>
        </div>
      )
  }
}
