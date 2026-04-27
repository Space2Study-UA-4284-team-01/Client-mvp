import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    py: '80px'
  },
  icon: {
    width: '100px',
    height: '100px'
  },
  title: {
    typography: TypographyVariantEnum.H5,
    fontWeight: 600,
    color: 'primary.600'
  },
  description: {
    typography: TypographyVariantEnum.Body1,
    color: 'primary.500',
    textAlign: 'center',
    maxWidth: '480px'
  }
}
