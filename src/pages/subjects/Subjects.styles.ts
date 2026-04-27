export const styles = {
  page: {
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden'
  },

  contentWrapper: {
    width: '100%',
    maxWidth: '1120px',
    mx: 'auto',
    px: { xs: '16px', md: '24px' },
    pb: '40px',
    boxSizing: 'border-box',
    overflowX: 'hidden'
  },

  categoryInput: {
    width: '100%',
    maxWidth: { xs: '100%', sm: '160px', md: '170px' },
    mr: { xs: '0', sm: '20px' },
    mb: { xs: '12px', sm: '0' },
    minWidth: 0,
    '& .MuiOutlinedInput-root': {
      padding: '2px 8px',
      minHeight: '40px'
    },
    label: {
      lineHeight: '20px'
    }
  },

  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    mb: '16px',
    width: '100%',
    minWidth: 0
  },

  searchToolbar: {
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    borderRadius: '32px',
    mb: '10px',
    px: { xs: '12px', md: '20px' },
    py: { xs: '12px', md: '16px' }
  },

  requestTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px',
    mb: '24px',
    mt: '24px',
    textAlign: 'center',
    width: '100%'
  },

  requestText: {
    fontSize: '14px',
    lineHeight: '18px',
    color: 'primary.500'
  },

  requestButton: {
    border: 'none',
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 400,
    color: 'primary.600'
  },

  boldText: {
    fontWeight: 700,
    color: 'primary.600'
  } as const,

  cardsGrid: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, minmax(0, 1fr))',
      md: 'repeat(3, minmax(0, 1fr))'
    },
    gap: '16px'
  },

  cardItem: {
    width: '100%',
    minWidth: 0,
    display: 'flex'
  },

  viewMoreWrapper: {
    display: 'flex',
    justifyContent: 'center',
    mt: '16px',
    width: '100%'
  },

  viewMoreButton: {
    minWidth: '110px',
    height: '36px',
    borderRadius: '6px',
    textTransform: 'none',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)'
  },

  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none'
  },

  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  }
}
