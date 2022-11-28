import CountryFlag from 'react-country-flag'

interface TeamProps {
    code: string
    position: 'left' | 'right'
    onChange: (value: string) => void
    disabled: boolean,
    value: string
}

export function Team({ code, position, disabled, value, onChange }: TeamProps) {
    const isAvailable = code.length === 2

    return (
        <div className="flex items-center ">
            {isAvailable && position === 'left' && (
                <CountryFlag
                    countryCode={code}
                    style={{
                        marginRight: 12,
                        fontSize: '2.5em',
                    }}
                />
            )}

            <input
                className="w-full text-sm font-bold text-gray-100 px-4 py-4 rounded bg-gray-600 border border-gray-600 focus:outline-none focus:border-yellow-700 transition-colors disabled:bg-gray-500"
                disabled={disabled}
                value={value}
                onChange={e => onChange(e.target.value)}
            />

            {isAvailable && position === 'right' && (
                <CountryFlag
                    countryCode={code}
                    style={{
                        marginLeft: 12,
                        fontSize: '2.5em',
                    }}
                />
            )}
        </div>
    )
}
