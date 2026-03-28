export const styles = {
  root: {
    margin: { xs: '0 auto', sm: 0 },
    padding: { xs: 3, sm: 4, md: 6 },
    paddingTop: { xs: 4, md: 5 },
    textAlign: 'center',
    maxWidth: '720px',
    mx: 'auto'
  },
  iconImg: {
    width: { xs: 100, sm: 120 },
    height: 'auto',
    display: 'block',
    mx: 'auto',
    mb: '14px'
  },
  title: {
    typography: { xs: 'subtitle1', sm: 'h6' },
    fontWeight: 700,
    color: 'primary.900',
    mb: '16px',
    px: 1
  },
  body: {
    typography: 'body2',
    color: 'primary.600',
    lineHeight: 1.5,
    px: { xs: 0, sm: 1 }
  },
  email: {
    fontWeight: 700,
    color: 'primary.900',
    wordBreak: 'break-word'
  },
  button: {
    mt: '32px',
    minWidth: 120,
    py: 1.25,
    px: 4,
    borderRadius: '8px',
    backgroundColor: 'primary.900',
    color: 'basic.white',
    fontWeight: 700,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'primary.800',
      boxShadow: 'none'
    }
  }
}
