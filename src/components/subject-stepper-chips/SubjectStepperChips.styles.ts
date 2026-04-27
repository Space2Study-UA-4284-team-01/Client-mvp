const chipsBase = {
  backgroundColor: 'basic.grey',
  color: 'primary.700',
  typography: 'subtitle2',
  borderRadius: '10px',
  height: 'fit-content',
  '& .MuiChip-label': {
    p: '7px 14px',
    display: 'block',
    whiteSpace: 'normal',
    cursor: 'pointer'
  }
} as const

export const styles = {
  chipsWrapper: {
    display: 'flex',
    direction: 'row',
    gap: '10px',
    flexWrap: 'wrap',
    maxHeight: '130px',
    overflowX: 'auto'
  },
  chip: chipsBase,
  moreChip: chipsBase
} as const
