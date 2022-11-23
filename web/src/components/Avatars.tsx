import { PeopleWithAvatar } from '../@types'

interface Props {
    peoples: PeopleWithAvatar[]
    peopleCount: number
}

export function Avatars({ peopleCount, peoples }: Props) {

    return (
        <div className="mt-10 flex items-center gap-2">

            <div className='relative flex items-center gap-1'>

                {peoples?.map((people, index) => {
                    const zIndex = (index + 1) * 10

                    return (
                        <div className={`border-gray-900 border-4 overflow-hidden w-12 h-12 rounded-full z-${zIndex} -ml-4 first:ml-0`} key={index}>
                            <img src={people.avatarUrl} alt="" />
                        </div>
                    )
                })}

            </div>

            <strong className="text-gray-100 text-xl">
                <span className="text-ignite-500">+{peopleCount}</span> pessoas
                já estão usando
            </strong>
        </div>
    )
}
