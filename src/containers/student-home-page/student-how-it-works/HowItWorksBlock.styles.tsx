export const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mb: '48px'
    },
    title: {
      typography: 'h4',
      mb: '8px'
    },
    description: {
      typography: 'subtitle1'
    }
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    width: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '230px',
    textAlign: 'center'
  },
  image: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
    mb: '24px'
  },
  cardTitleWithDescription: {
    wrapper: {
      textAlign: 'center'
    },
    title: {
      typography: 'h6',
      mb: '24px'
    },
    description: {
      typography: 'body2'
    }
  }
}
