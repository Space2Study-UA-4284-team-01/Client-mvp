export const locationService = {
  getCountries: () => {
    return Promise.resolve({
      data: [
        { name: 'Ukraine', iso2: 'UA' },
        { name: 'Poland', iso2: 'PL' },
        { name: 'Germany', iso2: 'DE' },
        { name: 'United States', iso2: 'US' },
        { name: 'United Kingdom', iso2: 'GB' }
      ]
    })
  },
  getCitiesByCountry: (countryIso: string) => {
    const cities: Record<string, { name: string }[]> = {
      UA: [
        { name: 'Kyiv' },
        { name: 'Lviv' },
        { name: 'Odesa' },
        { name: 'Kharkiv' }
      ],
      PL: [{ name: 'Warsaw' }, { name: 'Krakow' }, { name: 'Gdansk' }],
      DE: [{ name: 'Berlin' }, { name: 'Munich' }, { name: 'Hamburg' }],
      US: [{ name: 'New York' }, { name: 'Los Angeles' }, { name: 'Chicago' }],
      GB: [{ name: 'London' }, { name: 'Manchester' }, { name: 'Birmingham' }]
    }
    return Promise.resolve({ data: cities[countryIso] ?? [] })
  }
}

//logic for get cities by country
/*import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const locationService = {
  getCountries: (): Promise<AxiosResponse<{ name: string; iso2: string }[]>> => {
    return axiosClient.get<{ name: string; iso2: string }[]>(URLs.location.countries)
  },

  getCitiesByCountry: (countryIso: string): Promise<AxiosResponse<{ name: string }[]>> => {
    if (!countryIso.trim()) {
      return Promise.resolve({ data: [] } as unknown as AxiosResponse<{ name: string }[]>)
    }
    return axiosClient.get<{ name: string }[]>(`${URLs.location.countries}/${countryIso}/cities`)
  }
}*/
