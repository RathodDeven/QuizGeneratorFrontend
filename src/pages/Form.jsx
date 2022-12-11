import React, { useState } from 'react';
import axios from 'axios';
import MultipleChoiceQuiz from './Quiz';
import { TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Form = () => {
  // Define state variables to store the form data
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Define state variables to track which input option is selected
  const [selectedInputOption, setSelectedInputOption] = useState('topic');

  // Helper function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsGenerating(true);
    if (!topic && !text && !file) {
      alert('Please enter a topic, text, or file');
      return;
    }

    // Create a FormData object to send the data in the request body
    const data = new FormData();
    // Add the selected input option and its value to the request body
    if (selectedInputOption === 'topic') {
      data.append('text', topic);
      data.append('wiki', true);
    } else if (selectedInputOption === 'text') {
      data.append('text', text);
      data.append('wiki', false);
    } else if (selectedInputOption === 'file') {
      console.log(file)
      data.append('file', file);
      data.append('wiki', false);
    }
    data.append('num_questions', numQuestions);
    
    const config = {
      headers: {
        // add any headers you want to send with the request
        //'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST"
      }
    };
    // Send a request to the Python API with the form data
    axios
      .post('http://127.0.0.1:5000/quiz', data, config)
      .then((response) => {
        // Handle the response from the API
        // (e.g. display the generated quiz to the user)
        setQuizQuestions(response.data["questions"]);

        //put the generated quiz into the database
        axios.put('http://127.0.0.1:5000/quiz', response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
      })
      .finally(() => setIsGenerating(false));
  };
  // Helper function to handle changes to the selected input option
  const handleInputOptionChange = (event) => {
    setSelectedInputOption(event.target.value);
  };
  // Helper function to handle changes to the uploaded file
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file)
  };

  // Render the form
  return (
    <div>
    <form onSubmit={handleSubmit} >
    <h1>Generate a Quiz</h1>
    <div>
    <label>
      <input
        type="radio"
        name="input-option"
        value="topic"
        checked={selectedInputOption === 'topic'}
        onChange={handleInputOptionChange}
      />
      Enter a topic
    </label>
    </div>
    <div>
    <label>
      <input
        type="radio"
        name="input-option"
        value="text"
        checked={selectedInputOption === 'text'}
        onChange={handleInputOptionChange}
      />
      Paste a block of text
    </label>
    </div>
    <div>
    <label>
      <input
        type="radio"
        name="input-option"
        value="file"
        checked={selectedInputOption === 'file'}
        onChange={handleInputOptionChange}
      />
      Upload a file
    </label>
    </div>
    {selectedInputOption === 'topic' && (
    <div>
      <label>
        Topic:
        <TextField
          type="text"
          name="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          maxRows={1}
        />
      </label>
    </div>
  )}
  {selectedInputOption === 'text' && (
    <div>
      <label>
        Text:
        <TextField
          name='text'
          value={text}
          onChange={(event) => setText(event.target.value)}
          multiline
        />
      </label>
    </div>
  )}
    {selectedInputOption === 'file' &&(
      <div>
      <label>
      Select a PDF or text file to upload:
        <input
          type="file"
          accept=".pdf, .txt"
          name="fileInput"
          onChange={handleFileChange}
          required
        />
      </label>
    </div>
    )}
    <div>
    <label>
      Number of questions:
      <input
        type="number"
        value={numQuestions}
        onChange={(event) => setNumQuestions(event.target.value)}
      />
    </label>
    </div>
      <input type="submit" value="Generate Quiz" />
    </form>
    {quizQuestions.length > 0 && (
        <MultipleChoiceQuiz questions={quizQuestions} />
      )}
    {isGenerating && (<CircularProgress/>)}
    </div>
  );
};

export default Form;
