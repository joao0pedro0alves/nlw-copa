export interface User {
    id: string
    name: string
    avatarUrl: string
}

export interface Participant {
    id: string
    amountPoints: number
    user: User
}

export interface Pool {
    id: string
    title: string
    code: string
    createdAt: string
    ownerId: string
    owner: {
        id: string
        name: string
    }
    participants: Participant[]
    _count: {
        participants: number
    }
}

export interface Guess {
    id: string
    gameId: string
    createdAt: string
    participantId: string
    firstTeamPoints: number
    secondTeamPoints: number
}

export interface Game {
    id: string
    date: string
    firstTeamCountryCode: string
    secondTeamCountryCode: string
    firstTeamGoals: number
    secondTeamGoals: number
    guess: null | Guess
}