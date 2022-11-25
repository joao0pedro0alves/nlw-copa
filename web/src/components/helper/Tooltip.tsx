import { ReactNode } from 'react'
import * as RDTooltip from '@radix-ui/react-tooltip'

interface TooltipProps {
    children: ReactNode
    title: string
}

export function Tooltip({ children, title }: TooltipProps) {
    return (
        <RDTooltip.Provider>
            <RDTooltip.Root>
                <RDTooltip.Trigger asChild>{children}</RDTooltip.Trigger>
                <RDTooltip.Portal>
                    <RDTooltip.Content 
                        sideOffset={5}
                        className='rounded-md p-2 text-xs bg-yellow-500 text-gray-900 animate-bounce'
                    >
                        {title}
                        <RDTooltip.Arrow 
                            className='fill-yellow-500'
                        />
                    </RDTooltip.Content>
                </RDTooltip.Portal>
            </RDTooltip.Root>
        </RDTooltip.Provider>
    )
}
