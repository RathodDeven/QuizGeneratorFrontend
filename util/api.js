import { API_ENDPOINT_URL } from './config'

const NUM_QUESTIONS = 5

export const generateQuizFromTopic = async (topic) => {
  try {
    const response = await fetch(`${API_ENDPOINT_URL}/quiz/topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: topic,
        target_lang: 'en',
        num_questions: NUM_QUESTIONS
      })
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
