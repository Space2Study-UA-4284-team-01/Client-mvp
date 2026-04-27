import { Offer } from '~/types'
import { hexToRgba, isHex } from '~/utils/color'

export const getOfferCardData = (offer: Offer) => {
  const { author, subject, category, proficiencyLevel } = offer

  const fullName = `${author.firstName} ${author.lastName}`

  const categoryColor = category?.appearance?.color

  const baseColor =
    categoryColor && isHex(categoryColor) ? categoryColor : '#79B260'

  const chips = [
    {
      label: subject.name,
      bgColor: hexToRgba(baseColor, 0.6)
    },
    ...proficiencyLevel.map((lvl) => ({
      label: lvl,
      bgColor: hexToRgba(baseColor, 0.2)
    }))
  ]

  return {
    fullName,
    baseColor,
    chips
  }
}
