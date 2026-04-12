import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import HubIcon from '@mui/icons-material/Hub'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import CreateOfferRequestModal from '~/containers/categories/create-offer-request-modal/CreateOfferRequestModal'

import { styles } from '~/containers/categories/private-lessons-banner/PrivateLessonsBanner.styles'

const translationKey = 'categoriesPage.privateLessonsBanner'

const PrivateLessonsBanner = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const { openModal } = useModalContext()
  const { isMobile } = useBreakpoints()

  const handleOpenModal = () => {
    openModal({
      component: <CreateOfferRequestModal />,
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
    <Box sx={styles.root}>
      <Box sx={styles.info}>
        <TitleWithDescription
          description={t(`${translationKey}.description`)}
          style={styles.titleWithDescription}
          title={t(`${translationKey}.title.${userRole}`)}
        />
        <AppButton
          fullWidth={isMobile}
          onClick={handleOpenModal}
          sx={styles.button}
        >
          {t(`${translationKey}.button.${userRole}`)}
        </AppButton>
      </Box>
      <Box sx={styles.illustrationWrap}>
        <Box sx={styles.illustrationCircle}>
          <Box
            sx={{
              ...styles.dot,
              top: 12,
              right: 16,
              backgroundColor: 'error.500'
            }}
          />
          <Box
            sx={{
              ...styles.dot,
              bottom: 20,
              left: 12,
              backgroundColor: 'warning.600'
            }}
          />
          <HubIcon sx={styles.illustrationIcon} />
        </Box>
      </Box>
    </Box>
  )
}

export default PrivateLessonsBanner
