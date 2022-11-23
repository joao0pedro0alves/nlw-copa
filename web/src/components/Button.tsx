import { ButtonHTMLAttributes } from 'react'
import { Oval } from 'react-loader-spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}

export function Button({ isLoading, ...props }: ButtonProps) {
    return (
        <button className="relative h-12 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700">
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
                    color='#121214'
                    secondaryColor='#202024'
                />
            )}
        </button>
    )
}
