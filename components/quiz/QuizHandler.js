import React, { useState } from 'react'
import QuizCard from './QuizCard'

const QuizHandler = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [data, setData] = useState(quiz)
  const [totalPoints, setTotalPoints] = useState(0)
  const [showFinalResult, setShowFinalResult] = useState(false)

  const handleOnClickNextButton = (textAnswer) => {
    if (
      data.questions[currentQuestion].options.length === 0 &&
      textAnswer &&
      data.questions[currentQuestion]?.textAnswer !== textAnswer &&
      typeof textAnswer === 'string'
    ) {
      console.log('textAnswer', textAnswer)
      //update data
      let tempData = data
      tempData.questions[currentQuestion].textAnswer = textAnswer
      setData(tempData)
    }
    if (currentQuestion === data.questions.length - 1) {
      setShowFinalResult(true)
      return
    }
    setCurrentQuestion(currentQuestion + 1)
  }
  const handleOnClickPrevButton = (textAnswer) => {
    if (
      data.questions[currentQuestion].options.length === 0 &&
      textAnswer &&
      data.questions[currentQuestion]?.textAnswer !== textAnswer &&
      typeof textAnswer === 'string'
    ) {
      console.log('textAnswer', textAnswer)
      //updat data
      let tempData = data
      tempData.questions[currentQuestion].textAnswer = textAnswer
      setData(tempData)
    }
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
