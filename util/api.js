export const API_ENDPOINT_URL =
  'https://quiz-backend-production-768d.up.railway.app'
const NUM_QUESTIONS_FOR_TOPIC = 5
const NUM_QUESTIONS_FOR_TEXT = 5

export const generateQuizFromTopic = async (topic, target_lang = 'en') => {
  try {
    const response = await fetch(`${API_ENDPOINT_URL}/quiz/topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: topic,
        target_lang: target_lang,
        num_questions: NUM_QUESTIONS_FOR_TOPIC
      })
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
  }
}

export const generateQuizFromText = async (text, target_lang = 'en') => {
  try {
    const response = await fetch(`${API_ENDPOINT_URL}/quiz/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        target_lang: target_lang,
        num_questions: NUM_QUESTIONS_FOR_TEXT
      })
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
  }
}

export const generateQuizFromFile = async (file, target_lang = 'en') => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_lang', target_lang)
    formData.append('num_questions', NUM_QUESTIONS)
    const response = await fetch(`${API_ENDPOINT_URL}/quiz/file`, {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
  }
}

export const generateQuizFromMediaFileUrl = async (
  fileUrl,
  target_lang = 'en'
) => {
  try {
    const response = await fetch(`${API_ENDPOINT_URL}/quiz/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        save_url: fileUrl,
        target_lang: target_lang,
        num_questions: NUM_QUESTIONS
      })
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
  }
}
