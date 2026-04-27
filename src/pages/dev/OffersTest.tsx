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

const baseMockOffer: Offer = {
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
    name: 'Mathematics',
    appearance: { icon: '#', color: '#79B260' },
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

// 🔥 Single mock offer
const mockOffers: Offer[] = [
  {
    ...baseMockOffer,
    _id: '1',
    title: 'German for beginners: speaking & grammar',
    price: 400,
    subject: { _id: '1', name: 'German' },
    proficiencyLevel: [ProficiencyLevelEnum.Beginner],
    category: {
      ...baseMockOffer.category,
      appearance: { icon: '#', color: '#79B260' }
    }
  },
  {
    ...baseMockOffer,
    _id: '2',
    title: 'Marine Biology basics with real-world examples',
    price: 300,
    subject: { _id: '2', name: 'Marine Biology' },
    category: {
      ...baseMockOffer.category,
      appearance: { icon: '#', color: '#5A8088' }
    }
  },
  {
    ...baseMockOffer,
    _id: '3',
    title: 'Linear Algebra explained step-by-step',
    price: 250,
    subject: { _id: '3', name: 'Linear Math' },
    proficiencyLevel: [
      ProficiencyLevelEnum.Beginner,
      ProficiencyLevelEnum.Advanced
    ],
    category: {
      ...baseMockOffer.category,
      appearance: { icon: '#', color: '#F1BC19' }
    }
  },
  {
    ...baseMockOffer,
    _id: '4',
    title: 'UI/UX Design from scratch (Figma + UX thinking)',
    price: 500,
    subject: { _id: '4', name: 'UI/UX Design' },
    category: {
      ...baseMockOffer.category,
      appearance: { icon: '#', color: '#00A7A7' }
    }
  },
  {
    ...baseMockOffer,
    _id: '5',
    title: 'Guitar lessons: chords, rhythm & songs',
    price: 350,
    subject: { _id: '5', name: 'Guitar' },
    category: {
      ...baseMockOffer.category,
      appearance: { icon: '#', color: '#B35969' }
    }
  },
  {
    ...baseMockOffer,
    _id: '6',
    title: 'Ancient World History: from Egypt to Rome',
    price: 150,
    subject: { _id: '6', name: 'Ancient World History' },
    category: {
      ...baseMockOffer.category,
      appearance: { icon: '#', color: '#EE3E54' }
    }
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
            onSendMessage={handleSendMessage}
            onShowDetails={handleShowDetails}
            onToggleFavorite={handleAddToFavorites}
          />
        ))}
      </div>
    </PageWrapper>
  )
}

export default FindOffersTest
