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

interface ModalConfig {
  component: React.ReactElement
  paperProps?: PaperProps
  onCloseRequest?: () => void | Promise<void>
}

interface ModalProvideContext {
  openModal: (component: ModalConfig, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalConfig | null>(null)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const closeModal = useCallback(() => {
    timer && clearTimeout(timer)
    setModal(null)
    setTimer(null)
  }, [setModal, setTimer, timer])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    (
      { component, paperProps, onCloseRequest }: ModalConfig,
      delayToClose?: number
    ) => {
      timer && clearTimeout(timer)
      setModal({ component, paperProps, onCloseRequest })

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
    void Promise.resolve(fn()).catch(console.error)
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
          paperProps={modal.paperProps ?? {}}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
