import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useTranslation } from 'react-i18next'
import LanguageSelectDropdown from '~/components/language-select-dropdown/LanguageSelectDropdown'
import { useStepContext } from '~/context/step-context'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()

  const handleLanguageSelect = (language) => {
    handleStepData('language', language)
  }

  const imageContainer = (
    <Box sx={styles.imgContainer}>
      <Box
        alt=''
        aria-hidden='true'
        component='img'
        src={img}
        sx={styles.img}
      />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageContainer}
      <Box sx={styles.rigthBox}>
        {isMobile && imageContainer}
        <Box sx={styles.contentBox}>
          <Typography>{t('becomeTutor.languages.title')}</Typography>
          <LanguageSelectDropdown
            onChange={handleLanguageSelect}
            placeholder={t('becomeTutor.languages.autocompleteLabel')}
            value={stepData.language}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
