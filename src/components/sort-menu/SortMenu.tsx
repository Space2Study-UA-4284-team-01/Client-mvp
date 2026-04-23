import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AppSelect from '~/components/app-select/AppSelect'
import { sortFields } from './constants'

interface ContentViewControlsProps {
  sort: string
  setSort: (value: string) => void
}

const SortMenu = ({ setSort, sort }: ContentViewControlsProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ width: 'fit-content', display: 'inline-flex' }}>
      <AppSelect
        fields={sortFields}
        selectTitle={t('filters.sortBy.sortByTitle')}
        setValue={setSort}
        value={sort}
      />
    </Box>
  )
}

export default SortMenu
