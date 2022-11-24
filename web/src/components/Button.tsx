import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import { Oval } from 'react-loader-spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    variant?: 'primary' | 'secondary'
}

export function Button({
    isLoading,
    className,
    variant = 'primary',
    ...props
}: ButtonProps) {

    const isSecondary = variant === 'secondary'

    return (
        <button
            className={clsx(
                className,
                'relative h-12 px-6 py-4 rounded font-bold text-sm uppercase',
                isSecondary ? 'text-white border border-gray-700 bg-gray-900 hover:bg-gray-800' : 'text-gray-900 bg-yellow-500 hover:bg-yellow-700'
            )}
        >
            {!isLoading ? (
                <span>{props.children}</span>
            ) : (
                <Oval
                    height={24}
                    width={24}
                    wrapperStyle={{}}
                    wrapperClass="absolute inset-0 flex items-center justify-center"
                    visible={true}
                    ariaLabel="oval-loading"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                    color="#121214"
                    secondaryColor="#202024"
                />
            )}
        </button>
    )
}
