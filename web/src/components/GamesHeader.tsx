import clsx from 'clsx'
import { Button } from './Button'
import * as Dialog from '@radix-ui/react-dialog'

export type GameCategory = 'G' | 'O' | 'Q' | 'S' | 'F'

interface GamesHeaderProps {
    value: GameCategory
    onChange: (category: GameCategory) => void
    showAddButton?: boolean
}

export function GamesHeader({value = 'G', showAddButton, onChange}: GamesHeaderProps) {

    const getButtonProps = (category: GameCategory) => ({
        onClick: () => onChange(category),
        className: clsx(
            'flex items-center rounded justify-center h-10 p-4 text-sm transition-all',
            value === category
                ? 'bg-green-500 font-bold hover:bg-green-600'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-600/50'
        )
    })

    return (
        <div className="bg-gray-800 border-b border-gray-600 p-4 mb-4 flex justify-between">  

            <div className='flex gap-2'>
                <button {...getButtonProps('G')}>Fase de grupos</button>
                <button {...getButtonProps('O')}>Oitavas</button>
                <button {...getButtonProps('Q')}>Quartas</button>
                <button {...getButtonProps('S')}>Semifinais</button>
                <button {...getButtonProps('F')}>Final</button>
            </div>

            {showAddButton && (
                <Button as={Dialog.Trigger}>
                    Cadastrar jogo
                </Button>
            )}
        </div>
    )
}
