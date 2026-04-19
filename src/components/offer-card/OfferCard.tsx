import { FC, useState } from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import Bookmark from '@mui/icons-material/Bookmark'

import { Offer, UserRoleEnum } from '~/types'

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
  onAddToFavorites: (offer: Offer) => void
}

const OfferCard: FC<Props> = ({
  offer,
  onSendMessage,
  onShowDetails,
  onAddToFavorites
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
  const showNameAboveTitle = isTablet && !isMobile

  const [isSaved, setIsSaved] = useState(false)

  const handleToggleFavorite = () => {
    setIsSaved((prev) => !prev)
    onAddToFavorites(offer)
  }

  return (
    <AppCard>
      <Box sx={styles.root}>
        {!isTablet ? (
          // Desktop → full profile
          <UserProfileInfo
            _id={author._id}
            firstName={author.firstName}
            lastName={author.lastName}
            photo={author.photo}
            rating={Number(author.averageRating?.tutor)}
            reviewsCount={Number(author.totalReviews?.tutor)}
            role={UserRoleEnum.Tutor}
          />
        ) : (
          // Tablet → profile WITHOUT name (only photo + stats)
          <UserProfileInfo
            _id={author._id}
            firstName=''
            lastName=''
            photo={author.photo}
            rating={Number(author.averageRating?.tutor)}
            reviewsCount={Number(author.totalReviews?.tutor)}
            role={UserRoleEnum.Tutor}
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

            <IconButton onClick={handleToggleFavorite}>
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
