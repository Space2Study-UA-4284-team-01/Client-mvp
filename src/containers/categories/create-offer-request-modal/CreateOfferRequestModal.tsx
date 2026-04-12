import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import { useAppSelector } from '~/hooks/use-redux'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/containers/categories/create-offer-request-modal/CreateOfferRequestModal.styles.ts'

const CreateOfferRequestModal: FC = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t(`offerPage.createOffer.description.${userRole}`)}
        style={styles.titleWithDescription}
        title={t(`offerPage.createOffer.buttonTitles.${userRole}`)}
      />
    </Box>
  )
}

export default CreateOfferRequestModal
