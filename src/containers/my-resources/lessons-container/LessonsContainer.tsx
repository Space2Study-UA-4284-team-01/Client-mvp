import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import useAxios from '~/hooks/use-axios'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import usePagination from '~/hooks/table/use-pagination'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'

import { snackbarVariants } from '~/constants'
import {
  initialSort,
  itemsLoadLimit,
  columns,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import {
  Lesson,
  ItemsWithCount,
  GetResourcesParams,
  ErrorResponse,
  ResourcesTabsEnum
} from '~/types'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'

const LessonsContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { setAlert } = useSnackBarContext()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getLessons = useCallback(
    () =>
      ResourceService.getLessons({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        sort,
        title: searchTitle.current
      }),
    [page, itemsPerPage, sort]
  )

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id ?? ''),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    GetResourcesParams
  >({
    service: getLessons,
    defaultResponse: { count: 1, items: [] },
    onResponseError
  })

  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: { deleteService: deleteLesson },
    pagination: { page, onChange: handleChangePage },
    sort: sortOptions,
    itemsPerPage,
    resource: ResourcesTabsEnum.Lessons,
    actions: { onEdit: () => void 0 },
    sx: styles.table
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.lessons.addBtn')}
        button={
          <AppButton onClick={() => void 0}>
            {t('myResourcesPage.lessons.addBtn')}
            <AddIcon sx={styles.addIcon} />
          </AppButton>
        }
        fetchData={fetchData}
        searchRef={searchTitle}
        selectedItems={selectedCategories}
        setItems={setSelectedCategories}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lesson> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
