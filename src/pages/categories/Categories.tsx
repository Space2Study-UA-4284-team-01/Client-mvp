import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Typography } from '@mui/material'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles as titleWithDescriptionStyles } from '~/components/title-with-description/TitleWithDescription.styles'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { authRoutes } from '~/router/constants/authRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'

const categoryOptions = [
  'Math',
  'Physics',
  'English',
  'Programming',
  'Design',
  'Biology',
  'Chemistry'
]

const Categories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim()
    setSearch(trimmedValue)

    if (!trimmedValue) {
      return
    }

    const hasMatch = categoryOptions.some((category) =>
      category.toLowerCase().includes(trimmedValue.toLowerCase())
    )

    if (!hasMatch) {
      navigate(errorRoutes.notFound.path)
    }
  }

  return (
    <PageWrapper>
      <TitleWithDescription
        description={t("Explore categories you're passionate about.")}
        style={{
          ...titleWithDescriptionStyles,
          title: {
            ...titleWithDescriptionStyles.title,
            fontWeight: 600,
            fontSize: '32px'
          }
        }}
        title={t('Categories')}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0, mb: 0 }}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize='small' />}
          linkTo={authRoutes.findOffers.path}
          title={t('Show all offers')}
        />
      </Box>

      <AppToolbar
        sx={{
          mb: 4,
          borderRadius: '999px',
          overflow: 'hidden'
        }}
      >
        <SearchAutocomplete
          loading={false}
          onFocus={() => {}}
          onSearchChange={handleSearch}
          options={categoryOptions}
          search={search}
          setSearch={setSearch}
          textFieldProps={{
            label: t('What would you like to learn?')
          }}
        />
      </AppToolbar>

      <Typography
        align='center'
        sx={{
          fontSize: '14px',
          lineHeight: 1.5,
          color: 'text.primary'
        }}
      >
        {t("Can't find what you're looking for? Request a new ")}
        <Box
          component='span'
          sx={{
            fontWeight: 600,
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          {t('category')}
        </Box>
        {t(' or ')}
        <Box
          component='span'
          sx={{
            fontWeight: 600,
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          {t('subject!')}
        </Box>
      </Typography>
    </PageWrapper>
  )
}

export default Categories
