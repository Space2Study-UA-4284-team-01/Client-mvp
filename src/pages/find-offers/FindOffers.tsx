import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SortMenu from '~/components/sort-menu/SortMenu'
import RoleSwitcher from '~/components/role-switcher/RoleSwitcher'

import {
  SizeEnum,
  ButtonVariantEnum,
  CategoryInterface,
  ItemsWithCount,
  Sort,
  SortEnum
} from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { defaultResponses } from '~/constants'
import { getOpositeRole } from '~/utils/helper-functions'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import heroImage from '~/assets/img/find-offer/subject_icon.png'
import { useAppSelector } from '~/hooks/use-redux'
import { categoryService } from '~/services/category-service'
import useAxios from '~/hooks/use-axios'
import CategoryCard from '~/components/category-card/CategoryCard'
import AppButton from '~/components/app-button/AppButton'

const FindOffers = () => {
  const { t } = useTranslation()

  const [sort, setSort] = useState<Sort>({
    order: SortEnum.Desc,
    orderBy: 'createdAt'
  })
  const { userRole } = useAppSelector((state) => state.appMain)
  const oppositeRole = getOpositeRole(userRole)
  const [authorRole, setAuthorRole] = useState<UserRoleEnum>(() => oppositeRole)

  const { response } = useAxios<ItemsWithCount<CategoryInterface>>({
    service: () => categoryService.getCategories({ limit: 9, skip: 0, sort }),
    defaultResponse: defaultResponses.itemsWithCount
  })

  const categoryCards = useMemo(
    () =>
      response.items.map((category) => (
        <CategoryCard
          icon={category.appearance.icon}
          id={category._id}
          key={category._id}
          link={authRoutes.categories.path}
          offers={category.totalOffers[authorRole]}
          title={category.name}
        />
      )),
    [response.items, authorRole]
  )

  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    // search logic here
  }

  return (
    <PageWrapper>
      <Box sx={styles.heroBox}>
        <Box sx={styles.heroContent}>
          <Typography mb='8px' variant='h5'>
            {t('findOffers.hero.title', {
              defaultValue: 'Tutors for private lessons'
            })}
          </Typography>
          <Typography mb='16px' variant='body2'>
            {t('findOffers.hero.description', {
              defaultValue:
                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
            })}
          </Typography>
          <Button sx={{ alignSelf: 'flex-start' }} variant='contained'>
            {t('findOffers.hero.button', { defaultValue: 'Create request' })}
          </Button>
        </Box>
        <Box
          alt='hero illustration'
          component='img'
          src={heroImage}
          sx={styles.heroImage}
        />
      </Box>

      <Box sx={styles.contentWrapper}>
        <TitleWithDescription
          description={t('findOffers.description', {
            defaultValue: 'Discover offers in your area of interest'
          })}
          style={styles.titleWithDescription}
          title={t('findOffers.title', { defaultValue: 'Explore Offers' })}
        />

        <Box sx={styles.navigation}>
          <DirectionLink
            before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
            linkTo={authRoutes.categories.path}
            title={t('subjectsPage.subjects.backToAllCategories', {
              defaultValue: 'Back to all categories'
            })}
          />
        </Box>

        <AppToolbar sx={styles.searchToolbar}>
          <TextField
            label={t('findOffers.category', { defaultValue: 'Category' })}
            onChange={(e) => setCategory(e.target.value)}
            select
            size='small'
            sx={styles.categoryInput}
            value={category}
          >
            <MenuItem value='1'>Languages</MenuItem>
          </TextField>

          <TextField
            label={t('findOffers.subject', { defaultValue: 'Subject' })}
            onChange={(e) => setSubject(e.target.value)}
            select
            size='small'
            sx={styles.categoryInput}
            value={subject}
          >
            <MenuItem value='1'>English</MenuItem>
          </TextField>

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('findOffers.searchPlaceholder', {
              defaultValue: 'Search by tutor name'
            })}
            size='small'
            sx={styles.searchInput}
            value={search}
          />

          <Button
            onClick={handleSearch}
            sx={styles.searchButton}
            variant='contained'
          >
            {t('findOffers.search', { defaultValue: 'Search' })}
          </Button>
        </AppToolbar>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <RoleSwitcher authorRole={authorRole} onChange={setAuthorRole} />
          <SortMenu setSort={setSort} sort={sort} />
        </Box>

        <Typography sx={styles.title}>
          {t('findOffers.popularCategories.title')}
        </Typography>

        <Box sx={styles.cardsGrid}>{categoryCards}</Box>

        <AppButton
          component={Link}
          sx={styles.viewAllButton}
          to={authRoutes.categories.path}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('findOffers.popularCategories.viewAll')}
        </AppButton>
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
