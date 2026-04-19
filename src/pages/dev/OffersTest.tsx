// Delete this file
import OfferCard from '~/components/offer-card/OfferCard'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import {
  LanguagesEnum,
  Offer,
  ProficiencyLevelEnum,
  StatusEnum,
  UserRoleEnum
} from '~/types'

// 🔥 Single mock offer
const mockOffer: Offer = {
  _id: '1',
  title: 'Math lessons for beginners',
  price: 300,
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available...',
  proficiencyLevel: [ProficiencyLevelEnum.Beginner],
  languages: [LanguagesEnum.English, LanguagesEnum.Ukrainian],
  enrolledUsers: [],
  authorRole: UserRoleEnum.Tutor,
  subject: { _id: '1', name: 'Math' },
  category: {
    _id: '1',
    name: 'Science',
    appearance: { icon: '#', color: 'blue' },
    totalOffers: { student: 2, tutor: 5 },
    createdAt: '',
    updatedAt: ''
  },
  FAQ: [],
  status: StatusEnum.Active,
  createdAt: '',
  updatedAt: '',
  author: {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    photo: '',
    averageRating: { student: 4.5, tutor: 4.5 },
    totalReviews: { student: 10, tutor: 12 },
    professionalSummary: '',
    FAQ: { student: [], tutor: [] }
  }
}

// 🔥 Multiple offers
const mockOffers: Offer[] = [
  mockOffer,
  {
    ...mockOffer,
    _id: '2',
    title: 'Physics lessons for high school students',
    price: 400
  },
  {
    ...mockOffer,
    _id: '3',
    title: 'English conversation practice',
    price: 250
  },
  {
    ...mockOffer,
    _id: '4',
    title: 'Chemistry basics for beginners',
    price: 350
  }
]

const FindOffersTest = () => {
  const handleAddToFavorites = (offer: Offer) => {
    console.log('wishlist:', offer)
  }

  const handleSendMessage = (offer: Offer) => {
    console.log('message:', offer)
  }

  const handleShowDetails = (offer: Offer) => {
    console.log('details:', offer)
  }

  return (
    <PageWrapper>
      <h2>Find offers</h2>

      {/* 🔥 VERTICAL LIST */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {mockOffers.map((offer) => (
          <OfferCard
            key={offer._id}
            offer={offer}
            onAddToFavorites={handleAddToFavorites}
            onSendMessage={handleSendMessage}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>
    </PageWrapper>
  )
}

export default FindOffersTest
