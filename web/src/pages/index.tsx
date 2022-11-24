import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { Pool } from '../@types'

import { PrivateRoute } from '../components/helper/PrivateRoute'
import { Button } from '../components/Button'
import { Pools } from '../components/Pools'
import { api } from '../lib/axios'

export function Home() {
    const [myPools, setMyPools] = useState<Pool[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useAuth()

    async function fetchMyPools() {
        try {
            const response = await api.get('/pools')
            setMyPools(response.data.pools)
            
        } catch (error) {
            console.log(error)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMyPools()
    }, [])

    return (
        <main className='container mx-auto mt-28 py-10 px-4'>

            <header className='flex justify-between items-center'>
                <div className='flex gap-10'>
                    <span className='text-3xl text-gray-100 font-bold leading-relaxed'>Olá, {user.name}</span>

                    <div>
                        <p className='text-gray-300 text-md mb-2'>
                            Bem vindo novamente!
                        </p>
                        <p className='text-gray-300 text-md mb-2'>
                            Continue criando seus bolões, e ganhe de seus amigos.
                        </p>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <Button variant='secondary'>
                        Pesquisar bolão
                    </Button>

                    <Button>
                        Novo bolão
                    </Button>
                </div>
            </header>

            <section className='bg-gray-900/80 rounded p-4 mt-14'>
                <Pools
                    isLoading={isLoading}
                    data={myPools}
                />
            </section>
        </main>               
    )
}

export default PrivateRoute(Home)
