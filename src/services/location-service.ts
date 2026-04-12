export const locationService = {
  getCountries: () => {
    return Promise.resolve({
      data: ['Ukraine', 'Poland', 'Germany', 'USA', 'UK']
    })
  },
  getCitiesByCountry: (country: string) => {
    const cities: Record<string, string[]> = {
      Ukraine: ['Kyiv', 'Lviv', 'Odesa', 'Kharkiv'],
      Poland: ['Warsaw', 'Krakow', 'Gdansk'],
      Germany: ['Berlin', 'Munich', 'Hamburg'],
      USA: ['New York', 'Los Angeles', 'Chicago'],
      UK: ['London', 'Manchester', 'Birmingham']
    }
    return Promise.resolve({ data: cities[country] ?? [] })
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
