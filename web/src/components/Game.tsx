import { memo, useState, useEffect } from 'react'
import clsx from 'clsx'
import { getName } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { X } from 'phosphor-react'

import { Game as IGame } from '../@types'
import { Team } from './Team'

interface Props {
    data: IGame
    isGuess?:boolean

    onGuessConfirm?: (
        gameId: string,
        firstTeamPoints: string,
        secondTeamPoints: string
    ) => Promise<void>
    
    onResultConfirm?: (
        gameId: string,
        firstTeamGoals: string,
        secondTeamGoals: string
    ) => Promise<void>
}

export function Game({
    data,
    isGuess = true,
    onGuessConfirm,
    onResultConfirm,
}: Props) {

    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')

    const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY") //  [às] H:00[h]
    
    const isFinish = new Date() > new Date(data.date)
    const isGuessed = data.guess !== null

    const disabledTeamInput = isGuess ? (isFinish || isGuessed) : !isFinish
 
    function getCountryName(code: string) {
        if (code.length > 2) return code
        else return getName(code)
    }

    function handleConfirm() {
        const onConfirm = isGuess ? onGuessConfirm : onResultConfirm

        if (onConfirm) {
            onConfirm(data.id, firstTeamPoints, secondTeamPoints)
        }
    }

    useEffect(() => {
        if (isGuess && data.guess) {
            setFirstTeamPoints(data.guess.firstTeamPoints + '')
            setSecondTeamPoints(data.guess.secondTeamPoints + '')

        } else {
            setFirstTeamPoints(data.firstTeamGoals !== null ? data.firstTeamGoals + '' : '')
            setSecondTeamPoints(data.secondTeamGoals !== null ? data.secondTeamGoals + '' : '')
        }

    }, [data.guess])

    return (
        <li className="w-full bg-gray-800 rounded flex flex-col items-center p-4">
            <h3 className="text-gray-100 font-bold text-md leading-relaxed max-w-[300px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                {getCountryName(data.firstTeamCountryCode)} vs.{' '}
                {getCountryName(data.secondTeamCountryCode)}
            </h3>

            <span className="text-gray-300 text-sm">{when}</span>

            <div className="mt-4 w-full flex gap-2 justify-between items-center">
                <Team
                    code={data.firstTeamCountryCode}
                    position="right"
                    onChange={setFirstTeamPoints}
                    disabled={disabledTeamInput}
                    value={firstTeamPoints}
                />

                <X weight="bold" className="text-gray-300 text-2xl" />

                <Team
                    code={data.secondTeamCountryCode}
                    position="left"
                    onChange={setSecondTeamPoints}
                    disabled={disabledTeamInput}
                    value={secondTeamPoints}
                />
            </div>

            {isGuess && isFinish ? (
                <div className="mt-4 flex gap-4 items-center">
                    <span className="text-white">{data.firstTeamGoals}</span>
                    <X weight="bold" className="text-gray-300 text-lg" />
                    <span className="text-white">{data.secondTeamGoals}</span>
                </div>
            ) : (
                <div className="flex-1" />
            )}

            {isGuess ? (
                <button
                    className={clsx(
                        'px-6 py-3 rounded w-full mt-4 flex gap-4 items-center justify-center transition-colors',
                        'disabled:bg-gray-600 disabled:text-gray-300 disabled:pointer-events-none',
                        isGuessed
                            ? 'bg-yellow-500 text-gray-900 pointer-events-none'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    )}
                    onClick={handleConfirm}
                    disabled={isFinish}
                >
                    <span className="text-sm font-bold uppercase">
                        {isGuessed ? 'Palpite confirmado' : (isFinish ? 'Tempo esgotado' : 'Confirmar palpite')}
                    </span>
                </button>
            ) : (
                <button
                    className={clsx(
                        'px-6 py-3 rounded w-full mt-4 flex gap-4 items-center justify-center transition-colors',
                        'disabled:bg-gray-600 disabled:text-gray-300 disabled:pointer-events-none',
                        'bg-green-600 hover:bg-green-700 text-white'
                    )}
                    onClick={handleConfirm}
                    disabled={!isFinish}
                >
                    <span className="text-sm font-bold uppercase">
                        Salvar resultado
                    </span>
                </button>
            )}
        </li>
    )
}

export default memo(Game)
