import { fireEvent, screen, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'

import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const lessonMock = {
  _id: 's0Me1D',
  title: 'Test Lesson',
  description: 'Test Description',
  content: '',
  attachments: [],
  category: null,
  author: 's0MeAuth0r1D',
  createdAt: '2023-10-02T17:39:52.373Z',
  updatedAt: '2023-10-03T17:39:52.373Z'
}

const responseLessonsItemsMock = Array(5)
  .fill('')
  .map((_, index) => ({
    ...lessonMock,
    _id: lessonMock._id + index,
    title: index + lessonMock.title
  }))

const responseLessonsMock = {
  count: 5,
  items: responseLessonsItemsMock
}

const responseLessonsItemsMockWithCategory = Array(5)
  .fill('')
  .map((_, index) => ({
    ...lessonMock,
    category: { _id: '64fb2c33eba89699411d22bb', name: 'New Category' },
    _id: lessonMock._id + index,
    title: index + lessonMock.title
  }))

const responseLessonsMockWithCategory = {
  count: 5,
  items: responseLessonsItemsMockWithCategory
}

describe('LessonsContainer test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, responseLessonsMock)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render "New lesson" button', () => {
    const newLessonBtn = screen.getByText('myResourcesPage.lessons.addBtn')

    expect(newLessonBtn).toBeInTheDocument()
  })

  it('should render table with lesson items', async () => {
    const lessonItemTitle = await screen.findByText(
      responseLessonsMock.items[0].title
    )
    const tableLastUpdatesText = await screen.findByText(
      'myResourcesPage.lessons.lastUpdates'
    )

    expect(lessonItemTitle).toBeInTheDocument()
    expect(tableLastUpdatesText).toBeInTheDocument()
  })

  it('should display lesson menu', async () => {
    const lessonMenuBtn = screen.getAllByTestId('menu-icon')[0]

    await waitFor(() => {
      fireEvent.click(lessonMenuBtn)
    })

    const lessonMenu = screen.getByRole('menu')

    expect(lessonMenu).toBeInTheDocument()
  })
})

describe('LessonCategory test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, responseLessonsMockWithCategory)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render correct category chip', async () => {
    const categoryChip = await screen.findAllByText('New Category')

    expect(categoryChip.length).toBeGreaterThan(0)
  })
})

describe('LessonsContainer delete test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, responseLessonsMock)

      mockAxiosClient.onDelete(URLs.resources.lessons.delete).reply(200)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should open confirmation dialog on delete click', async () => {
    const menuBtn = screen.getAllByTestId('menu-icon')[0]

    await waitFor(() => {
      fireEvent.click(menuBtn)
    })

    const deleteBtn = screen.getByText('common.delete')

    await waitFor(() => {
      fireEvent.click(deleteBtn)
    })

    const confirmDialog = screen.getByTestId('confirmDialog')

    expect(confirmDialog).toBeInTheDocument()
  })

  it('should delete lesson after confirmation', async () => {
    const menuBtn = screen.getAllByTestId('menu-icon')[0]

    await waitFor(() => {
      fireEvent.click(menuBtn)
    })

    const deleteBtn = screen.getByText('common.delete')

    await waitFor(() => {
      fireEvent.click(deleteBtn)
    })

    const confirmBtn = screen.getByText('common.yes')

    await waitFor(() => {
      fireEvent.click(confirmBtn)
    })

    await waitFor(() => {
      expect(mockAxiosClient.history.delete.length).toBe(1)
    })
  })

  it('should show error on delete failure', async () => {
    mockAxiosClient
      .onDelete(URLs.resources.lessons.delete)
      .reply(400, { code: 'LESSON_NOT_FOUND' })

    const menuBtn = screen.getAllByTestId('menu-icon')[0]

    await waitFor(() => {
      fireEvent.click(menuBtn)
    })

    const deleteBtn = screen.getByText('common.delete')

    await waitFor(() => {
      fireEvent.click(deleteBtn)
    })

    const confirmBtn = screen.getByText('common.yes')

    await waitFor(() => {
      fireEvent.click(confirmBtn)
    })

    await waitFor(() => {
      expect(
        screen.queryByText(responseLessonsMock.items[0].title)
      ).toBeInTheDocument()
    })
  })
})
