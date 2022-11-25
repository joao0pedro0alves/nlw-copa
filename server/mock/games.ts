import {ISO} from './countries'

interface Game {
    date: string;
    firstTeamCountryCode: string;
    secondTeamCountryCode: string;
}

const padZero = (value: number) => String(value).padStart(2, '0')

const isoDate = (day: number, month: number, hour: number) => `2022-${padZero(month)}-${padZero(day)}T${padZero(hour)}:00:00.989Z`
// 2022-11-26T12:00:00.989Z

export const games: Game[] = [
    {
        date: isoDate(20, 11, 13),
        firstTeamCountryCode: ISO.CATAR,
        secondTeamCountryCode: ISO.EQUADOR
    },

    {
        date: isoDate(21, 11, 10),
        firstTeamCountryCode: ISO.INGLATERRA,
        secondTeamCountryCode: ISO.IRA
    },
    {
        date: isoDate(21, 11, 13),
        firstTeamCountryCode: ISO.SENEGAL,
        secondTeamCountryCode: ISO.HOLANDA
    },
    {
        date: isoDate(21, 11, 16),
        firstTeamCountryCode: ISO.EUA,
        secondTeamCountryCode: ISO.GALES
    },

    {
        date: isoDate(22, 11, 7),
        firstTeamCountryCode: ISO.ARGENTINA,
        secondTeamCountryCode: ISO.ARABIA_SAUDITA
    },
    {
        date: isoDate(22, 11, 10),
        firstTeamCountryCode: ISO.DINAMARCA,
        secondTeamCountryCode: ISO.TUNISIA
    },
    {
        date: isoDate(22, 11, 13),
        firstTeamCountryCode: ISO.MEXICO,
        secondTeamCountryCode: ISO.POLONIA
    },
    {
        date: isoDate(22, 11, 16),
        firstTeamCountryCode: ISO.FRANCA,
        secondTeamCountryCode: ISO.AUSTRALIA
    },

    {
        date: isoDate(23, 11, 7),
        firstTeamCountryCode: ISO.MARROCOS,
        secondTeamCountryCode: ISO.CROACIA
    },
    {
        date: isoDate(23, 11, 10),
        firstTeamCountryCode: ISO.ALEMANHA,
        secondTeamCountryCode: ISO.JAPAO
    },
    {
        date: isoDate(23, 11, 13),
        firstTeamCountryCode: ISO.ESPANHA,
        secondTeamCountryCode: ISO.COSTA_RICA
    },
    {
        date: isoDate(23, 11, 16),
        firstTeamCountryCode: ISO.BELGICA,
        secondTeamCountryCode: ISO.CANADA
    },

    {
        date: isoDate(24, 11, 7),
        firstTeamCountryCode: ISO.SUICA,
        secondTeamCountryCode: ISO.CAMAROES
    },
    {
        date: isoDate(24, 11, 10),
        firstTeamCountryCode: ISO.URUGUAI,
        secondTeamCountryCode: ISO.COREIA_DO_SUL
    },
    {
        date: isoDate(24, 11, 13),
        firstTeamCountryCode: ISO.PORTUGAL,
        secondTeamCountryCode: ISO.GANA
    },
    {
        date: isoDate(24, 11, 16),
        firstTeamCountryCode: ISO.BRASIL,
        secondTeamCountryCode: ISO.SERVIA
    },

    {
        date: isoDate(25, 11, 7),
        firstTeamCountryCode: ISO.GALES,
        secondTeamCountryCode: ISO.IRA
    },
    {
        date: isoDate(25, 11, 10),
        firstTeamCountryCode: ISO.CATAR,
        secondTeamCountryCode: ISO.SENEGAL
    },
    {
        date: isoDate(25, 11, 13),
        firstTeamCountryCode: ISO.HOLANDA,
        secondTeamCountryCode: ISO.EQUADOR
    },
    {
        date: isoDate(25, 11, 16),
        firstTeamCountryCode: ISO.INGLATERRA,
        secondTeamCountryCode: ISO.EUA
    },

    {
        date: isoDate(26, 11, 7),
        firstTeamCountryCode: ISO.TUNISIA,
        secondTeamCountryCode: ISO.AUSTRALIA
    },
    {
        date: isoDate(26, 11, 10),
        firstTeamCountryCode: ISO.POLONIA,
        secondTeamCountryCode: ISO.ARABIA_SAUDITA
    },
    {
        date: isoDate(26, 11, 13),
        firstTeamCountryCode: ISO.FRANCA,
        secondTeamCountryCode: ISO.DINAMARCA
    },
    {
        date: isoDate(26, 11, 16),
        firstTeamCountryCode: ISO.ARGENTINA,
        secondTeamCountryCode: ISO.MEXICO
    },

    {
        date: isoDate(27, 11, 7),
        firstTeamCountryCode: ISO.JAPAO,
        secondTeamCountryCode: ISO.COSTA_RICA
    },
    {
        date: isoDate(27, 11, 10),
        firstTeamCountryCode: ISO.BELGICA,
        secondTeamCountryCode: ISO.MARROCOS
    },
    {
        date: isoDate(27, 11, 13),
        firstTeamCountryCode: ISO.CROACIA,
        secondTeamCountryCode: ISO.CANADA
    },
    {
        date: isoDate(27, 11, 16),
        firstTeamCountryCode: ISO.ESPANHA,
        secondTeamCountryCode: ISO.ALEMANHA
    },

    {
        date: isoDate(28, 11, 7),
        firstTeamCountryCode: ISO.CAMAROES,
        secondTeamCountryCode: ISO.SERVIA
    },
    {
        date: isoDate(28, 11, 10),
        firstTeamCountryCode: ISO.COREIA_DO_SUL,
        secondTeamCountryCode: ISO.GANA
    },
    {
        date: isoDate(28, 11, 13),
        firstTeamCountryCode: ISO.BRASIL,
        secondTeamCountryCode: ISO.SUICA
    },
    {
        date: isoDate(28, 11, 16),
        firstTeamCountryCode: ISO.PORTUGAL,
        secondTeamCountryCode: ISO.URUGUAI
    },

    {
        date: isoDate(29, 11, 7),
        firstTeamCountryCode: ISO.EQUADOR,
        secondTeamCountryCode: ISO.SENEGAL
    },
    {
        date: isoDate(29, 11, 10),
        firstTeamCountryCode: ISO.HOLANDA,
        secondTeamCountryCode: ISO.CATAR
    },
    {
        date: isoDate(29, 11, 13),
        firstTeamCountryCode: ISO.IRA,
        secondTeamCountryCode: ISO.EUA
    },
    {
        date: isoDate(29, 11, 16),
        firstTeamCountryCode: ISO.GALES,
        secondTeamCountryCode: ISO.INGLATERRA
    },

    {
        date: isoDate(30, 11, 7),
        firstTeamCountryCode: ISO.TUNISIA,
        secondTeamCountryCode: ISO.FRANCA
    },
    {
        date: isoDate(30, 11, 10),
        firstTeamCountryCode: ISO.AUSTRALIA,
        secondTeamCountryCode: ISO.DINAMARCA
    },
    {
        date: isoDate(30, 11, 13),
        firstTeamCountryCode: ISO.POLONIA,
        secondTeamCountryCode: ISO.ARGENTINA
    },
    {
        date: isoDate(30, 11, 16),
        firstTeamCountryCode: ISO.ARABIA_SAUDITA,
        secondTeamCountryCode: ISO.MEXICO
    },

    {
        date: isoDate(1, 12, 7),
        firstTeamCountryCode: ISO.CROACIA,
        secondTeamCountryCode: ISO.BELGICA
    },
    {
        date: isoDate(1, 12, 10),
        firstTeamCountryCode: ISO.CANADA,
        secondTeamCountryCode: ISO.MARROCOS
    },
    {
        date: isoDate(1, 12, 13),
        firstTeamCountryCode: ISO.JAPAO,
        secondTeamCountryCode: ISO.ESPANHA
    },
    {
        date: isoDate(1, 12, 16),
        firstTeamCountryCode: ISO.COSTA_RICA,
        secondTeamCountryCode: ISO.ALEMANHA
    },

    {
        date: isoDate(2, 12, 7),
        firstTeamCountryCode: ISO.COREIA_DO_SUL,
        secondTeamCountryCode: ISO.PORTUGAL
    },
    {
        date: isoDate(2, 12, 10),
        firstTeamCountryCode: ISO.GANA,
        secondTeamCountryCode: ISO.URUGUAI
    },
    {
        date: isoDate(2, 12, 13),
        firstTeamCountryCode: ISO.SERVIA,
        secondTeamCountryCode: ISO.SUICA
    },
    {
        date: isoDate(2, 12, 16),
        firstTeamCountryCode: ISO.CAMAROES,
        secondTeamCountryCode: ISO.BRASIL
    },
]