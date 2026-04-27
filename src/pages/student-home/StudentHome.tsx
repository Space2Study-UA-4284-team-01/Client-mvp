import { useCallback, useEffect } from 'react'
import Container from '@mui/material/Container'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import Faq from '~/containers/student-home-page/faq/Faq'

import { translationKey } from '~/components/find-block/find-tutor-constants'
import { useTranslation } from 'react-i18next'
import useConfirm from '~/hooks/use-confirm'

const StudentHome = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)
  const { checkConfirmation } = useConfirm()

  const handleCloseRequest = useCallback<() => Promise<void>>(async () => {
    const confirmed: boolean | Promise<boolean> = checkConfirmation({
      title: 'titles.confirmTitle',
      message: 'questions.unsavedChanges',
      confirmButton: t('common.discard'),
      cancelButton: t('common.cancel'),
      check: true
    })
    if (await confirmed) closeModal()
  }, [checkConfirmation, closeModal, t])

  useEffect(() => {
    const shouldShow =
      isFirstLogin || localStorage.getItem('showOnboarding') === 'true'
    if (shouldShow) {
      localStorage.removeItem('showOnboarding')
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        onCloseRequest: handleCloseRequest,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole, handleCloseRequest])

  return (
    <Container data-testid='studentHome' sx={{ flex: 1 }}>
      <FindBlock translationKey={translationKey} />
      <Faq />
    </Container>
  )
}

export default StudentHome
