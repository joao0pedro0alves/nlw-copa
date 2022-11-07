import Image from 'next/image'

import usersAvatarExampleImage from '../assets/users-avatar-example.png'

interface Props {
    peopleCount: number
}

export function Avatars(props: Props) {
    return (
        <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImage} alt="" />

            <strong className="text-gray-100 text-xl">
                <span className="text-ignite-500">+{props.peopleCount}</span>{' '}
                pessoas já estão usando
            </strong>
        </div>
    )
}
