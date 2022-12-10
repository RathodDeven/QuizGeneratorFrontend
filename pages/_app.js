import Sidebar from '../components/sidebar/Sidebar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="h-screen w-full">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
