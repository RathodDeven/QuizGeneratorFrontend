import React, { useRef, useState } from 'react'
import QuizHandler from '../components/quiz/QuizHandler'
import { generateQuizFromTopic } from '../util/api'
import { GOOGLE_SUPPORTED_LANGUAGES, treatRawQuizData } from '../util/util'

const topic = () => {
  const [topic, setTopic] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedQuiz, setGeneratedQuiz] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const handleEnterClick = async (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      generateQuiz()
    }
  }
  const generateQuiz = async () => {
    if (topic === '' || generating) return
    setGeneratedQuiz(null)
    setGenerating(true)
    console.log('generate quiz')
    console.log(topic)

    const response = await generateQuizFromTopic(topic, selectedLanguage)
    console.log('response', response)
    if (!response) {
      setGenerating(false)
      alert('Something went wrong, please try again')
      return
    }
    let responseClone = JSON.parse(JSON.stringify(response))
    const quiz = await treatRawQuizData(responseClone).then((res) => res)
    console.log('quiz', quiz)

    setGeneratedQuiz(quiz)

    setGenerating(false)
  }

  const onInputChange = (e) => {
    setTopic(e.target.value)
  }
  return (
    <div>
      <h3 className="text-2xl font-bold w-full text-center mt-20">
        Generate a Quiz from any Topic
      </h3>
      <div className="w-full flex flex-row justify-center items-center mt-10 w-full">
        {/* select language */}
        <select
          className="border-2 flex flex-col rounded-lg p-4 border-black mr-4"
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {GOOGLE_SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        {/* input topic */}
        <input
          type="text"
          className="border-2 flex flex-col rounded-3xl p-4 border-black mr-4"
          onKeyUp={handleEnterClick}
          onChange={onInputChange}
          placeholder="AI, Machine Learning, ..."
          disabled={generating}
        />
        <div>
          <button
            className={`${
              topic === '' || generating ? 'bg-gray-300' : 'bg-black'
            } hover:bg-gray-600  text-white rounded-full py-2 px-4 text-xl `}
            disabled={topic === '' || generating}
            onClick={generateQuiz}
          >
            {generating ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      </div>
      {generatedQuiz && <QuizHandler quiz={generatedQuiz} />}
    </div>
  )
}

export default topic
