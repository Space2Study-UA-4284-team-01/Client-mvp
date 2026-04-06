import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { useModalContext } from '~/context/modal-context'
import useConfirm from '~/hooks/use-confirm'

const StepperPopupTest = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const { checkConfirmation } = useConfirm()

  const handleOpen = () => {
    openModal({
      component: <UserStepsWrapper userRole={'tutor'} />,
      onCloseRequest: async () => {
        const confirmed = checkConfirmation({
          title: 'titles.confirmTitle',
          message: 'questions.unsavedChanges',
          confirmButton: t('common.discard'),
          cancelButton: t('common.cancel'),
          check: true
        })

        if (await confirmed) closeModal()
      }
    })
  }

  return <Button onClick={handleOpen}>Open stepper</Button>
}

export default StepperPopupTest
