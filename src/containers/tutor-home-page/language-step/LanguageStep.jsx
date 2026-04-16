import Box from '@mui/material/Box'
import { Typography, TextField, Autocomplete } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const languages = [
  { label: 'English', code: 'en' },
  { label: 'Ukrainian', code: 'uk' },
  { label: 'Polish', code: 'pl' }
]

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const [value, setValue] = useState(null)

  const imageContainer = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageContainer}
      <Box sx={styles.rigthBox}>
        {isMobile && imageContainer}
        <Box sx={styles.contentBox}>
          <Typography>{t('becomeTutor.languages.title')}</Typography>

          <Autocomplete
            getOptionLabel={(option) => option.label}
            onChange={(e, newValue) => setValue(newValue)}
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder={t('becomeTutor.languages.autocompleteLabel')}
                variant='outlined'
              />
            )}
            sx={{ mt: 2 }}
            value={value}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
