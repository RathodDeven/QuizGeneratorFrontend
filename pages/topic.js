import React, { useState } from 'react'
import { generateQuizFromTopic } from '../util/api'

const topic = () => {
  const [topic, setTopic] = useState('')
  const [generating, setGenerating] = useState(false)
  const handleEnterClick = async (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      generateQuiz()
    }
  }
  const generateQuiz = async () => {
    if (topic === '') return
    setGenerating(true)
    console.log('generate quiz')
    console.log(topic)

    const response = await generateQuizFromTopic(topic)
    console.log('response', response)
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
        {/* input topic */}

        <input
          type="text"
          className="border-2 flex flex-col rounded-3xl p-4 border-black mr-4"
          onKeyUp={handleEnterClick}
          onChange={onInputChange}
          placeholder="AI, Machine Learning, ..."
        />
        <div>
          <button
            className={`${
              topic !== '' || generating ? 'bg-black' : 'bg-gray-300'
            } hover:bg-gray-600  text-white rounded-full py-2 px-4 text-xl `}
            disabled={topic === '' || generating}
            onClick={generateQuiz}
          >
            {generating ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default topic
