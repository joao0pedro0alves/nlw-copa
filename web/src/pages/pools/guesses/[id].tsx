import Head from 'next/head'
import { useRouter } from 'next/router'

import { PrivateRoute } from '../../../components/helper/PrivateRoute'
import { GuessesTable } from '../../../components/GuessesTable'

export function Guesses() {
    const router = useRouter()
    const { id: poolId } = router.query

    return (
        <main className="container mx-auto px-4">
            <Head>
                <title>Pontuação</title>
            </Head>

            <section className='bg-gray-900/50 pb-4 rounded-lg overflow-auto apply-custom-scrollbar relative max-h-screen'>
                <GuessesTable 
                    poolId={poolId as string}
                />
            </section>
        </main>
    )
}

export default PrivateRoute(Guesses)
