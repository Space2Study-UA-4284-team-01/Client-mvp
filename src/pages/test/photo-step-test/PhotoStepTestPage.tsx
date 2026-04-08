import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { tutor } from '~/constants'

const PhotoStepTestPage: FC = () => {
  const { openModal } = useModalContext()

  const handleOpenModal = () => {
    openModal({
      component: (
        <Box
          sx={{
            minWidth: { xs: '100vw', md: '800px' },
            maxWidth: '1200px',
            p: { xs: 2, md: 3 }
          }}
        >
          <UserStepsWrapper userRole={tutor} />
        </Box>
      ),
      paperProps: {
        sx: {
          borderRadius: 2,
          maxWidth: 'lg',
          width: '100%'
        }
      }
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3
      }}
    >
      <Button
        onClick={handleOpenModal}
        size='large'
        sx={{
          py: 2,
          px: 4,
          fontSize: '1.1rem',
          fontWeight: 600
        }}
        variant='contained'
      >
        Open Photo Step Modal
      </Button>
    </Box>
  )
}

export default PhotoStepTestPage
