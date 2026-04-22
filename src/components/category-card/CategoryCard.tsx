import { FC } from 'react'
import CardWithLink from '~/components/card-with-link/CardWithLink'

interface CategoryCardProps {
  id: string
  title: string
  icon: string
  offers: number
  link?: string
}

const CategoryCard: FC<CategoryCardProps> = ({
  id,
  title,
  icon,
  offers,
  link = `/subjects?category=${id}`
}) => {
  return (
    <CardWithLink
      description={`${offers} Offers`}
      img={icon}
      link={link}
      title={title}
    />
  )
}

export default CategoryCard
