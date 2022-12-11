import React, { useState } from 'react'
import QuizCard from './QuizCard'

const QuizHandler = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [data, setData] = useState(quiz)
  const [totalPoints, setTotalPoints] = useState(0)
  const [showFinalResult, setShowFinalResult] = useState(false)

  const handleOnClickNextButton = () => {
    if (currentQuestion === data.questions.length - 1) {
      setShowFinalResult(true)
      return
    }
    setCurrentQuestion(currentQuestion + 1)
  }
  const handleOnClickPrevButton = () => {
    if (currentQuestion === 0) return
    if (showFinalResult) {
      setShowFinalResult(false)
      return
    }
    setCurrentQuestion(currentQuestion - 1)
  }

  const handleOnClickOption = (optionPosition) => {
    if (data.questions[currentQuestion].selectedOption !== undefined) return
    if (optionPosition === data.questions[currentQuestion].answerPosition) {
      setTotalPoints(totalPoints + 1)
    }
    //update data
    let tempData = data
    tempData.questions[currentQuestion].selectedOption = optionPosition
    setData(tempData)
  }

  return (
    <div className="w-full flex justify-center items-center">
      <QuizCard
        quiz={data.questions[currentQuestion]}
        onClickNextButton={handleOnClickNextButton}
        onClickPrevButton={handleOnClickPrevButton}
        currentQuestion={currentQuestion}
        totalQuestions={data.questions.length}
        onClickOption={handleOnClickOption}
        totalPoints={totalPoints}
        showFinalResult={showFinalResult}
      />
    </div>
  )
}

export default QuizHandler
