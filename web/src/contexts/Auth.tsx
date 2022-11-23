import { ReactNode, createContext, useState } from 'react'
import { toast } from 'react-toastify'

import { CURRENT_USER, TOKEN } from '../constants/storage'
import { api } from '../lib/axios'

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface SignInCredencials {
    email: string;
    password: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: (data: SignInCredencials) => Promise<void>;
    signOut: () => void;
    isUserLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false)

    async function signIn(data: SignInCredencials) {
        try {
            setIsUserLoading(true)

            const tokenResponse = await api.post('/session', data)
            const token = tokenResponse.data.token

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            const userInfoResponse = await api.get('/me')
            const user = userInfoResponse.data.user
            
            setUser(user)

            localStorage.setItem(TOKEN, JSON.stringify(token))
            localStorage.setItem(CURRENT_USER, JSON.stringify(user))

        } catch (error: any) {
            const errorMessage = error?.response?.data.message
            toast.error(errorMessage)

            // throw error
            
        } finally {
            setIsUserLoading(false)
        }
    }

    function signOut() {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(CURRENT_USER)
        setUser({} as UserProps)
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                isUserLoading,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
