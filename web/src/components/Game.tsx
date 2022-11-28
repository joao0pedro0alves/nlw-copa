import { memo, useState, useEffect } from 'react'
import clsx from 'clsx'

import { X } from 'phosphor-react'
import { getName } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { Game as IGame } from '../@types'
import { Team } from './Team'

interface Props {
    data: IGame
    onGuessConfirm: (
        gameId: string,
        firstTeamPoints: string,
        secondTeamPoints: string
    ) => Promise<void>
}

export function Game({
    data,
    onGuessConfirm,
}: Props) {
    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')

    const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY") //  [às] H:00[h]
    
    const isFinish = new Date() > new Date(data.date)
    const isGuessed = data.guess !== null
 
    function getCountryName(code: string) {
        if (code.length > 2) return code
        else return getName(code)
    }

    useEffect(() => {
        if (data.guess) {
            setFirstTeamPoints(data.guess.firstTeamPoints + '')
            setSecondTeamPoints(data.guess.secondTeamPoints + '')
        }

    }, [data.guess])

    return (
        <li className='w-full bg-gray-800 rounded flex flex-col items-center p-4'>

            <h3 className='text-gray-100 font-bold text-md leading-relaxed max-w-[300px] whitespace-nowrap overflow-hidden overflow-ellipsis'>
                {getCountryName(data.firstTeamCountryCode)} vs.{' '}
                {getCountryName(data.secondTeamCountryCode)}
            </h3>

            <span className='text-gray-300 text-sm'>
                {when}
            </span>

            <div className='mt-4 w-full flex gap-2 justify-between items-center'>
                <Team
                    code={data.firstTeamCountryCode}
                    position="right"
                    onChange={setFirstTeamPoints}
                    disabled={isFinish || isGuessed}
                    value={firstTeamPoints}
                />

                <X weight='bold' className='text-gray-300 text-2xl' />

                <Team
                    code={data.secondTeamCountryCode}
                    position="left"
                    onChange={setSecondTeamPoints}
                    disabled={isFinish || isGuessed}
                    value={secondTeamPoints}
                />
            </div>

            {isFinish ? (
                <div className='mt-4 flex gap-4 items-center'>
                    <span className='text-white'>{data.firstTeamGoals}</span>

                    <X weight='bold' className='text-gray-300 text-lg' />

                    <span className='text-white'>{data.secondTeamGoals}</span>
                </div>
            ) : <div className="flex-1"></div> }

            <button
                className={clsx(
                    'px-6 py-3 rounded w-full mt-4 flex gap-4 items-center justify-center transition-colors',
                    'disabled:bg-gray-600 disabled:text-gray-300 disabled:pointer-events-none',
                    isGuessed 
                        ? 'bg-yellow-500 text-gray-900 pointer-events-none'
                        : 'bg-green-600 hover:bg-green-700 text-white',
                )}
                onClick={() => onGuessConfirm(data.id, firstTeamPoints, secondTeamPoints)}
                disabled={isFinish}
            >
                {isGuessed ? (
                    <span className='text-sm font-bold uppercase'>
                        Palpite confirmado
                    </span>
                ) : (
                    <span className='text-sm font-bold uppercase'>
                        {isFinish ? 'Tempo esgotado' : 'Confirmar palpite'}
                    </span>
                )}
            </button>

        </li>
    )
}

export default memo(Game)
