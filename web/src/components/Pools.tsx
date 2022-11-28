import Link from 'next/link'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Export, SignOut, SoccerBall } from 'phosphor-react'

import { Pool } from '../@types'
import { Participants } from './Participants'
import { Tooltip } from './helper/Tooltip'
import { SoccerLoading } from './helper/SoccerLoading'

interface PoolsProps {
    data: Pool[]
    isLoading: boolean
    onShare: (poolCode: string) => Promise<void>
    onOut: (poolId: string) => Promise<void>
}

export function Pools({ data, isLoading, onShare, onOut }: PoolsProps) {
    const when = (createdAt: string) =>
        dayjs(createdAt)
            .locale(ptBR)
            .format('DD [de] MMMM [de] YYYY [às] H:00[h]')

    if (isLoading) {
        return (
            <SoccerLoading 
                loadingText='Carregando meus boloẽs...'
            />
        )
    }

    return (
        <div>
            <ul>
                {data.map((pool) => {
                    return (
                        <li
                            key={pool.id}
                            className="border-b-2 border-yellow-500 flex flex-col gap-5 py-4 lg:border-gray-600 lg:px-4 lg:flex-row lg:gap-10 lg:items-center"
                        >
                            <div className="flex flex-col flex-1">
                                <span className="text-gray-100 font-bold text-2xl mb-2">
                                    {pool.title}
                                </span>
                                <span className="block mb-1 text-sm text-gray-300">
                                    Criado por {pool.owner.name}
                                </span>
                                <span className="text-sm text-gray-300">
                                    {when(pool.createdAt)}
                                </span>
                            </div>

                            <div className="flex gap-4 items-center">
                                <Tooltip title='Detalhes do bolão'>
                                    <Link href={`/pools/${pool.id}`} className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                        <SoccerBall weight="bold" />
                                    </Link>
                                </Tooltip>

                                <Tooltip title='Compartilhar bolão'>
                                    <button 
                                        className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors"
                                        onClick={() => onShare(pool.code)}
                                    >
                                        <Export weight="bold" />
                                    </button>
                                </Tooltip>

                                <Tooltip title='Sair do bolão'>
                                    <button 
                                        className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors"
                                        onClick={() => onOut(pool.id)}
                                    >
                                        <SignOut weight="bold" />
                                    </button>
                                </Tooltip>
                            </div>

                            <div className='min-w-[200px] flex lg:justify-end'>
                                <Participants
                                    participants={pool.participants}
                                    count={pool._count.participants}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>

            
            {data.length === 0 && (
                <div className='text-center'>
                    <span className='text-gray-300'>
                        Você ainda não está participando de nenhum bolão, que tal <span className='text-yellow-500'>buscar um por código</span> ou <span className='text-yellow-500'>criar um novo</span> ?
                    </span>
                </div>
            )}
        </div>
    )
}
