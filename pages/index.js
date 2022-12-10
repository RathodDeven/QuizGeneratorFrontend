import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Quiz Generator</title>
        <meta
          name="description"
          content="Generate Quiz from Topic, Text, File, Video"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-4xl font-bold w-full text-center mt-40">
          AI Quiz Generator
        </h1>
        {/* subtitle */}
        <h2 className="text-2xl w-full text-center mt-4">
          Generate Quiz from Topic, Text, File, Video
        </h2>
      </div>
    </div>
  )
}
