import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return (
    <Sidebar>
      <ToastContainer />
      <Component {...pageProps} />
    </Sidebar>
  )
}
