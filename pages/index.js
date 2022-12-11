import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Material Digest</title>
        <meta name="description" content="Generate Quizes and take a test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-4xl font-bold w-full text-center mt-24">
          Material Digest
        </h1>
        {/* subtitle */}
        <h2 className="text-2xl w-full text-center mt-4">
          Generate Quizes and take a test
        </h2>
        {/* scene image */}
        <div className="w-full flex flex-row justify-center items-center mt-10 w-full">
          <img src="/bg.jpeg" alt="quiz-scene" className="w-[80%] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
