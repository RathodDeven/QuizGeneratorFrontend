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
