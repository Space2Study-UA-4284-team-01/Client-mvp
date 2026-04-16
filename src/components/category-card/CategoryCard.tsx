import { FC } from 'react'
import CardWithLink from '~/components/card-with-link/CardWithLink'

interface CategoryCardProps {
  id: string
  title: string
  icon: string
  offers: number
}

const CategoryCard: FC<CategoryCardProps> = ({ id, title, icon, offers }) => {
  return (
    <CardWithLink
      description={`${offers} Offers`}
      img={icon}
      link={`/subjects?category=${id}`}
      title={title}
    />
  )
}

export default CategoryCard
