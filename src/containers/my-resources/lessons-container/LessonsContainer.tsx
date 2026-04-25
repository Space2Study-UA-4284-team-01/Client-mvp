import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
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

/*const mockLessons: Lesson[] = [
  {
    _id: '1',
    title: 'Test Lesson 1',
    description: 'Description',
    content: '',
    attachments: [],
    category: null,
    createdAt: '2023-10-02T17:39:52.373Z',
    updatedAt: '2023-10-03T17:39:52.373Z'
  },
  {
    _id: '2',
    title: 'Test Lesson 2',
    description: 'Description',
    content: '',
    attachments: [],
    category: { _id: '123', name: 'Math', author: '123', createdAt: '', updatedAt: '' },
    createdAt: '2023-10-02T17:39:52.373Z',
    updatedAt: '2023-10-03T17:39:52.373Z'
  }
]*/

const LessonsContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef<string>('')
  const sortOptions = useSort({ initialSort })
  const breakpoints = useBreakpoints()
  const { page, handleChangePage } = usePagination()
  const { setAlert } = useSnackBarContext()
  const navigate = useNavigate()
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
        title: searchTitle.current,
        categories: selectedCategories
      }),
    [page, itemsPerPage, sort, selectedCategories]
  )

  const deleteLesson = useCallback(
    (id: string) => ResourceService.deleteLesson(id),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    GetResourcesParams
  >({
    service: getLessons,
    defaultResponse: { count: 0, items: [] },
    //defaultResponse: { count: mockLessons.length, items: mockLessons },
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
    actions: {
      onEdit: (id: string) =>
        navigate(`${authRoutes.myResources.editLesson.path}/${id}`)
    },
    sx: styles.table
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.lessons.addBtn')}
        button={
          <AppButton
            onClick={() => navigate(authRoutes.myResources.newLesson.path)}
          >
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
