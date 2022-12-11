import { API_ENDPOINT_URL } from './config'

export const generateQuizFromTopic = async (topic) => {
  try {
    const response = await fetch(`${API_ENDPOINT_URL}/quiz/topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: topic, target_lang: 'en', num_questions: 5 })
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
