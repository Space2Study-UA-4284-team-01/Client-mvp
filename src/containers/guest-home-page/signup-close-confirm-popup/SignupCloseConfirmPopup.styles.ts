export const styles = {
  root: {
    width: { xs: '100%', sm: '520px' },
    maxWidth: '100%',
    borderRadius: '8px',
    bgcolor: 'basic.white',
    p: { xs: '20px', sm: '24px 28px 28px' },
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: '16px'
  },
  title: {
    typography: { xs: 'h5', sm: 'h4' },
    color: 'primary.900'
  },
  closeButton: {
    p: 0
  },
  message: {
    typography: 'body1',
    color: 'primary.600',
    mb: '28px',
    maxWidth: '430px'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end'
  },
  yesButton: {
    minWidth: '88px'
  },
  noButton: {
    minWidth: '88px'
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 1300
  }
}
