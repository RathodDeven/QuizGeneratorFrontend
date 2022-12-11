import { storage } from './firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

//function rotate array n times
export function rotateArray(arr, n) {
  let temp = arr
  for (let i = 0; i < n; i++) {
    temp.unshift(temp.pop())
  }
  return temp
}

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const uploadFileToFirebaseAndGetUrl = async (file) => {
  console.log('file', file)
  //   const newFile = new File([file], file.name.replace(/\s/g, '_'), {
  //     type: file.type
  //   })
  let type = file.type.split('/')[0]
  if (!type) {
    type = 'other'
  }
  const storageRef = ref(storage, `quiz/${type}/${file.name}`)

  const uploadedToUrl = await uploadBytes(storageRef, file).then(
    async (snapshot) => {
      console.log('Uploaded a blob or file!')
      //return file url
      const url = await getDownloadURL(snapshot.ref).then((url) => {
        console.log('file available at', url)
        return url
      })
      return url
    }
  )
  return uploadedToUrl
}

export const treatRawQuizData = async (quiz) => {
  return new Promise((resolve, reject) => {
    if (!quiz || quiz?.questions.length === 0) {
      reject('No quiz data')
    }
    let newQuiz = quiz
    console.log('newQuiz before', newQuiz)

    //handling if questions are inside questions object
    if (
      typeof newQuiz.questions === 'object' &&
      newQuiz.questions.questions &&
      Array.isArray(newQuiz.questions.questions)
    ) {
      newQuiz.questions = newQuiz.questions.questions
    }

    //remove question from array if explanation or option is empty
    // newQuiz.questions = newQuiz.questions.filter((question) => {
    //   return (
    //     question.explanations.filter((explanation) => explanation !== '')
    //       .length > 0 &&
    //     question.options.filter((option) => option !== '').length > 0
    //   )
    // })

    //for response from text quizes, handle if questions array has elments that are arrays
    //taking the elements out of the array to outside questions array
    newQuiz.questions = newQuiz.questions.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr]
      } else {
        return [...acc, curr]
      }
    }, [])

    newQuiz.questions.filter((question) => {
      return question.question !== '' && question.question !== undefined
    })

    newQuiz.questions.forEach((question) => {
      //do notion if empty options and explanations
      if (question.explanations === [] || question.options === []) return

      const answerPosition = randomIntFromInterval(
        0,
        question.options.length - 1
      )
      let rotatedOptions = rotateArray(question.options, answerPosition)
      let rotatedExplanations = rotateArray(
        question.explanations,
        answerPosition
      )
      question.options = rotatedOptions
      question.explanations = rotatedExplanations
      question.answerPosition = answerPosition
    })
    console.log('newQuiz', newQuiz)
    resolve(newQuiz)
  })
}

//google supported languages
export const GOOGLE_SUPPORTED_LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Bulgarian', code: 'bg' },
  { name: 'Catalan', code: 'ca' },
  { name: 'Chinese', code: 'zh' },
  { name: 'Croatian', code: 'hr' },
  { name: 'Czech', code: 'cs' },
  { name: 'Danish', code: 'da' },
  { name: 'Dutch', code: 'nl' },
  { name: 'Estonian', code: 'et' },
  { name: 'Finnish', code: 'fi' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Greek', code: 'el' },
  { name: 'Hebrew', code: 'he' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Hungarian', code: 'hu' },
  { name: 'Indonesian', code: 'id' },
  { name: 'Italian', code: 'it' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Korean', code: 'ko' },
  { name: 'Latvian', code: 'lv' },
  { name: 'Lithuanian', code: 'lt' },
  { name: 'Norwegian', code: 'no' },
  { name: 'Polish', code: 'pl' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Romanian', code: 'ro' },
  { name: 'Russian', code: 'ru' },
  { name: 'Serbian', code: 'sr' },
  { name: 'Slovak', code: 'sk' },
  { name: 'Slovenian', code: 'sl' },
  { name: 'Spanish', code: 'es' },
  { name: 'Swedish', code: 'sv' },
  { name: 'Thai', code: 'th' },
  { name: 'Turkish', code: 'tr' },
  { name: 'Ukrainian', code: 'uk' },
  { name: 'Vietnamese', code: 'vi' }
]
