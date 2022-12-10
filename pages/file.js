import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'

const file = () => {
  const [file, setFile] = useState(null)

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }
  const removeFile = () => {
    setFile(null)
  }

  const uploadFileAndGenerateQuiz = async () => {}
  return (
    <div>
      <h3 className="text-2xl font-bold w-full text-center mt-20">
        Generator Quiz from Text (.txt) file
      </h3>
      {/* input file */}
      <div className="w-full flex justify-center mt-10 w-full">
        <div className="border-2 flex flex-col rounded-[50px] p-8 border-black">
          <div
            className={`flex flex-col justify-center items-center text-center text-base rounded-[50px] leading-relaxed m-4 min-w-[300px] ${
              file ? '' : 'border-2 border-gray-300 border-dashed'
            } `}
          >
            {file ? (
              <div className="flex flex-row items-center justify-center bg-gray-200 py-2 px-4 rounded-full text-xl">
                <div>{file.name}</div>
                <AiOutlineClose
                  className="ml-4 cursor-pointer"
                  onClick={removeFile}
                />
              </div>
            ) : (
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col  text-center  space-y-1 items-center justify-center w-40 h-40">
                  <AiOutlineUpload className="w-12 h-12 text-gray-400" />
                  <div>Upload (.txt file) and generate Quiz</div>
                </div>
              </label>
            )}
          </div>
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
            Upload and generate quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default file
