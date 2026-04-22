export const styles = {
  heroBox: {
    backgroundColor: '#CFE5E7',
    borderRadius: '12px',
    p: '24px',
    mb: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: { xs: '100%', sm: '60%' }
  },

  heroImage: {
    width: { xs: '0', sm: '160px' },
    display: { xs: 'none', sm: 'block' }
  },

  titleWithDescription: {
    wrapper: {
      mb: '24px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.900'
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
    borderRadius: '40px',
    mb: '10px',
    px: { xs: '12px', md: '35px' },
    py: { xs: '12px', md: '30px' },
    backgroundColor: '#F5F7F7',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  categoryInput: {
    width: '100%',
    maxWidth: { xs: '100%', sm: '140px', md: '280px' },
    mr: { xs: '0', sm: '0' },
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
  searchButton: {
    minWidth: '120px',
    height: '50px',

    backgroundColor: '#4e6570',
    color: '#fff',

    '&:hover': {
      backgroundColor: '#4e6570'
    }
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    ml: { xs: '100px', sm: '40px' },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none'
      },
      '&:hover fieldset': {
        border: 'none'
      },
      '&.Mui-focused fieldset': {
        border: 'none'
      }
    },
    '&:hover': {
      backgroundColor: '#F5F7F7'
    }
  }
}
