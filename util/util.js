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

export const treatRawQuizData = (quiz) => {
  let newQuiz = quiz

  //remove question from array if explanation or option is empty
  newQuiz.questions = newQuiz.questions.filter((question) => {
    return (
      question.explanations.filter((explanation) => explanation !== '').length >
        0 && question.options.filter((option) => option !== '').length > 0
    )
  })

  newQuiz.questions.forEach((question) => {
    const answerPosition = randomIntFromInterval(0, question.options.length - 1)
    let rotatedOptions = rotateArray(question.options, answerPosition)
    let rotatedExplanations = rotateArray(question.explanations, answerPosition)
    question.options = rotatedOptions
    question.explanations = rotatedExplanations
    question.answerPosition = answerPosition
  })
  console.log('newQuiz', newQuiz)
  return newQuiz
}
