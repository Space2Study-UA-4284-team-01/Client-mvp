import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AppSelect from '~/components/app-select/AppSelect'
import { sortFields } from './constants'
import { styles } from './SortMenu.styles'
import { Sort, SortEnum } from '~/types'

interface SortMenuProps {
  sort: Sort
  setSort: (value: Sort) => void
}

const SortMenu = ({ sort, setSort }: SortMenuProps) => {
  const { t } = useTranslation()

  const handleChange = (value: string) => {
    setSort({
      order: value === 'priceAsc' ? SortEnum.Asc : SortEnum.Desc,
      orderBy:
        value === 'rating'
          ? 'rating'
          : value.includes('price')
            ? 'price'
            : 'createdAt'
    })
  }

  const getSortKey = (sort: Sort): string => {
    if (sort.orderBy === 'rating') return 'rating'
    if (sort.orderBy === 'price' && sort.order === SortEnum.Asc)
      return 'priceAsc'
    if (sort.orderBy === 'price' && sort.order === SortEnum.Desc)
      return 'priceDesc'
    return 'newest'
  }

  return (
    <Box sx={styles.container}>
      <AppSelect
        fields={sortFields}
        selectTitle={t('filters.sortBy.sortByTitle')}
        setValue={handleChange}
        value={getSortKey(sort)}
      />
    </Box>
  )
}

export default SortMenu
