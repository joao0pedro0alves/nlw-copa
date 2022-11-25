import { Participant } from '../@types'

interface Props {
    participants: Participant[]
    count: number
}

export function Participants({ count, participants }: Props) {

    return (
        <div className="flex items-center gap-2">

            <div className='relative flex items-center gap-1'>
                {participants?.map(({id, user}, index) => {
                    const zIndex = (index + 1) * 10

                    return (
                        <div
                            key={id}
                            className={`bg-gray-800 border-gray-600 border-2 flex items-center justify-center overflow-hidden w-10 h-10 rounded-full z-${zIndex} -ml-4 first:ml-0`}
                            title={user.name}
                        >
                            {user.avatarUrl ? (
                                <img 
                                    src={user.avatarUrl}
                                    alt=""
                                />
                            ) : (
                                <span className='text-lg text-gray-900 font-bold'>
                                    {user.name.charAt(0)}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>

            <strong className="text-gray-100 text-md">
                +{count}
            </strong>
        </div>
    )
}
