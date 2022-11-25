import { FormEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'

import { SoccerBall } from 'phosphor-react'

import { Button } from './Button'
import { TextField } from './TextField'
import { api } from '../lib/axios'

interface CreatePoolProps {
    onCreate: () => void
}

export function CreatePool({onCreate}: CreatePoolProps) {
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function createPool(event: FormEvent) {
        event.preventDefault()

        try {
            setIsLoading(true)

            const response = await api.post('/pools', { title })
            const { code } = response.data

            await navigator.clipboard.writeText(code)
            toast.success('Bolão criado com sucesso, o código foi copiado para a área de transferência')
            
            setTitle('')
            onCreate()
        } catch (error) {
            console.log(error)
            toast.error('Falha ao criar o bolão, tente novamente!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 inset-0 fixed z-20" />
            <Dialog.Content className="flex flex-col fixed bg-gray-900 border-2 border-gray-600/60 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[800px] min-h-[400px] shadow-black/25 z-30">
                <Dialog.Title className="text-3xl font-black">
                    Crie seu bolão
                </Dialog.Title>

                <form
                    onSubmit={createPool}
                    className="mt-8 flex flex-1 flex-col gap-4"
                >
                    <div className="flex-1">
                        <TextField
                            icon={SoccerBall}
                            autoFocus
                            type="text"
                            id="pool-title"
                            aria-label="pool-title"
                            placeholder="Qual o nome do seu bolão?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            Criar novo bolão
                        </Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
