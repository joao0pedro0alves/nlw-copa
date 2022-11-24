import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Export, SignOut, SoccerBall } from 'phosphor-react'

import { Pool } from '../@types'
import { Participants } from './Participants'

interface PoolsProps {
    data: Pool[]
    isLoading: boolean
}

export function Pools({ data }: PoolsProps) {
    const when = (createdAt: string) =>
        dayjs(createdAt)
            .locale(ptBR)
            .format('DD [de] MMMM [de] YYYY [às] H:00[h]')

    return (
        <div>
            <ul>
                {data.map((pool) => {
                    return (
                        <li
                            key={pool.id}
                            className="border-y border-gray-600 py-4 px-4 flex gap-10 items-center"
                        >
                            <div className="flex flex-col flex-1">
                                <span className="text-gray-100 font-bold leading-tight text-2xl mb-2">
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
                                <button className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                    <SoccerBall weight="bold" />
                                </button>

                                <button className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                    <Export weight="bold" />
                                </button>

                                <button className="text-gray-100 text-2xl w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-gray-900 transition-colors">
                                    <SignOut weight="bold" />
                                </button>
                            </div>

                            <div>
                                <Participants
                                    participants={pool.participants}
                                    count={pool._count.participants}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
