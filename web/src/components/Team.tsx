import CountryFlag from 'react-country-flag'

import { TextField } from './TextField'

interface TeamProps {
    code: string
    position: 'left' | 'right'
    onChange: (value: string) => void
    disabled: boolean
}

export function Team({ code, position, disabled, onChange }: TeamProps) {
    return (
        <div className="flex items-center">
            {position === 'left' && (
                <CountryFlag
                    countryCode={code}
                    style={{
                        marginRight: 12,
                        fontSize: '4em',
                    }}
                />
            )}

            <input
                className="text-sm font-bold text-gray-100 w-20 px-4 py-4 rounded bg-gray-600 border border-gray-600 focus:outline-none focus:border-yellow-700 transition-colors disabled:bg-gray-500"
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
            />

            {position === 'right' && (
                <CountryFlag
                    countryCode={code}
                    style={{
                        marginLeft: 12,
                        fontSize: '4em',
                    }}
                />
            )}
        </div>
    )
}
