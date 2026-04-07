import { Box, Button } from '@mui/material'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { useModalContext } from '~/context/modal-context'

const SubjectStepTest = () => {
  const { openModal } = useModalContext()

  const onOpen = () => {
    openModal({
      component: <UserStepsWrapper userRole='student' />,
      paperProps: {
        sx: {
          maxHeight: { sm: '652px' },
          height: '100%',
          maxWidth: '1130px',
          width: '100%'
        }
      }
    })
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button onClick={onOpen} variant='contained'>
        Open subject step test
      </Button>
    </Box>
  )
}

export default SubjectStepTest
