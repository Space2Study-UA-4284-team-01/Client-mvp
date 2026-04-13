import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoryCard from '~/components/category-card/CategoryCard'
import AppButton from '~/components/app-button/AppButton'

import { categoryService } from '~/services/category-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { defaultResponses } from '~/constants'
import { getOpositeRole } from '~/utils/helper-functions'
import { ButtonVariantEnum, CategoryInterface, ItemsWithCount } from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const oppositeRole = getOpositeRole(userRole)

  const { response } = useAxios<ItemsWithCount<CategoryInterface>>({
    service: () => categoryService.getCategories({ limit: 9, skip: 0 }),
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
          offers={category.totalOffers[oppositeRole]}
          title={category.name}
        />
      )),
    [response.items, oppositeRole]
  )

  return (
    <PageWrapper>
      <Box sx={styles.popularCategoriesSection}>
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
