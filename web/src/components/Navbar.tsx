import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import logoImg from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'

export function Navbar() {
    const { isAuthenticated, user, signOut } = useAuth()

    const router = useRouter()

    const isActive = (pathname: string) => router.pathname === pathname

    const getLinkProps = (href: string) => ({
        className: clsx("px-2 block", isActive(href) ? 'text-yellow-500 font-bold' : 'text-gray-300'),
        href
    })

    if (!isAuthenticated) return null

    return (
        <nav className="bg-gray-900 md:bg-gray-900/40 border-b border-gray-800 fixed top-0 w-full px-4">

            <div className="container m-auto flex items-center justify-between h-20 gap-4">

                <Link href='/' className='w-[200px]'>
                    <Image src={logoImg} alt="NLW Copa" width={180} />
                </Link>

                <div className="flex justify-center flex-1 gap-4">
                    <Link {...getLinkProps('/')}>
                        Home
                    </Link>

                    {user.isAdmin && (
                        <Link  {...getLinkProps('/games')}>
                            Jogos
                        </Link>
                    )}
                </div>

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
