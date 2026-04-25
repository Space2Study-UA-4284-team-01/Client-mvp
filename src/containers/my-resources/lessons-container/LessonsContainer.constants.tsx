import Typography from '@mui/material/Typography'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { authRoutes } from '~/router/constants/authRoutes'
import { Box } from '@mui/material'
import AppChip from '~/components/app-chip/AppChip'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { styles } from '~/containers/add-resources/AddResources.styles'
import { getFormattedDate } from '~/utils/helper-functions'
import {
  AdditionalPropsInterface,
  Lesson,
  RemoveColumnRules,
  SortEnum,
  TableColumn
} from '~/types'

export const columns: TableColumn<Lesson>[] = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (
      lesson: Lesson,
      { navigate }: AdditionalPropsInterface
    ) => (
      <Box
        onClick={() =>
          navigate(`${authRoutes.myResources.lessonDetails.path}/${lesson._id}`)
        }
        sx={{ cursor: 'pointer' }}
      >
        <IconExtensionWithTitle icon={<ListAltIcon />} title={lesson.title} />
      </Box>
    )
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (lesson: Lesson, { t }: AdditionalPropsInterface) =>
      lesson.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {lesson.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (lesson: Lesson) =>
      getFormattedDate({ date: lesson.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Lesson> = {
  tablet: ['myResourcesPage.lessons.lastUpdates']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  mobile: 6,
  tablet: 8
}
