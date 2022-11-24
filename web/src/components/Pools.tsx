import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Export, SignOut, SoccerBall } from 'phosphor-react'

import { Pool } from '../@types'
import { Participants } from './Participants'
import { Tooltip } from './Tooltip'

interface PoolsProps {
    data: Pool[]
    isLoading: boolean
}

export function Pools({ data, isLoading }: PoolsProps) {
    const when = (createdAt: string) =>
        dayjs(createdAt)
            .locale(ptBR)
            .format('DD [de] MMMM [de] YYYY [às] H:00[h]')

    if (isLoading) {
        return (
            <div className='min-h-[400px] flex items-center justify-center'>
                <div className='flex flex-col gap-4 items-center'>
                    <SoccerBall className='text-yellow-500 text-6xl animate-bounce' />
                    <span className='text-yellow-500 leading-relaxed'>Carregando meus boloẽs...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <ul>
                {data.map((pool) => {
                    return (
                        <li
                            key={pool.id}
                            className="border-b border-gray-600 py-4 px-4 flex gap-10 items-center"
                        >
                            <div className="flex flex-col flex-1">
                                <span className="text-gray-100 font-bold text-2xl mb-2">
                                    {pool.title}
                                </span>
                                <span className="block mb-1 font-bold text-sm text-gray-300">
                                    Criado por {pool.owner.name}
                                </span>
                                <span className="text-sm text-gray-300">
                                    {when(pool.createdAt)}
                                </span>
                            </div>

                            <div className="flex gap-4 items-center">
                                <Tooltip title='Detalhes do bolão'>
                                    <button className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                        <SoccerBall weight="bold" />
                                    </button>
                                </Tooltip>

                                <Tooltip title='Compartilhar bolão'>
                                    <button className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                        <Export weight="bold" />
                                    </button>
                                </Tooltip>

                                <Tooltip title='Sair do bolão'>
                                    <button className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                        <SignOut weight="bold" />
                                    </button>
                                </Tooltip>
                            </div>

                            <div className='min-w-[200px] flex justify-end'>
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
