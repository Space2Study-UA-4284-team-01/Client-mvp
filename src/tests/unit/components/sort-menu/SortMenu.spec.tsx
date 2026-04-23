import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SortMenu from '~/components/sort-menu/SortMenu'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

vi.mock('~/components/app-select/AppSelect', () => ({
  default: (props: any) => {
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
    render(<SortMenu sort='newest' setSort={vi.fn()} />)

    expect(screen.getByTestId('app-select')).toBeInTheDocument()
  })

  it('should render AppSelect with correct props', () => {
    render(<SortMenu sort='rating' setSort={vi.fn()} />)

    const select = screen.getByTestId('app-select')

    expect(select).toHaveValue('rating')
  })

  it('should call setSort when a new value is selected', () => {
    const setSort = vi.fn()

    render(<SortMenu sort='newest' setSort={setSort} />)

    fireEvent.change(screen.getByTestId('app-select'), {
      target: { value: 'priceDesc' }
    })

    expect(setSort).toHaveBeenCalledWith('priceDesc')
  })

  it('should contain expected sort values', () => {
    render(<SortMenu sort='newest' setSort={vi.fn()} />)

    const options = document.querySelectorAll('option')

    expect(Array.from(options).map((o) => o.value)).toEqual(
      expect.arrayContaining(['newest', 'rating', 'priceAsc', 'priceDesc'])
    )
  })
})
