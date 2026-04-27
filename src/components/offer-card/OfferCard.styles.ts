export const styles = {
  root: {
    display: 'flex',
    gap: '24px',
    alignItems: 'stretch'
  },

  // LEFT
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  title: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: 1.3
  },

  // CENTER
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '12px'
  },

  description: {
    fontSize: '14px',
    color: '#555',
    lineHeight: 1.5,

    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },

  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },

  // RIGHT
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  top: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start'
  },

  priceValue: {
    fontWeight: 700,
    fontSize: '18px'
  },

  priceLabel: {
    fontSize: '12px',
    color: '#888'
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  },

  secondaryButton: {
    backgroundColor: '#f1f1f1',
    color: '#333',
    borderColor: 'transparent',

    '&:hover': {
      backgroundColor: '#e0e0e0',
      borderColor: 'transparent'
    }
  }
}
