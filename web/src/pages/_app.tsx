import '../styles/global.css'
import "react-toastify/dist/ReactToastify.css"
import type { AppProps } from 'next/app'

import { AuthContextProvider } from '../contexts/Auth'
import { ToastContainer } from "react-toastify"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />

            <ToastContainer
                position="top-right"
                theme='colored'
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
            />
        </AuthContextProvider>
    )
}
