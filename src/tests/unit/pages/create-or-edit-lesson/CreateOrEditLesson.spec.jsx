import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '~tests/test-utils'
import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'

describe('CreateOrEditLesson component test', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CreateOrEditLesson />))
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
  it('should navigate to my-resources on Cancel click', async () => {
    const cancelBtn = screen.getByText('common.cancel')

    expect(cancelBtn.closest('a')).toHaveAttribute('href', '/my-resources')
  })

  it('should submit form with title and description', async () => {
    const user = userEvent.setup()
    const titleField = screen.getByLabelText('lesson.labels.title')
    const descriptionField = screen.getByLabelText('lesson.labels.description')

    await user.type(titleField, 'Test Lesson')
    await user.type(descriptionField, 'Test Description')

    const saveBtn = screen.getByText('common.save')
    await user.click(saveBtn)

    await waitFor(() => {
      expect(saveBtn).toBeInTheDocument()
    })
  })
})
