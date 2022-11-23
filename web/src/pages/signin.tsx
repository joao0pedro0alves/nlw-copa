import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { EnvelopeSimple, LockSimple } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import iconCheckImage from '../assets/icon-check.svg'

import { PeopleWithAvatar } from '../@types'
import { api } from '../lib/axios'
import { SignInCredencials } from '../contexts/Auth'
import { useAuth } from '../hooks/useAuth'

import { Avatars } from '../components/Avatars'
import { TextField } from '../components/TextField'
import { Button } from '../components/Button'

interface LoginProps {
    poolCount: number
    guessCount: number
    userCount: number
    popularUsers: PeopleWithAvatar[]
}

const signInSchema = z.object({
    email: z.string().email('Insira um e-mail válido').min(2),
    password: z.string().min(6, 'Senha muito curta'),
})

export default function(props: LoginProps) {
    const { signIn, isUserLoading } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<SignInCredencials>({
        resolver: zodResolver(signInSchema),
        mode: 'onSubmit',
    })

    return (
        <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
            <Head>
                <title>Crie seu próprio bolão da copa e compartilhe entre amigos!</title>
            </Head>
            
            <main>
                <Image src={logoImg} alt="NLW Copa" />

                <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </h1>

                <Avatars
                    peoples={props.popularUsers}
                    peopleCount={props.userCount} 
                />

                <form 
                    className="mt-10 flex flex-col gap-4"
                    onSubmit={handleSubmit(signIn)}
                >
                    <TextField
                        type="text"
                        required
                        placeholder="E-mail"
                        icon={EnvelopeSimple}
                        errors={errors}
                        {...register('email')}
                    />
                    <TextField
                        autoComplete='current-password'
                        type="password"
                        required
                        placeholder="Senha"
                        icon={LockSimple}
                        errors={errors}
                        {...register('password')}
                    />
                    <Button
                        isLoading={isUserLoading}
                        type="submit"
                    >
                        Entrar
                    </Button>
                  </form>

                <div className="mt-4 text-sm text-gray-300 leading-relaxed flex justify-center">
                   Não tem uma conta?

                   <Link className='ml-2 font-bold text-yellow-700 hover:text-yellow-500' href='/signup'>
                        Registre-se
                   </Link>
                </div>

                <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100">
                    <div className="flex items-center gap-6">
                        <Image src={iconCheckImage} alt="" />
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl">
                                +{props.poolCount}
                            </span>
                            <span>Bolões criados</span>
                        </div>
                    </div>

                    <div className="w-px h-14 bg-gray-600" />

                    <div className="flex items-center gap-6">
                        <Image src={iconCheckImage} alt="" />
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl">
                                +{props.guessCount}
                            </span>
                            <span>Palpites enviados</span>
                        </div>
                    </div>
                </div>
            </main>

            <Image
                src={appPreviewImg}
                alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
                quality={100}
            />
        </div>
    )
}

export const getStaticProps = async () => {

    const [poolCountResponse, guessCountResponse, userCountResponse, userPopularResponse] =
        await Promise.all([
            api.get('pools/count'),
            api.get('guesses/count'),
            api.get('users/count'),
            api.get('users/popular'),
        ])

    return {
        props: {
            poolCount: poolCountResponse.data.count,
            guessCount: guessCountResponse.data.count,
            userCount: userCountResponse.data.count,
            popularUsers: userPopularResponse.data.users,
        },
    }
}

