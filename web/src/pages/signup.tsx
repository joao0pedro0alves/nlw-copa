import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { EnvelopeSimple, User, LockSimple, CaretLeft, Image as ImageIcon } from 'phosphor-react'
import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import logoImg from '../assets/logo.svg'
import { api } from '../lib/axios'

import { TextField } from '../components/TextField'
import { Button } from '../components/Button'

interface FieldValues {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    avatar_url: string;
}

const createUserSchema = z.object({
    name: z.string().min(6, 'Digite seu nome completo'),
    email: z.string().email('Insira um e-mail válido').min(2),
    password: z.string().min(6, 'Senha muito curta'),
    password_confirmation: z.string().min(6, 'Senha muito curta'),
    avatar_url: z.string().optional(),

}).superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Senhas não conferem',
            path: ['password_confirmation']
        })
    }
})

export default function() {
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        resolver: zodResolver(createUserSchema),
        mode: 'onSubmit',
    })

    async function createUser(data: FieldValues) {
        try {
            setIsLoading(true)

            await api.post('/users', data)
            toast.success('Usuário criado com sucesso!')

            reset()

        } catch (error) {
            toast.error('Falha ao criar o usuário, tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-[1124px] h-screen mx-auto flex items-center justify-center p-4">
            <Head>
                <title>Crie sua conta</title>
            </Head>

            <main className="lg:min-w-[450px]">
                <Image src={logoImg} alt="NLW Copa" />

                <h1 className="mt-14 text-white text-3xl font-bold leading-tight">
                    Crie sua conta
                </h1>

                <form
                    className="mt-10 flex flex-col gap-4"
                    onSubmit={handleSubmit(createUser)}
                >
                    <TextField
                        type="url"
                        id="avatar_url"
                        aria-label="avatar_url"
                        autoComplete="off"
                        placeholder="URL"
                        icon={ImageIcon}
                        errors={errors}
                        {...register('avatar_url')}
                    />
                    <TextField
                        autoFocus
                        type="text"
                        id="name"
                        aria-label="name"
                        autoComplete="off"
                        placeholder="Seu nome"
                        icon={User}
                        errors={errors}
                        {...register('name')}
                    />
                    <TextField
                        type="email"
                        id="email"
                        aria-label="email"
                        autoComplete="off"
                        placeholder="Seu E-mail"
                        icon={EnvelopeSimple}
                        errors={errors}
                        {...register('email')}
                    />
                    <TextField
                        autoComplete="current-password"
                        type="password"
                        id="password"
                        aria-label="password"
                        placeholder="Sua senha"
                        icon={LockSimple}
                        errors={errors}
                        {...register('password')}
                    />
                    <TextField
                        type="password"
                        id="password_confirmation"
                        aria-label="password_confirmation"
                        placeholder="Confirme sua senha"
                        autoComplete="off"
                        icon={LockSimple}
                        errors={errors}
                        {...register('password_confirmation')}
                    />
                    <Button isLoading={isLoading} type="submit">Cadastrar</Button>
                </form>

                <Link
                    href="/signin"
                    className="mt-4 text-sm font-bold text-yellow-700 hover:text-yellow-500 leading-relaxed flex gap-1 items-center"
                >
                    <CaretLeft />
                    <span>Voltar para login</span>
                </Link>
            </main>
        </div>
    )
}
