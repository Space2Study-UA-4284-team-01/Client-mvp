import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SortMenu from '~/components/sort-menu/SortMenu'
import { SortEnum } from '~/types'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

let capturedProps: any

vi.mock('~/components/app-select/AppSelect', () => ({
  default: (props: any) => {
    capturedProps = props
    return (
      <select
        data-testid='app-select'
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      >
        {props.fields.map((f: any) => (
          <option key={f.value} value={f.value}>
            {f.title}
          </option>
        ))}
      </select>
    )
  }
}))

describe('SortMenu', () => {
  it('should render without crashing', () => {
    render(
      <SortMenu
        sort={{
          order: SortEnum.Asc,
          orderBy: 'createdAt'
        }}
        setSort={vi.fn()}
      />
    )

    expect(screen.getByTestId('app-select')).toBeInTheDocument()
  })

  it('should render with correct translation key', () => {
    render(
      <SortMenu
        sort={{
          order: SortEnum.Asc,
          orderBy: 'createdAt'
        }}
        setSort={vi.fn()}
      />
    )

    expect(capturedProps.selectTitle).toBe('filters.sortBy.sortByTitle')
  })

  it('should render AppSelect with correct props', () => {
    render(
      <SortMenu
        sort={{
          order: SortEnum.Desc,
          orderBy: 'rating'
        }}
        setSort={vi.fn()}
      />
    )

    const select = screen.getByTestId('app-select')

    expect(select).toHaveValue('rating')
  })

  it('should call setSort when a new value is selected', () => {
    const setSort = vi.fn()

    render(
      <SortMenu
        sort={{
          order: SortEnum.Asc,
          orderBy: 'createdAt'
        }}
        setSort={setSort}
      />
    )

    fireEvent.change(screen.getByTestId('app-select'), {
      target: { value: 'priceDesc' }
    })

    expect(setSort).toHaveBeenCalledWith({
      order: SortEnum.Desc,
      orderBy: 'price'
    })
  })

  it('should contain expected sort values', () => {
    render(
      <SortMenu
        sort={{
          order: SortEnum.Asc,
          orderBy: 'createdAt'
        }}
        setSort={vi.fn()}
      />
    )

    const options = document.querySelectorAll('option')

    expect(Array.from(options).map((o) => o.value)).toEqual(
      expect.arrayContaining(['newest', 'rating', 'priceAsc', 'priceDesc'])
    )
  })
})
