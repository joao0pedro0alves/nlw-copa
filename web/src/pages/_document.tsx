import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
                <link rel="shortcut icon" href="/favicon.png" />
                <title>NLW COPA</title>
            </Head>
            <body 
                className="bg-gray-900 bg-app bg-no-repeat bg-cover scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-corner-rounded-full"
            >
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
