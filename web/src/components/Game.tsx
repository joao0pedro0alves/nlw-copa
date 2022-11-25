import { X } from 'phosphor-react'
import { getName } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { Game as IGame } from '../@types'
import { Team } from './Team'

interface Props {
    data: IGame
    onGuessConfirm: (gameId: string) => Promise<void>
    setFirstTeamPoints: (value: string) => void
    setSecondTeamPoints: (value: string) => void
}

export function Game({
    data,
    setFirstTeamPoints,
    setSecondTeamPoints,
    onGuessConfirm,
}: Props) {

    const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY [às] H:00[h]")
    
    const isFinish = new Date() > new Date(data.date)

    console.log(isFinish)

    return (
        <li className='w-full bg-gray-800 rounded-sm flex flex-col items-center border-b-2 border-yellow-500 mb-3 p-4'>

            <h3 className='text-gray-100 font-bold text-lg leading-relaxed'>
                {getName(data.firstTeamCountryCode)} vs.{' '}
                {getName(data.secondTeamCountryCode)}
            </h3>

            <span className='text-gray-300 text-sm'>
                {when}
            </span>

            <div className='mt-4 w-full flex justify-between items-center'>
                <Team
                    code={data.firstTeamCountryCode}
                    position="right"
                    onChange={setFirstTeamPoints}
                    disabled={isFinish}
                />

                <X weight='bold' className='text-gray-300 text-2xl' />

                <Team
                    code={data.secondTeamCountryCode}
                    position="left"
                    onChange={setSecondTeamPoints}
                    disabled={isFinish}
                />
            </div>

            {!data.guess && (
                <button
                    className='
                        px-6 py-4 rounded w-full text-white bg-green-600 mt-4 flex gap-4 items-center justify-center transition-colors
                        hover:bg-green-700
                        disabled:bg-gray-600 disabled:text-gray-300 disabled:pointer-events-none'
                    onClick={() => onGuessConfirm(data.id)}
                    disabled={isFinish}
                >
                    <span className='text-sm font-bold uppercase'>
                        {isFinish ? 'Tempo esgotado' : 'Confirmar palpite'}
                    </span>
                </button>
            )}
        </li>
    )
}
