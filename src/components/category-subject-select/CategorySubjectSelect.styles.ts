export const styles = {
  select: {
    '& .MuiOutlinedInput-root': {
      height: '48px',
      backgroundColor: '#f8fafb',
      borderRadius: '4px',

      '@media (min-width: 768px) and (max-width: 1199px)': {
        height: '52px'
      },

      '@media (min-width: 1200px)': {
        height: '54px'
      },

      '& fieldset': {
        borderColor: '#bcc9d3'
      },

      '&:hover fieldset': {
        borderColor: '#aebdc8'
      },

      '&.Mui-focused fieldset': {
        borderColor: '#9fb2bf'
      }
    },

    '& .MuiInputLabel-root': {
      fontSize: '14px',
      color: '#8a9ba8',
      transform: 'translate(14px, 13px) scale(1)',
      transition: 'transform 0.2s ease, color 0.2s ease',

      '@media (min-width: 768px) and (max-width: 1199px)': {
        fontSize: '15px',
        transform: 'translate(14px, 15px) scale(1)'
      },

      '@media (min-width: 1200px)': {
        transform: 'translate(14px, 16px) scale(1)'
      }
    },

    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)'
    },

    '& .MuiInputLabel-root.Mui-focused': {
      color: '#8a9ba8'
    },

    '& .MuiInputBase-input': {
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#263238',

      '@media (min-width: 768px) and (max-width: 1199px)': {
        fontSize: '15px'
      }
    },

    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      color: '#263238',

      '@media (min-width: 768px) and (max-width: 1199px)': {
        fontSize: '15px'
      }
    }
  },

  autocomplete: {
    '& .MuiAutocomplete-popupIndicator': {
      color: '#7f909c'
    },

    '& .MuiAutocomplete-clearIndicator': {
      display: 'none'
    }
  },

  optionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minHeight: '44px',

    '@media (min-width: 768px) and (max-width: 1199px)': {
      minHeight: '48px'
    },

    '@media (min-width: 1200px)': {
      gap: '10px',
      minHeight: '52px'
    }
  },

  optionTitle: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#263238',
    fontFamily: 'Inter, sans-serif',

    '@media (min-width: 768px) and (max-width: 1199px)': {
      fontSize: '15px'
    }
  },

  optionCategory: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#7b93a3',
    fontFamily: 'Inter, sans-serif',

    '@media (min-width: 768px) and (max-width: 1199px)': {
      fontSize: '15px'
    }
  }
}
