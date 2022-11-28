import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlass } from 'phosphor-react'
import { toast } from 'react-toastify'

import { Pool } from '../@types'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/axios'

import { PrivateRoute } from '../components/helper/PrivateRoute'
import { Button } from '../components/Button'
import { Pools } from '../components/Pools'
import { CreatePool } from '../components/CreatePool'
import { FindPool } from '../components/FindPool'

export function Home() {
    const [myPools, setMyPools] = useState<Pool[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useAuth()

    async function fetchMyPools() {
        try {
            setIsLoading(true)

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

    async function handleSharePool(poolCode: string) {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(poolCode)
            toast.success('O código foi copiado para a área de transferência')
        }
    }

    async function handleOutPool(poolId: string) {
        try {
            if (confirm('Tem certeza que deseja sair do bolão? Seus palpites serão apagados!')) {
                await api.delete(`/pools/${poolId}/out`)
                toast.success('Você saiu do bolão')
    
                setMyPools((previousPools) =>
                    previousPools.filter((pool) => pool.id !== poolId)
                )
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="container mx-auto mt-28 py-10 px-4">
            <header className="flex flex-col gap-4 justify-between lg:items-center lg:flex-row">
                <div className="flex flex-col gap-4 lg:gap-10 lg:flex-row">
                    <span className="text-3xl text-gray-100 font-bold leading-relaxed">
                        Olá, {user.name}
                    </span>

                    <div>
                        <p className="text-gray-300 text-md mb-2">
                            Bem vindo novamente!
                        </p>
                        <p className="text-gray-300 text-md mb-2">
                            Continue criando seus bolões, e ganhe de seus
                            amigos.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Dialog.Root>
                        <Button
                            as={Dialog.Trigger}
                            variant="secondary"
                            className="flex gap-2 items-center"
                        >
                            <MagnifyingGlass weight="bold" size={16} />
                            Buscar bolão por código
                        </Button>
                        <FindPool onJoin={fetchMyPools} />
                    </Dialog.Root>

                    <Dialog.Root>
                        <Button as={Dialog.Trigger}>Novo bolão</Button>
                        <CreatePool onCreate={fetchMyPools} />
                    </Dialog.Root>
                </div>
            </header>

            <section className="bg-gray-900/20 rounded-lg p-4 mt-14">
                <Pools
                    isLoading={isLoading}
                    data={myPools}
                    onShare={handleSharePool}
                    onOut={handleOutPool}
                />
            </section>
        </main>
    )
}

export default PrivateRoute(Home)
