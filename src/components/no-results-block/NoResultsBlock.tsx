import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import img from '~/assets/img/find-offer/search_icon.svg'
import { styles } from './NoResultsBlock.styles'

const NoResultsBlock = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const handleRequestCategory = () => {
    openModal({ component: <CreateSubjectModal /> })
  }

  return (
    <Box sx={styles.container}>
      <Box alt='no results' component='img' src={img} sx={styles.icon} />
      <Typography sx={styles.title}>{t('noResultsBlock.title')}</Typography>
      <Typography sx={styles.description}>
        {t('noResultsBlock.description')}
      </Typography>
      <AppButton onClick={handleRequestCategory} variant='tonal'>
        {t('noResultsBlock.requestNewCategory')}
      </AppButton>
    </Box>
  )
}

export default NoResultsBlock
