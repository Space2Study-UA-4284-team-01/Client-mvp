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
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import MessageForm from '~/components/message-form/MessageForm'

import { styles } from '~/components/offer-card/OfferCard.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { getOfferCardData } from '~/utils/offer/getOfferCard'

interface Props {
  offer: Offer
  onSendMessage: (offer: Offer, message: string) => void
  onShowDetails: (offer: Offer) => void
  onToggleFavorite: (offer: Offer, isSaved: boolean) => void
}

const OfferCard: FC<Props> = ({
  offer,
  onShowDetails,
  onToggleFavorite,
  onSendMessage
}) => {
  const { isTablet, isMobile } = useBreakpoints()
  const { title, price, description, languages, author } = offer

  const isCompact = isTablet || isMobile
  const showNameAboveTitle = isCompact

  const [isSaved, setIsSaved] = useState(false)
  const [isMessageOpen, setIsMessageOpen] = useState(false)

  const handleToggleFavorite = () => {
    const nextIsSaved = !isSaved
    setIsSaved(nextIsSaved)
    onToggleFavorite(offer, nextIsSaved)
  }

  const { fullName, chips } = getOfferCardData(offer)

  return (
    <AppCard>
      <Box sx={styles.root}>
        {/* LEFT */}
        <Box sx={styles.left}>
          <UserProfileInfo
            _id={author._id}
            firstName={isCompact ? '' : author.firstName}
            lastName={isCompact ? '' : author.lastName}
            photo={author.photo}
            rating={Number(author.averageRating?.tutor ?? 0)}
            reviewsCount={Number(author.totalReviews?.tutor ?? 0)}
            role={offer.authorRole}
          />
        </Box>

        {/* CENTER */}
        <Box sx={styles.center}>
          {/* Tablet: only name */}
          {showNameAboveTitle && (
            <Typography fontWeight={500}>{fullName}</Typography>
          )}
          <Typography sx={styles.title}>{title}</Typography>
          <Box sx={styles.meta}>
            <AppChipList defaultQuantity={2} items={chips} />
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
              onClick={() => setIsMessageOpen(true)}
              sx={styles.secondaryButton}
              variant='outlined'
            >
              Send message
            </AppButton>
          </Box>
        </Box>
      </Box>
      {/* POPUP */}
      {isMessageOpen && (
        <PopupDialog
          closeModal={() => setIsMessageOpen(false)}
          closeModalAfterDelay={() => {}}
          content={
            <MessageForm
              offer={offer}
              onClose={() => setIsMessageOpen(false)}
              onSubmit={(message) => {
                onSendMessage(offer, message)
                setIsMessageOpen(false)
              }}
            />
          }
          paperProps={{ sx: { borderRadius: '12px', p: 2 } }}
          timerId={null}
        />
      )}
    </AppCard>
  )
}

export default OfferCard
