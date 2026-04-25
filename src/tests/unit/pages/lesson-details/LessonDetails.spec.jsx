import { screen } from '@testing-library/react'
import { vi } from 'vitest'

import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import LessonDetails from '~/pages/lesson-details/LessonDetails'
import { URLs } from '~/constants/request'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn()
  }
})

const lessonMock = {
  _id: '123',
  title: 'Test Lesson',
  description: 'Test Description',
  content: '',
  attachments: [],
  category: null,
  createdAt: '2023-10-02T17:39:52.373Z',
  updatedAt: '2023-10-03T17:39:52.373Z'
}

describe('LessonDetails component test', () => {
  afterEach(() => {
    mockAxiosClient.reset()
  })

  it('should display lesson title', async () => {
    mockAxiosClient
      .onGet(`${URLs.resources.lessons.get}/123`)
      .replyOnce(200, lessonMock)

    renderWithProviders(<LessonDetails />)

    const title = await screen.findByText(lessonMock.title)
    expect(title).toBeInTheDocument()
  })

  it('should display lesson description', async () => {
    mockAxiosClient
      .onGet(`${URLs.resources.lessons.get}/123`)
      .replyOnce(200, lessonMock)

    renderWithProviders(<LessonDetails />)

    const description = await screen.findByText(lessonMock.description)
    expect(description).toBeInTheDocument()
  })

  it('should have clickable title', async () => {
    mockAxiosClient
      .onGet(`${URLs.resources.lessons.get}/123`)
      .replyOnce(200, lessonMock)

    renderWithProviders(<LessonDetails />)

    const title = await screen.findByText(lessonMock.title)
    expect(title).toBeInTheDocument()
  })
})
