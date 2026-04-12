export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { xs: 3, md: 4 },
    backgroundColor: '#D8F0EC',
    borderRadius: 2,
    px: { md: 7, sm: 3, xs: 3 },
    py: { md: 6, sm: 4, xs: 4 },
    mb: 4
  },
  info: {
    flex: '1 1 auto',
    minWidth: 0,
    maxWidth: { md: '58%' }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left',
      mb: 3
    },
    title: {
      typography: { md: 'h4', xs: 'h5' },
      color: 'primary.900',
      fontWeight: 700,
      mb: 1
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.800',
      mb: 0
    }
  },
  button: {
    py: '14px',
    px: 3,
    alignSelf: { xs: 'stretch', sm: 'flex-start' },
    backgroundColor: '#262D33',
    color: 'basic.white',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#1a1f24'
    }
  },
  illustrationWrap: {
    flexShrink: 0,
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center'
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: '50%',
    backgroundColor: 'warning.50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  illustrationIcon: {
    fontSize: 64,
    color: 'basic.blue'
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%'
  }
}
