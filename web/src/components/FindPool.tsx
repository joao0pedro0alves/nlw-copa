import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'
import { MagnifyingGlass } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from './Button'
import { TextField } from './TextField'
import { api } from '../lib/axios'

interface FindPoolProps {
    onJoin: () => void
}

interface FieldValues {
    code: string
}

const joinPoolSchema = z.object({
    code: z.string().min(6, 'Informe um código válido'),
})

export function FindPool({ onJoin }: FindPoolProps) {
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        resolver: zodResolver(joinPoolSchema),
        mode: 'onSubmit',
    })

    async function joinPool(data: FieldValues) {

        try {
            setIsLoading(true)

            await api.post('/pools/join', data)
            toast.success('Você se juntou ao bolão.')
            
            reset()
            onJoin()

        } catch (error) {
            console.log(error)
            toast.error('Falha ao participar do bolão, tente novamente!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 inset-0 fixed z-20" />
            <Dialog.Content className="flex flex-col fixed bg-gray-900 border-2 border-gray-600/60 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[800px] min-h-[400px] shadow-black/25 z-30">
                <Dialog.Title className="text-2xl font-black">
                    Encontre um bolão através de seu código único.
                </Dialog.Title>

                <form
                    onSubmit={handleSubmit(joinPool)}
                    className="mt-8 flex flex-1 flex-col gap-4"
                >
                    <div className="flex-1">
                        <TextField
                            icon={MagnifyingGlass}
                            autoFocus
                            type="text"
                            id="pool-code"
                            aria-label="pool-code"
                            placeholder="Qual o código do bolão?"
                            errors={errors}
                            {...register('code')}
                        />
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
                            Participar do bolão
                        </Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
