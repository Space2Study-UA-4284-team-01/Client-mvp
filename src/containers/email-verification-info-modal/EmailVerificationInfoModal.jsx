import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import infoIllustration from '~/assets/img/email-confirmation-modals/email-verification-info-icon.svg'
import { useModalContext } from '~/context/modal-context'
import { styles } from '~/containers/email-verification-info-modal/EmailVerificationInfoModal.styles'

const EmailVerificationInfoModal = ({ email }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  return (
    <Box sx={styles.root}>
      <Box alt='' component='img' src={infoIllustration} sx={styles.iconImg} />
      <Typography sx={styles.title}>{t('signup.confirmEmailTitle')}</Typography>
      <Typography component='div' sx={styles.body}>
        {t('signup.confirmEmailMessage')}
        <Box component='span' sx={styles.email}>
          {email}
        </Box>
        {t('signup.confirmEmailDesc')}
      </Typography>
      <Button onClick={closeModal} sx={styles.button} variant='contained'>
        {t('signup.confirmEmailOk')}
      </Button>
    </Box>
  )
}

export default EmailVerificationInfoModal
