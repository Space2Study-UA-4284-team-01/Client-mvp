import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const locationService = {
  getCountries: (): Promise<
    AxiosResponse<{ name: string; iso2: string }[]>
  > => {
    return axiosClient.get<{ name: string; iso2: string }[]>(
      URLs.location.countries
    )
  },

  getCitiesByCountry: (
    countryIso: string
  ): Promise<AxiosResponse<{ name: string }[]>> => {
    if (!countryIso.trim()) {
      return Promise.resolve({ data: [] } as unknown as AxiosResponse<
        { name: string }[]
      >)
    }
    return axiosClient.get<{ name: string }[]>(
      `${URLs.location.countries}/${countryIso}/cities`
    )
  }
}
