import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GoFileMedia } from 'react-icons/go'
import { uploadFileToFirebaseAndGetUrl } from '../util/util'

const video = () => {
  const [file, setFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)

  const handleFile = (e) => {
    if (!e.target.files[0]) return
    setFile(e.target.files[0])
    //check type of file and set url
    if (e.target.files[0].type.includes('video')) {
      setVideoUrl(URL.createObjectURL(e.target.files[0]))
    } else if (e.target.files[0].type.includes('audio')) {
      setAudioUrl(URL.createObjectURL(e.target.files[0]))
    }
  }
  const removeFile = () => {
    setAudioUrl(null)
    setVideoUrl(null)
    setFile(null)
  }

  const uploadFileAndGenerateQuiz = async () => {
    if (!file) return
    try {
      console.log('start upload file')
      const url = uploadFileToFirebaseAndGetUrl(file)
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
        Generator Quiz from Media (Video & Audio)
      </h3>
      {/* input file */}
      <div className="w-full flex justify-center mt-10 w-full">
        <div className="border-2 flex flex-col rounded-3xl p-8 border-black">
          {/* <div
            className={`flex flex-col justify-center items-center text-center text-base rounded-[50px] leading-relaxed m-4 min-h-[300px] min-w-[400px] ${
              file ? '' : 'border-2 border-gray-300 border-dashed'
            } `}
          > */}
          {videoUrl || audioUrl ? (
            <div className="flex flex-col items-center justify-center ">
              <div className="w-full flex flex-row justify-end">
                <AiOutlineClose
                  className="w-4 h-4 cursor-pointer rounded-full border-black border-2 mb-2"
                  onClick={removeFile}
                />
              </div>
              {videoUrl && (
                <video
                  src={videoUrl}
                  controls
                  className="w-[400px] rounded-2xl mb-4"
                />
              )}
              {audioUrl && (
                <audio
                  src={audioUrl}
                  controls
                  className="w-[400px] rounded-2xl mb-4"
                />
              )}
            </div>
          ) : (
            <label
              htmlFor="file"
              className="flex flex-col justify-center items-center text-center text-base rounded-2xl leading-relaxed m-4 min-h-[250px] min-w-[400px] border-2 border-gray-300 border-dashed cursor-pointer"
            >
              <div className="flex flex-col  text-center  space-y-1 items-center justify-center w-40 h-40">
                <GoFileMedia className="w-12 h-12 text-gray-400" />
                <div>Select Media File</div>
              </div>
            </label>
          )}
          {/* </div> */}
          <input
            type="file"
            id="file"
            name="file"
            //accept media files
            accept="video/*,audio/*"
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

export default video
