import React, { useRef, useState } from 'react'
import QuizHandler from '../components/quiz/QuizHandler'
import { generateQuizFromText } from '../util/api'
import { GOOGLE_SUPPORTED_LANGUAGES, treatRawQuizData } from '../util/util'

const text = () => {
  const textAreaRef = useRef()
  const [generating, setGenerating] = useState(false)
  const [generatedQuiz, setGeneratedQuiz] = useState(null)
  // const [selectedLanguage, setSelectedLanguage] = useState('en')

  const generateQuiz = async () => {
    console.log('textAreaRef', textAreaRef.current.value)
    if (textAreaRef?.current?.value === '' || generating) return
    setGeneratedQuiz(null)
    setGenerating(true)
    console.log('generate quiz from text')
    console.log(textAreaRef.current.value)

    const response = await generateQuizFromText(
      textAreaRef.current.value
      // selectedLanguage
    )
    console.log('response', response)
    if (!response) {
      setGenerating(false)
      alert('Something went wrong, please try again')
      return
    }

    const quiz = await treatRawQuizData(response).then((res) => res)
    if (!quiz) {
      setGenerating(false)
      alert('Something went wrong, please try again')
      return
    }
    console.log('quiz', quiz)

    setGeneratedQuiz(quiz)

    setGenerating(false)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold w-full text-center mt-20">
        Generate a Quiz from Texts
      </h3>
      <div className="w-full mt-10 flex flex-row justify-around items-center pr-10">
        <div className="w-full flex flex-col justify-center items-center w-full">
          {/* language selection */}
          {/* <select
            className="border-2 flex flex-col rounded-lg p-4 border-black mb-4"
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {GOOGLE_SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select> */}

          {/* textare for text */}
          <textarea
            className="border-2 rounded-xl p-4 border-black mb-4"
            placeholder="Paste your text here"
            ref={textAreaRef}
            disabled={generating}
            rows={10}
            cols={50}
          />
          <div>
            <button
              className={`${
                generating ? 'bg-gray-300' : 'bg-black'
              } hover:bg-gray-600  text-white rounded-full py-2 px-4 text-xl `}
              disabled={generating}
              onClick={generateQuiz}
            >
              {generating ? 'Generating...' : 'Generate Quiz'}
            </button>
          </div>
        </div>
        <div>{generatedQuiz && <QuizHandler quiz={generatedQuiz} />}</div>
      </div>
    </div>
  )
}

export default text
