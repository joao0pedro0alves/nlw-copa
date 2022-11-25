import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

import { TailSpin } from 'react-loader-spinner'

export function PrivateRoute(WrappedComponent: any) {
    const Component = ({ ...props }) => {
        const { isAuthenticated, isFetched } = useAuth()
        const router = useRouter()

        useEffect(() => {
            
            if (isFetched) {
                if (isAuthenticated) {

                    if (router.pathname === '/') {
                        router.push('/')
                    }

                } else {
                    router.push('/signin?redirect=true')
                }
            }

        }, [isFetched, isAuthenticated])

        return (
            <>
                {isAuthenticated ? (
                    <WrappedComponent {...props} />
                ) : (
                    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center">
                        <TailSpin
                            height="80"
                            width="80"
                            color="#F7DD43"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible
                        />
                    </div>
                )}
            </>
        )
    }

    Component.WrappedComponent = WrappedComponent
    return Component
}
