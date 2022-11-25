import { CrownSimple } from 'phosphor-react'
import clsx from 'clsx'
import { Participant } from '../@types'

interface RankingProps {
    participants: Participant[]
}

export function Ranking({ participants = [] }: RankingProps) {
    return (
        <div className="bg-gray-900/20 rounded-lg p-4 mt-14 mx-auto max-h-[600px] overflow-auto apply-custom-scrollbar">
            {participants.length === 0 ? (
                <div className="text-center">
                    <span className="text-gray-300">
                        Esse bolão ainda não tem participantes, que tal{' '}
                        <span className="text-yellow-500">
                            compartilhar o código
                        </span>{' '}
                        do bolão com alguém? Use o código JP3640
                    </span>
                </div>
            ) : (
                <ul className="flex flex-col gap-4">
                    {participants.map((participant, index) => {

                        const ranking = index + 1 // Essa lista é ordenada pela quantidade de pontos do usuário
                        const isChampion = ranking === 1
                        const isFinalist = ranking < 4

                        return (
                            <li className="bg-gray-800 rounded border-b-2 border-yellow-500 py-4 px-4 flex gap-4 items-center">
                                
                                <div className='relative'>
                                    {participant.user.avatarUrl ? (
                                        <img 
                                            className='border-2 border-yellow-500 w-16 h-16 rounded-full' 
                                            src={participant.user.avatarUrl} alt="" 
                                        />
                                    ) : (
                                        <div className='bg-gray-800 border-gray-600 border-2 flex items-center justify-center w-16 h-16 rounded-full'>
                                            <span className="text-2xl text-gray-100 font-bold">
                                                {participant.user.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {isChampion && (
                                        <CrownSimple
                                            weight='fill' 
                                            className='text-yellow-500 text-4xl absolute -top-6 left-1 -rotate-12'
                                        />
                                    )}
                                </div>

                                <div className='flex-1'>
                                    <span className='block text-lg font-bold text-white'>
                                        {participant.user.name}
                                    </span>
                                    <span className='block text-sm text-gray-300'>
                                        {participant.amountPoints} ponto(s)
                                    </span>
                                </div>

                                <div 
                                    className={clsx(
                                        'px-4 py-1 rounded-3xl',
                                        isFinalist ? 'bg-yellow-500 text-gray-900' : 'bg-gray-600 text-gray-300'
                                    )}
                                >
                                    <span className='font-bold text-lg'>
                                        {index + 1}º
                                    </span>
                                </div>

                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
