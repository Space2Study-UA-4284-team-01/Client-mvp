import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/material'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { locationService } from '~/services/location-service'
import { type UserGeneralInfo } from '~/types'

interface LocationSelectionInputsProps {
  onDataChange: (key: 'country' | 'city', value: string | null) => void
  data: Pick<UserGeneralInfo, 'country' | 'city'>
  sx?: SxProps
}

const LocationSelectionInputs: React.FC<LocationSelectionInputsProps> = ({
  onDataChange,
  data,
  sx
}) => {
  const { t } = useTranslation()

  const getCountries = useCallback(() => locationService.getCountries(), [])

  const getCities = useCallback(
    () => locationService.getCitiesByCountry(data.country ?? ''),
    [data.country]
  )

  const handleCountryChange = (
    _: React.SyntheticEvent,
    value: string | null
  ) => {
    onDataChange('country', value)
    onDataChange('city', null)
  }

  const handleCityChange = (_: React.SyntheticEvent, value: string | null) => {
    onDataChange('city', value)
  }

  return (
    <>
      <AsyncAutocomplete
        fetchOnFocus={false}
        fullWidth
        onChange={handleCountryChange}
        service={getCountries}
        sx={sx}
        textFieldProps={{ label: t('common.labels.country') }}
        value={data.country}
      />
      <AsyncAutocomplete
        disabled={!data.country}
        fetchCondition={!!data.country}
        fetchOnFocus={!data.city}
        fullWidth
        onChange={handleCityChange}
        service={getCities}
        sx={sx}
        textFieldProps={{ label: t('common.labels.city') }}
        value={data.city}
      />
    </>
  )
}

export default LocationSelectionInputs
