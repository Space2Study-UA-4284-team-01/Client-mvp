import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
  onCloseRequest?: () => void | Promise<void>
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<Component | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const closeModal = useCallback(() => {
    timer && clearTimeout(timer)
    setModal(null)
    setPaperProps({})
    setTimer(null)
  }, [setModal, setPaperProps, setTimer, timer])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    (
      { component, paperProps, onCloseRequest }: Component,
      delayToClose?: number
    ) => {
      timer && clearTimeout(timer)
      setModal({ component, paperProps, onCloseRequest })

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [closeModalAfterDelay, timer]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  )

  const handleCloseRequest = () => {
    const fn = modal?.onCloseRequest ?? closeModal
    void fn()
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={closeModal}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal.component}
          onCloseRequest={handleCloseRequest}
          paperProps={modal.paperProps ?? paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
