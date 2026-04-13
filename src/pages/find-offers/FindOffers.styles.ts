export const styles = {
  popularCategoriesSection: {
    mt: '40px'
  },
  title: {
    typography: { xs: 'h4' },
    mb: '24px'
  },
  cardsGrid: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xs: 'repeat(1, minmax(264px, 1fr))',
      sm: 'repeat(2, minmax(264px, 1fr))',
      md: 'repeat(3, minmax(264px, 1fr))'
    },
    gridAutoRows: '112px',
    gridGap: '24px'
  },
  viewAllButton: {
    minWidth: '148px',
    display: 'block',
    mt: '32px',
    mx: 'auto'
  }
}
