import { SelectFieldType } from '~/types'

export const sortFields: SelectFieldType<string>[] = [
  { value: 'newest', title: 'findOffers.sortTitles.newest' },
  { value: 'rating', title: 'findOffers.sortTitles.rating' },
  { value: 'priceAsc', title: 'findOffers.sortTitles.priceAsc' },
  { value: 'priceDesc', title: 'findOffers.sortTitles.priceDesc' }
]
