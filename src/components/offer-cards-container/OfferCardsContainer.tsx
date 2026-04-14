import { FC, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { TypographyVariantEnum } from '~/types'

interface OfferCardsContainerProps {
  cards: ReactNode[]
}

const OfferCardsContainer: FC<OfferCardsContainerProps> = ({ cards }) => {
  const [isList, setIsList] = useState(false)
  const { t } = useTranslation()

  const onChange = () => setIsList((prev) => !prev)

  const switchOptions = {
    left: { text: t('common.grid') },
    right: { text: t('common.list') }
  }

  return (
    <Box>
      <AppContentSwitcher
        active={isList}
        onChange={onChange}
        switchOptions={switchOptions}
        typographyVariant={TypographyVariantEnum.Body2}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isList
            ? '1fr'
            : {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
          gap: '24px'
        }}
      >
        {cards}
      </Box>
    </Box>
  )
}

export default OfferCardsContainer
