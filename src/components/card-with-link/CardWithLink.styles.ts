export const styles = {
  card: {
    width: '100%',
    height: '100%',
    minHeight: '86px',
    display: 'block',
    boxSizing: 'border-box',
    borderRadius: '6px',
    border: '1px solid',
    borderColor: 'grey.100',
    backgroundColor: 'basic.white',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '14px',
    px: '18px',
    py: '14px',
    width: '100%',
    boxSizing: 'border-box'
  },

  img: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    minHeight: '40px',
    objectFit: 'contain',
    p: '8px',
    borderRadius: '6px',
    backgroundColor: '#eef7e8'
  },

  titleWithDescription: {
    wrapper: {
      minWidth: 0,
      margin: 0,
      mb: 0,
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      fontSize: '15px',
      fontWeight: 600,
      lineHeight: '20px',
      m: 0
    },
    description: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '16px',
      color: 'primary.500'
    }
  }
}
