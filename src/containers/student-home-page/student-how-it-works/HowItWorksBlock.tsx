import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { AccordionWithImageItem } from '~/types'
import { styles } from '~/containers/student-home-page/student-how-it-works/HowItWorksBlock.styles'

interface HowItWorksBlockProps {
  items: AccordionWithImageItem[]
}

const HowItWorksBlock: FC<HowItWorksBlockProps> = ({ items }) => {
  const { t } = useTranslation()

  if (!items.length) return null

  const cards = items.map((item) => {
    const title = t(item.title)
    const description = t(item.description ?? '')

    return (
      <Box key={title} sx={styles.card}>
        <Box alt={title} component='img' src={item.image} sx={styles.image} />
        <TitleWithDescription
          description={description}
          style={styles.cardTitleWithDescription}
          title={t(item.title)}
        />
      </Box>
    )
  })

  return (
    <Box sx={styles.section}>
      <TitleWithDescription
        description={t('studentHomePage.howItWorks.description')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.howItWorks.title')}
      />
      <Box sx={styles.cardsContainer}>{cards}</Box>
    </Box>
  )
}

export default HowItWorksBlock
