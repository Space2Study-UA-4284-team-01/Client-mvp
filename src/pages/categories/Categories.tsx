import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { authRoutes } from '~/router/constants/authRoutes'

const Categories = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  return (
    <PageWrapper>
      <TitleWithDescription
        description={t("Explore categories you're passionate about.")}
        title={t('Categories')}
      />

      <DirectionLink
        after={<ArrowForwardIcon fontSize='small' />}
        linkTo={authRoutes.findOffers.path}
        title={t('Show all offers')}
      />

      <AppToolbar sx={{ mt: 3 }}>
        <SearchAutocomplete
          loading={false}
          onFocus={() => {}}
          onSearchChange={() => {}}
          options={[]}
          search={search}
          setSearch={setSearch}
          textFieldProps={{
            label: t('What would you like to learn?')
          }}
        />
      </AppToolbar>
    </PageWrapper>
  )
}

export default Categories
