import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CaretRight } from 'phosphor-react'

import clsx from 'clsx'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { Pool } from '../../@types'
import { api } from '../../lib/axios'

import { PrivateRoute } from '../../components/helper/PrivateRoute'
import { Tabs } from '../../components/helper/Tabs'
import { Guesses } from '../../components/Guesses'
import { Ranking } from '../../components/Ranking'

type PoolTabs = 'guesses' | 'ranking'

export function Pool() {
    const [pool, setPool] = useState<Pool>({} as Pool)
    const [activeTab, setActiveTab] = useState<PoolTabs>('guesses')

    const router = useRouter()
    const { id: poolId } = router.query

    async function calculatePoolParticipantPoints(userId = '') {
        try {
            await api.post(`/pools/${poolId}/calculate/${userId}`)

            if (userId) {
                toast.success('Pontos calculados.')
            }
        } catch (error) {
            console.log(error)
            toast.error('Não foi possivel calcular os pontos, tente novamente.')
            throw error
        }
    }

    async function fetchPool(userId = '') {
        try {
            await calculatePoolParticipantPoints(userId)

            const response = await api.get(`/pools/${poolId}`)
            setPool(response.data.pool)
        } catch (error) {
            console.log(error)
            toast.error('Não foi possivel carregar o bolão, tente novamente.')
        }
    }

    useEffect(() => {
        if (poolId) fetchPool()
    }, [poolId])

    const when = dayjs(pool?.createdAt)
        .locale(ptBR)
        .format('DD [de] MMMM [de] YYYY [às] H:00[h]')

    const getTabContainerClassName = (tabValue: PoolTabs) => clsx({ ['hidden']: activeTab !== tabValue })

    return (
        <main className="container mx-auto mt-28 py-10 px-4">
            <Head>
                <title>{pool?.title}</title>
            </Head>

            <header className="flex gap-4 flex-col justify-between items-center lg:flex-row">
                <div className="flex flex-col gap-10 lg:flex-row">
                    <div className="flex flex-col">
                        <span className="text-3xl text-gray-100 font-bold leading-tight">
                            {pool?.title}
                        </span>
                        <span className="text-md font-bold text-yellow-500">
                            {pool?.code}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-300 text-sm lg:text-md mb-2">
                            Criado por {pool?.owner?.name}
                        </p>
                        <p className="text-gray-300 text-sm lg:text-md mb-2">
                            Criado em {when}
                        </p>
                    </div>
                </div>

                <Tabs<PoolTabs>
                    value={activeTab}
                    onChange={setActiveTab}
                    tabs={[
                        { label: 'Seus palpites', value: 'guesses' },
                        { label: 'Ranking do grupo', value: 'ranking' },
                    ]}
                />
            </header>

            <div>
                <section className={getTabContainerClassName('guesses')}>
                    <Guesses 
                        poolId={poolId as string} 
                    />
                </section>

                <section className={getTabContainerClassName('ranking')}>
                    <Ranking
                        onCalculate={fetchPool}
                        participants={pool?.participants}
                        poolCode={pool?.code}
                    />
                </section>
            </div>

            <div className='mt-4 flex justify-center'>
                <Link target='_blank' href={`/pools/guesses/${poolId}?title=${pool?.title}&nav=0`} className='text-yellow-500 hover:underline flex items-center gap-2'>
                    Clique aqui para comparar os palpites
                    <CaretRight className='text-lg' weight='bold' />
                </Link>
            </div>
        </main>
    )
}

export default PrivateRoute(Pool)
