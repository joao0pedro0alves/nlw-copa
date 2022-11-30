import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'

import { AuthContextProvider } from '../contexts/Auth'
import { ToastContainer, Slide } from 'react-toastify'

import { Navbar } from '../components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Navbar />

            <Component {...pageProps} />

            <ToastContainer
                transition={Slide}
                toastClassName='text-sm'
                icon={false}
                position="bottom-left"
                theme="colored"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
            />
        </AuthContextProvider>
    )
}
