import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const QuizCard = ({
  quiz,
  onClickNextButton,
  onClickPrevButton,
  currentQuestion,
  totalQuestions,
  onClickOption,
  totalPoints,
  showFinalResult
}) => {
  const [rotate, setRotate] = useState(false)
  const textAreaRef = useRef(null)

  useEffect(() => {
    //reset textAreaRef
    if (textAreaRef?.current) {
      textAreaRef.current.value = ''
      if (quiz.textAnswer) textAreaRef.current.value = quiz.textAnswer
    }
  }, [quiz])

  const QuizNextAndPrevButton = ({ onClickNextButton, onClickPrevButton }) => {
    return (
      <div className="flex flex-row gap-x-4 items-center justify-center h-[100px]">
        <div
          className="w-[250px] h-[50px] border-2 py-2 rounded-lg flex items-center justify-center text-xl mb-4"
          onClick={() => {
            if (quiz.options.length === 0) {
              onClickPrevButton(textAreaRef.current.value)
            } else {
              onClickPrevButton()
            }
          }}
        >
          <AiOutlineArrowLeft />
        </div>
        <div
          onClick={() => {
            if (quiz.options.length === 0) {
              onClickNextButton(textAreaRef.current.value)
            } else {
              onClickNextButton()
            }
          }}
          className="w-[250px] h-[50px] border-2 py-2 rounded-lg flex items-center justify-center text-xl mb-4"
        >
          <AiOutlineArrowRight />
        </div>
      </div>
    )
  }

  const TopStatusHeader = ({
    currentQuestion,
    totalQuestions,
    totalPoints
  }) => {
    return (
      <div className="grid grid-cols-3 w-full mt-4">
        <div></div>
        <div className="text-xl justify-self-center self-center text-gray-400">
          {currentQuestion + 1 + '/' + totalQuestions}
        </div>
        <div className="ml-8">Points : {totalPoints}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="w-[600px] h-[600px]  m-8 cursor-pointer perspective">
        {!showFinalResult && (
          <div
            className={`${
              rotate ? 'my-rotate-x-180' : ''
            } relative preserve-3d w-full h-full duration-500`}
          >
            {/* Front */}
            <div className="shadow-xl bg-white absolute backface-hidden w-full h-full rounded-lg">
              {/* top header
               */}
              <TopStatusHeader
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                totalPoints={totalPoints}
              />
              <div className="h-[250px] flex items-center justify-center text-2xl px-8 text-center">
                {quiz.question}
              </div>
              {/* options */}
              <div className="flex flex-row gap-x-4 flex-wrap items-center justify-center h-[150px]">
                {quiz.options.length > 0 &&
                  quiz.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        onClickOption(index)
                        setRotate(!rotate)
                      }}
                      className={`text-center w-[250px] h-[50px] border-2 ${
                        quiz.selectedOption !== undefined
                          ? index === quiz.answerPosition
                            ? 'bg-green-200'
                            : index === quiz.selectedOption
                            ? 'bg-red-200'
                            : ''
                          : 'border-gray-200 hover:border-gray-500'
                      }  p-4 rounded-lg flex items-center justify-center text-xl mb-4`}
                    >
                      {option}
                    </div>
                  ))}
                {quiz.options.length === 0 && (
                  // if there is no options
                  // then let user to type the answer

                  <textarea
                    className="border-2 p-4 rounded-lg flex items-center justify-center text-xl mb-4"
                    placeholder="Type your answer here"
                    ref={textAreaRef}
                    defaultValue={quiz?.textAnswer || ''}
                    onChange={(e) => {
                      console.log(e.target.value)
                    }}
                    rows={3}
                    cols={50}
                  />
                )}
              </div>
              {/* show exaplanation */}
              {quiz.selectedOption !== undefined && (
                <div
                  onClick={() => {
                    setRotate(true)
                  }}
                  className="ml-12 text-sm text-gray-400 cursor-pointer"
                >
                  Show explanations
                </div>
              )}
              {/* previous and next button */}
              <QuizNextAndPrevButton
                onClickNextButton={onClickNextButton}
                onClickPrevButton={onClickPrevButton}
              />
            </div>
            {/* Back */}
            <div className="shadow-xl absolute my-rotate-x-180 backface-hidden w-full h-full bg-white overflow-hidden rounded-lg">
              {/* number of questions and remaining questions*/}
              <TopStatusHeader
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                totalPoints={totalPoints}
              />
              {/* explanations */}
              <div className="mt-10 flex flex-col items-center justify-center text-3xl">
                {/*all four explanations */}
                {quiz.explanations.length > 0 &&
                  quiz.explanations.map((explanation, index) => (
                    <div
                      key={index}
                      className={`mx-3 p-2 rounded-lg flex items-center justify-center text-xl mb-4 ${
                        index == quiz.answerPosition
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                      onClick={() => setRotate(!rotate)}
                    >
                      {explanation}
                    </div>
                  ))}
              </div>
              {/* hide exaplanation */}
              <div
                onClick={() => {
                  setRotate(false)
                }}
                className="ml-12 text-sm text-gray-400 cursor-pointer"
              >
                Hide explanations
              </div>
              {/* previous and next button */}
              <QuizNextAndPrevButton
                onClickNextButton={() => {
                  setRotate(false)
                  onClickNextButton()
                }}
                onClickPrevButton={() => {
                  setRotate(false)
                  onClickPrevButton()
                }}
              />
            </div>
          </div>
        )}
        {showFinalResult && (
          <div className="flex flex-col items-center justify-center text-3xl w-full h-full bg-white rounded-lg shadow-xl">
            <div className="text-5xl">
              Your Score : {totalPoints + '/' + totalQuestions}
            </div>
            <div className="text-3xl mt-4">Thank You</div>
            <div className="text-xl" onClick={onClickPrevButton}>
              Go Back
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizCard
