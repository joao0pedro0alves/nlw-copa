import Image from 'next/image'
import Link from 'next/link'

import logoImg from '../assets/logo.svg'

import { useAuth } from '../hooks/useAuth'

export function Navbar() {
    const { isAuthenticated, user, signOut } = useAuth()

    if (!isAuthenticated) return null

    return (
        <nav className="bg-gray-900/40 border-b border-gray-800 fixed top-0 w-full">

            <div className="container m-auto flex items-center justify-between h-20 gap-4">

                <Link href='/' className='w-[200px]'>
                    <Image src={logoImg} alt="NLW Copa" width={180} />
                </Link>

                {/* <div className="flex justify-center flex-1 gap-4">
                    <Link
                        href="/"
                        className="text-yellow-500 px-2 block font-bold"
                    >
                        Home
                    </Link>

                    <Link href="/ranking" className="text-gray-300 px-2 block">
                        Ranking
                    </Link>

                    <Link href="/ranking" className="text-gray-300 px-2 block">
                        Jogos
                    </Link>
                </div> */}

                <div className="w-[200px] flex gap-5 justify-end items-center">
                    <button
                        onClick={signOut}
                        className={`bg-gray-800 border-gray-600 border-2 flex items-center justify-center overflow-hidden w-12 h-12 rounded-full`}
                    >
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" />
                        ) : (
                            <span className="text-2xl text-gray-100 font-bold">
                                {user.name.charAt(0)}
                            </span>
                        )}
                    </button>
                </div>
            </div>

        </nav>
    )
}
