import clsx from 'clsx'

export type GameCategory = 'G' | 'O' | 'Q' | 'S' | 'F'

interface GamesFilterProps {
    value: GameCategory
    onChange: (category: GameCategory) => void
}

export function GamesFilter({value = 'G', onChange}: GamesFilterProps) {

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
        <div className="bg-gray-800 border-b border-gray-600 flex gap-2 p-4 mb-4 transition-all">  
            <button {...getButtonProps('G')}>Fase de grupos</button>
            <button {...getButtonProps('O')}>Oitavas</button>
            <button {...getButtonProps('Q')}>Quartas</button>
            <button {...getButtonProps('S')}>Semifinais</button>
            <button {...getButtonProps('F')}>Final</button>
        </div>
    )
}
