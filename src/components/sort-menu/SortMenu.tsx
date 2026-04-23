import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AppSelect from '~/components/app-select/AppSelect'
import { sortFields } from './constants'
import { styles } from './SortMenu.styles'

interface SortMenuProps {
  sort: string
  setSort: (value: string) => void
}

const SortMenu = ({ setSort, sort }: SortMenuProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
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
