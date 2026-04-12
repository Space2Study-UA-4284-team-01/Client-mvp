import { useTranslation } from 'react-i18next'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import PrivateLessonsBanner from '~/containers/categories/private-lessons-banner/PrivateLessonsBanner'

import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <PrivateLessonsBanner />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.pageTitle}
        title={t('categoriesPage.title')}
      />
    </PageWrapper>
  )
}

export default Categories
