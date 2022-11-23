import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Eye, EyeSlash, IconProps } from 'phosphor-react'
import { FieldErrorsImpl } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
    errors?: Partial<FieldErrorsImpl<{
        [x: string]: any;
    }>>
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(({ type, icon: Icon, errors, ...props }, ref) => {
    const [inputType, setInputType] = useState<InputProps['type']>(type)
    const isPassword = type === 'password'

    const inputError = errors && props.name ? errors[props.name] : {}

    function changeInputVisibility() {
        setInputType((previousType) =>
            previousType === 'text' ? 'password' : 'text'
        )
    }

    return (
        <div className="relative text-gray-600 focus-within:text-yellow-700">
            {Icon && (
                <div className='absolute left-3 top-4'>
                    <Icon
                        weight='bold'
                        className='text-2xl transition-colors'
                    />
                </div>
            )}

            <input
                ref={ref}
                className="text-sm text-gray-100 w-full px-12 py-4 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-700 transition-colors"
                type={inputType}
                {...props}
            />

            {isPassword && (
                <button 
                    type="button" 
                    className='absolute right-3 top-4'
                    onClick={changeInputVisibility} 
                >
                    {inputType === 'text' ? (
                        <EyeSlash weight='bold' className="text-2xl text-yellow-500" />
                    ) : (
                        <Eye weight='bold' className="text-2xl text-yellow-700" />
                    )}
                </button>
            )}

            {inputError?.message && (
                <span className='block mt-2 text-red-500 text-sm'>
                    {inputError.message.toString()}
                </span>
            )}
        </div>
    )
})
