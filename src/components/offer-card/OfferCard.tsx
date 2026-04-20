import { FC, useState } from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import Bookmark from '@mui/icons-material/Bookmark'

import { Offer } from '~/types'

import AppCard from '~/components/app-card/AppCard'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppButton from '~/components/app-button/AppButton'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

import { styles } from './OfferCard.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

interface Props {
  offer: Offer
  onSendMessage: (offer: Offer) => void
  onShowDetails: (offer: Offer) => void
  onToggleFavorite: (offer: Offer, isSaved: boolean) => void
}

const OfferCard: FC<Props> = ({
  offer,
  onSendMessage,
  onShowDetails,
  onToggleFavorite
}) => {
  const { isTablet, isMobile } = useBreakpoints()
  const {
    title,
    price,
    description,
    proficiencyLevel,
    languages,
    author,
    subject
  } = offer

  const fullName = `${author.firstName} ${author.lastName}`
  const isCompact = isTablet || isMobile
  const showNameAboveTitle = isCompact

  const [isSaved, setIsSaved] = useState(false)

  const handleToggleFavorite = () => {
    const nextIsSaved = !isSaved
    setIsSaved(nextIsSaved)
    onToggleFavorite(offer, nextIsSaved)
  }

  return (
    <AppCard>
      <Box sx={styles.root}>
        {!isCompact ? (
          // Desktop → full profile
          <UserProfileInfo
            _id={author._id}
            firstName={author.firstName}
            lastName={author.lastName}
            photo={author.photo}
            rating={Number(author.averageRating?.[offer.authorRole] ?? 0)}
            reviewsCount={Number(author.totalReviews?.[offer.authorRole] ?? 0)}
            role={offer.authorRole}
          />
        ) : (
          // Tablet → profile WITHOUT name (only photo + stats)
          <UserProfileInfo
            _id={author._id}
            firstName=''
            lastName=''
            photo={author.photo}
            rating={Number(author.averageRating?.[offer.authorRole] ?? 0)}
            reviewsCount={Number(author.totalReviews?.[offer.authorRole] ?? 0)}
            role={offer.authorRole}
          />
        )}

        {/* CENTER */}
        <Box sx={styles.center}>
          {/* Tablet: only name */}
          {showNameAboveTitle && (
            <Typography fontWeight={500}>{fullName}</Typography>
          )}
          <Typography sx={styles.title}>{title}</Typography>
          <Box sx={styles.meta}>
            <AppChipList defaultQuantity={1} items={[subject.name]} />
            <AppChipList defaultQuantity={2} items={proficiencyLevel} />
          </Box>
          <Typography sx={styles.description}>{description}</Typography>

          <LanguagesListWithIcon languages={languages} />
        </Box>

        {/* RIGHT */}
        <Box sx={styles.right}>
          {/* TOP */}
          <Box sx={styles.top}>
            <Box>
              <Typography sx={styles.priceValue}>{price} UAH</Typography>
              <Typography sx={styles.priceLabel}>/HOUR</Typography>
            </Box>

            <IconButton
              aria-label={
                isSaved ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={isSaved}
              onClick={handleToggleFavorite}
            >
              {isSaved ? <Bookmark color='primary' /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>

          {/* BUTTONS */}
          <Box sx={styles.buttons}>
            <AppButton onClick={() => onShowDetails(offer)}>
              Show details
            </AppButton>

            <AppButton
              onClick={() => onSendMessage(offer)}
              sx={styles.secondaryButton}
              variant='outlined'
            >
              Send message
            </AppButton>
          </Box>
        </Box>
      </Box>
    </AppCard>
  )
}

export default OfferCard
