import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'
import { uploadFileToFirebaseAndGetUrl } from '../util/util'

const file = () => {
  const [file, setFile] = useState(null)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }
  const removeFile = () => {
    setFile(null)
  }

  const uploadFileAndGenerateQuiz = async () => {
    if (!file) return
    try {
      console.log('start upload file')
      const url = await uploadFileToFirebaseAndGetUrl(file)
      console.log('finished uploading file')
      console.log('url', url)

      alert('upload file success, url: ' + url)

      //todo: call api to generate quiz
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h3 className="text-2xl font-bold w-full text-center mt-20">
        Generate Quiz from Text file
      </h3>
      {/* input file */}
      <div className="w-full flex justify-center mt-10 w-full">
        <div className="border-2 flex flex-col rounded-3xl p-4 border-black">
          {/* <div
            className={`${
              file ? '' : 'border-2 border-gray-300 border-dashed'
            } `}
          > */}
          {file ? (
            <div className="flex flex-row items-center m-4  justify-center bg-gray-200 py-2 px-4 rounded-full text-xl">
              <div>{file.name}</div>
              <AiOutlineClose
                className="ml-4 cursor-pointer"
                onClick={removeFile}
              />
            </div>
          ) : (
            <label
              htmlFor="file"
              className="flex flex-col justify-center items-center text-center text-base rounded-[50px] leading-relaxed m-4 min-w-[300px] border-2 border-gray-300 border-dashed cursor-pointer"
            >
              <div className="flex flex-col  text-center  space-y-1 items-center justify-center w-40 h-40">
                <AiOutlineUpload className="w-12 h-12 text-gray-400" />
                <div>Select (.txt,.pdf file)</div>
              </div>
            </label>
          )}
          {/* </div> */}
          <input
            type="file"
            id="file"
            name="file"
            accept=".txt"
            hidden
            onChange={handleFile}
          />
          <button
            className={`${
              file ? 'bg-black' : 'bg-gray-300'
            }  text-white rounded-[50px] py-2 px-4 text-xl `}
            disabled={!file}
            onClick={uploadFileAndGenerateQuiz}
          >
            Upload and Generate Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default file
