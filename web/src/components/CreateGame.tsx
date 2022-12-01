import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'

import {
    MagnifyingGlass,
    NumberOne,
    NumberTwo,
    CalendarBlank,
} from 'phosphor-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { api } from '../lib/axios'

import { Button } from './Button'
import { TextField, SelectField } from './form'
import { GameCategory } from './GamesHeader'

interface GameCategoryOption {
    value: GameCategory
    label: string
}

interface FieldValues {
    category: string
    date: Date
    firstTeamCountryCode: string
    secondTeamCountryCode: string
}

interface CreateGameProps {
    onCreate: () => void
}

const GAME_CATEGORIES: GameCategoryOption[] = [
    { value: 'G', label: 'Fase de grupos' },
    { value: 'O', label: 'Oitavas' },
    { value: 'Q', label: 'Quartas' },
    { value: 'S', label: 'Semifinais' },
    { value: 'F', label: 'Final' },
]

const COUNTRIES = [
    { label: 'CATAR', value: 'QA' },
    { label: 'EQUADOR', value: 'EC' },
    { label: 'SENEGAL', value: 'SN' },
    { label: 'HOLANDA', value: 'NL' },
    { label: 'INGLATERRA', value: 'GB' },
    { label: 'IRA', value: 'IR' },
    { label: 'EUA', value: 'US' },
    { label: 'GALES', value: 'GALES' },
    { label: 'ARGENTINA', value: 'AR' },
    { label: 'ARABIA SAUDITA', value: 'SA' },
    { label: 'MEXICO', value: 'MX' },
    { label: 'POLONIA', value: 'PL' },
    { label: 'FRANCA', value: 'FR' },
    { label: 'DINAMARCA', value: 'DK' },
    { label: 'TUNISIA', value: 'TN' },
    { label: 'AUSTRALIA', value: 'AU' },
    { label: 'ESPANHA', value: 'ES' },
    { label: 'ALEMANHA', value: 'DE' },
    { label: 'JAPAO', value: 'JP' },
    { label: 'COSTA RICA', value: 'CR' },
    { label: 'BELGICA', value: 'BE' },
    { label: 'CANADA', value: 'CA' },
    { label: 'MARROCOS', value: 'MA' },
    { label: 'CROACIA', value: 'HR' },
    { label: 'BRASIL', value: 'BR' },
    { label: 'SERVIA', value: 'RS' },
    { label: 'SUICA', value: 'CH' },
    { label: 'CAMAROES', value: 'CM' },
    { label: 'PORTUGAL', value: 'PT' },
    { label: 'GANA', value: 'GH' },
    { label: 'URUGUAI', value: 'UY' },
    { label: 'COREIA DO SUL', value: 'KR' },
]

const createGameSchema = z.object({
    category: z.string().min(1, 'Informe a categoria do jogo'),
    date: z.string().min(1, 'Informe a data e horário do jogo'),
    firstTeamCountryCode: z.string().length(2, 'Código ISO inválido'),
    secondTeamCountryCode: z.string().length(2, 'Código ISO inválido'),
})

export function CreateGame({ onCreate }: CreateGameProps) {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: zodResolver(createGameSchema),
        mode: 'onSubmit',
    })

    async function createGame(data: FieldValues) {
        try {
            setIsLoading(true)

            await api.post('/games', data)
            toast.success('Jogo cadastrado com sucesso!')

            reset()
            onCreate()
            
        } catch (error) {
            toast.error('Falha ao cadastrar o jogo, tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/80 md:bg-black/50 inset-0 fixed z-20" />
            <Dialog.Content className="flex flex-col fixed bg-gray-900 border-2 border-gray-600/60 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-screen md:w-[600px] min-h-[400px] shadow-black/25 z-30">
                <Dialog.Title className="text-3xl font-black">
                    Cadastrar novo jogo
                </Dialog.Title>

                <form
                    onSubmit={handleSubmit(createGame)}
                    className="mt-8 flex flex-1 flex-col gap-4"
                >
                    <div className="flex-1 flex flex-col gap-6">
                        <SelectField
                            icon={MagnifyingGlass}
                            autoFocus
                            type="text"
                            id="category"
                            aria-label="category"
                            placeholder="Escolha a categoria do seu jogo."
                            options={GAME_CATEGORIES}
                            errors={errors}
                            {...register('category')}
                        />

                        <TextField
                            icon={CalendarBlank}
                            type="datetime-local"
                            id="date"
                            aria-label="date"
                            placeholder="Informe a data e horário do jogo."
                            errors={errors}
                            {...register('date')}
                        />

                        <div>
                            <label
                                className="font-bold text-md mb-2 block"
                                htmlFor="first-team-country-code"
                            >
                                Escolha os times
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <SelectField
                                    icon={NumberOne}
                                    type="text"
                                    id="first-team-country-code"
                                    aria-label="first-team-country-code"
                                    placeholder="TIME 1"
                                    options={COUNTRIES}
                                    errors={errors}
                                    {...register('firstTeamCountryCode')}
                                />
                                <SelectField
                                    icon={NumberTwo}
                                    type="text"
                                    id="second-team-country-code"
                                    aria-label="second-team-country-code"
                                    placeholder="TIME 2"
                                    options={COUNTRIES}
                                    errors={errors}
                                    {...register('secondTeamCountryCode')}
                                />
                            </div>
                        </div>
                    </div>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Button
                            disabled={isLoading}
                            type="button"
                            as={Dialog.Close}
                            variant="secondary"
                            className="border-0"
                        >
                            Fechar
                        </Button>

                        <Button
                            disabled={isLoading}
                            isLoading={isLoading}
                            type="submit"
                        >
                            Cadastrar novo jogo
                        </Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
