import { SoccerBall } from 'phosphor-react'

interface SoccerLoadingProps {
    loadingText: string
}

export function SoccerLoading({ loadingText }: SoccerLoadingProps) {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
                <SoccerBall className="text-yellow-500 text-6xl animate-bounce" />
                <span className="text-yellow-500 leading-relaxed">
                    {loadingText}
                </span>
            </div>
        </div>
    )
}
