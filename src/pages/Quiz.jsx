import React, { useState } from 'react';

const MultipleChoiceQuiz = ({ questions }) => {
  // Define the state variable for the selected answers
  const [selectedAnswers, setSelectedAnswers] = useState([Array.from({ length: questions.length })]);

  // Helper function to handle changes to the selected answers
  const handleAnswerChange = (event, index) => {
    const { value } = event.target;
    // Use the splice method to update the selectedAnswers array in-place
    selectedAnswers.splice(index, 1, value);
    setSelectedAnswers([...selectedAnswers]);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.question}>
          <h1>{question.question}</h1>
          <ul>
            {question.options.map((option, i) => (
              <li key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={event => handleAnswerChange(event, index)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {selectedAnswers[index] && (
            <p>{question.explanations[question.options.indexOf(selectedAnswers[index])]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuiz;