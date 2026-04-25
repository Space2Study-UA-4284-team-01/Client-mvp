import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'
import { URLs } from '~/constants/request'
import { authRoutes } from '~/router/constants/authRoutes'

describe('CreateOrEditLesson component test', () => {
  beforeEach(() => {
    renderWithProviders(<CreateOrEditLesson />)
  })

  it('should display lesson form with title and description fields', () => {
    const titleField = screen.getByLabelText('lesson.labels.title')
    const descriptionField = screen.getByLabelText('lesson.labels.description')

    expect(titleField).toBeInTheDocument()
    expect(descriptionField).toBeInTheDocument()
  })

  it('should display Save and Cancel buttons', () => {
    const saveBtn = screen.getByText('common.save')
    const cancelBtn = screen.getByText('common.cancel')

    expect(saveBtn).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
  })

  it('should have Save button disabled when fields are empty', () => {
    const saveBtn = screen.getByText('common.save')

    expect(saveBtn).toBeDisabled()
  })

  it('should enable Save button when title and description are filled', async () => {
    const user = userEvent.setup()
    const titleField = screen.getByLabelText('lesson.labels.title')
    const descriptionField = screen.getByLabelText('lesson.labels.description')

    await user.type(titleField, 'Test Lesson')
    await user.type(descriptionField, 'Test Description')

    const saveBtn = screen.getByText('common.save')
    expect(saveBtn).not.toBeDisabled()
  })
  it('should navigate to my-resources on Cancel click', () => {
    const cancelBtn = screen.getByText('common.cancel')

    expect(cancelBtn.closest('a')).toHaveAttribute(
      'href',
      authRoutes.myResources.root.path
    )
  })

  it('should submit form with title and description', async () => {
    mockAxiosClient.onPost(URLs.resources.lessons.post).replyOnce(200, {})

    const user = userEvent.setup()
    const titleField = screen.getByLabelText('lesson.labels.title')
    const descriptionField = screen.getByLabelText('lesson.labels.description')

    await user.type(titleField, 'Test Lesson')
    await user.type(descriptionField, 'Test Description')

    const saveBtn = screen.getByText('common.save')
    await user.click(saveBtn)

    await waitFor(() => {
      expect(mockAxiosClient.history.post.length).toBe(1)
    })

    const successToast = await screen.findByText('lesson.successAddedLesson')
    expect(successToast).toBeInTheDocument()
  })
})

describe('CreateOrEditLesson edit mode test', () => {
  const lessonId = '123'
  const existingLesson = {
    _id: lessonId,
    title: 'Existing Lesson',
    description: 'Existing Description',
    content: '',
    attachments: [],
    category: null,
    createdAt: '2023-10-02T17:39:52.373Z',
    updatedAt: '2023-10-03T17:39:52.373Z'
  }

  beforeEach(() => {
    mockAxiosClient
      .onGet(`${URLs.resources.lessons.get}/${lessonId}`)
      .reply(200, existingLesson)

    renderWithProviders(<CreateOrEditLesson />, {
      initialEntries: `/my-resources/edit-lesson/${lessonId}`
    })
  })

  afterEach(() => {
    mockAxiosClient.reset()
  })

  it('should render form in edit mode', () => {
    const titleField = screen.getByLabelText('lesson.labels.title')
    expect(titleField).toBeInTheDocument()
  })
})
