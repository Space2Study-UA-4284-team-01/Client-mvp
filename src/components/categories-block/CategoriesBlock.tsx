import { FC, useState } from 'react'
import CardsList from '~/components/cards-list/CardsList'
import CategoryCard from '~/components/category-card/CategoryCard'

interface Category {
  id: string
  title: string
  icon: string
  offers: number
}

interface CategoriesBlockProps {
  categories: Category[]
}

const INITIAL_COUNT = 6

const CategoriesBlock: FC<CategoriesBlockProps> = ({ categories }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const visibleCategories = categories.slice(0, visibleCount)

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + INITIAL_COUNT)
  }

  const hasMore = visibleCount < categories.length

  return (
    <CardsList
      btnText='View more'
      cards={visibleCategories.map((cat) => (
        <CategoryCard key={cat.id} {...cat} />
      ))}
      isExpandable={hasMore}
      onClick={handleViewMore}
    />
  )
}

export default CategoriesBlock
