import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import clsx from 'clsx'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { Pool } from '../../@types'
import { api } from '../../lib/axios'

import { PrivateRoute } from '../../components/helper/PrivateRoute'
import { Guesses } from '../../components/Guesses'
import { Ranking } from '../../components/Ranking'

export function Pool() {
    const [pool, setPool] = useState<Pool>({} as Pool)
    const [activeTab, setActiveTab] = useState<'guesses' | 'ranking'>('guesses')

    const router = useRouter()
    const { id: poolId } = router.query

    async function fetchPool() {
        try {
            await api.post(`/pools/${poolId}/calculate`)

            const response = await api.get(`/pools/${poolId}`)
            setPool(response.data.pool)

        } catch (error) {
            toast.error('Não foi possivel carregar o bolão')
        }
    }

    useEffect(() => {
        if (poolId) fetchPool()
    }, [poolId])

    const when = dayjs(pool?.createdAt).locale(ptBR).format('DD [de] MMMM [de] YYYY [às] H:00[h]')

    return (
        <main className='container mx-auto mt-28 py-10 px-4'>
            <Head>
                <title>{pool?.title}</title>
            </Head>

            <header className='flex gap-4 flex-col justify-between items-center lg:flex-row'>
                <div className='flex flex-col gap-10 lg:flex-row'>
                    <div className='flex flex-col'>
                        <span className='text-3xl text-gray-100 font-bold leading-tight'>
                            {pool?.title}
                        </span>
                        <span className='text-md font-bold text-yellow-500'>
                            {pool?.code}
                        </span>
                    </div>

                    <div>
                        <p className='text-gray-300 text-sm lg:text-md mb-2'>
                            Criado por {pool?.owner?.name}
                        </p>
                        <p className='text-gray-300 text-sm lg:text-md mb-2'>
                            Criado em {when}
                        </p>
                    </div>
                </div>

                <div 
                    className='text-xs md:text-sm flex text-white rounded font-bold border border-gray-700 divide-x-2 divide-gray-600'
                >
                    <button 
                        className={clsx('uppercase px-6 py-4 h-12 hover:bg-gray-600', {
                            ['bg-gray-600']: activeTab === 'guesses'
                        })}
                        onClick={() => setActiveTab('guesses')}
                    
                    >
                        Seus palpites
                    </button>

                    <button 
                        className={clsx('uppercase px-6 py-4 h-12 hover:bg-gray-600', {
                            ['bg-gray-600']: activeTab === 'ranking'
                        })}
                        onClick={() => setActiveTab('ranking')}
                    
                    >
                        Ranking do grupo
                    </button>
                </div>
            </header>

            <section>
                <div 
                    className={clsx({['hidden']: activeTab !== 'guesses'})}
                >
                    <Guesses
                        poolId={poolId as string}
                    />
                </div>

                <div 
                    className={clsx({['hidden']: activeTab !== 'ranking'})}
                >
                    <Ranking
                        participants={pool?.participants}
                        code={pool?.code}
                    />
                </div>
            </section>
        </main>               
    )
}

export default PrivateRoute(Pool)
