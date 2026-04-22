import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/signup-close-confirm-popup/SignupCloseConfirmPopup.styles'

interface SignupCloseConfirmPopupProps {
  onClosePopup: () => void
  onCloseSignupModal: () => void
}

const SignupCloseConfirmPopup: FC<SignupCloseConfirmPopupProps> = ({
  onClosePopup,
  onCloseSignupModal
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleNo = () => {
    onClosePopup()
  }

  const handleYes = () => {
    onCloseSignupModal()
    navigate(-1)
  }

  return (
    <Box sx={styles.backdrop}>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <Typography sx={styles.title}>{t('signup.pleaseConfirm')}</Typography>
          <IconButton onClick={handleNo} sx={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography sx={styles.message}>
          {t('signup.unsavedChangesWarning')}
        </Typography>

        <Box sx={styles.actions}>
          <AppButton onClick={handleYes} sx={styles.yesButton}>
            {t('signup.yes')}
          </AppButton>
          <AppButton onClick={handleNo} sx={styles.noButton} variant='outlined'>
            {t('signup.no')}
          </AppButton>
        </Box>
      </Box>
    </Box>
  )
}

export default SignupCloseConfirmPopup
