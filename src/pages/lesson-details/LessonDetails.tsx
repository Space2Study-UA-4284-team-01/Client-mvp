import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { Lesson, ErrorResponse } from '~/types'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'

const LessonDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setAlert } = useSnackBarContext()

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const { response, loading, fetchData } = useAxios<Lesson>({
    service: () => ResourceService.getLesson(id ?? ''),
    defaultResponse: {
      _id: '',
      title: '',
      description: '',
      content: '',
      attachments: [],
      category: null,
      createdAt: '',
      updatedAt: ''
    },
    fetchOnMount: true,
    onResponseError
  })

  useEffect(() => {
    if (id) void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) return <Loader pageLoad />

  return (
    <PageWrapper>
      <Box>
        <Typography
          onClick={() =>
            navigate(`${authRoutes.myResources.editLesson.path}/${id}`)
          }
          sx={{ cursor: 'pointer' }}
          variant='h4'
        >
          {response.title}
        </Typography>
        <Typography variant='body1'>{response.description}</Typography>
      </Box>
    </PageWrapper>
  )
}

export default LessonDetails
