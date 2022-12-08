import clsx from 'clsx'

export interface Tab<OptionValue = string> {
    value: OptionValue
    label: string
}

interface TabsProps<OptionValue = string> {
    tabs: Tab<OptionValue>[]
    value: OptionValue
    onChange: (value: OptionValue) => void
}

export function Tabs<OptionValue>({ value, onChange, tabs }: TabsProps<OptionValue>) {

    const getButtonClassName = (tabValue: OptionValue) =>
        clsx('uppercase px-6 py-4 h-12 hover:bg-gray-600', {
            ['bg-gray-600']: value === tabValue,
        })

    return (
        <div className="text-xs md:text-sm flex text-white rounded font-bold border border-gray-700 divide-x-2 divide-gray-600">
            {tabs.map(({ label, value }, index) => (
                <button
                    key={index}
                    onClick={() => onChange(value)}
                    className={getButtonClassName(value)}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
