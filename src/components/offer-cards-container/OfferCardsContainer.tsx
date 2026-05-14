import { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'

interface OfferCardsContainerProps {
  cards: ReactNode[]
  isList: boolean
}

const OfferCardsContainer: FC<OfferCardsContainerProps> = ({
  cards,
  isList
}) => {
  return (
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
  )
}

export default OfferCardsContainer
