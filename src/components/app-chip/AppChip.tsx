import { ReactNode, ReactElement } from 'react'

import { Chip, IconButton, SvgIconProps, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SxProps } from '@mui/system'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

interface AppChipProps {
  handleDelete?: () => void
  children: ReactNode
  icon?: ReactElement<SvgIconProps>
  sx?: SxProps
  labelSx?: SxProps
  bgColor?: string
  textColor?: string
}

const AppChip: React.FC<AppChipProps> = ({
  handleDelete,
  children,
  icon,
  sx,
  labelSx,
  bgColor,
  textColor
}) => {
  return (
    <Chip
      data-testid='chip'
      deleteIcon={
        handleDelete && (
          <IconButton
            data-testid='close-btn'
            size='small'
            sx={styles.deleteButton}
          >
            <CloseRoundedIcon fontSize='small' />
          </IconButton>
        )
      }
      icon={icon}
      label={
        <Typography
          sx={{
            color: textColor || '#1F2A37',
            typography: 'subtitle2',
            ...labelSx
          }}
        >
          {children}
        </Typography>
      }
      onDelete={handleDelete}
      sx={{
        ...styles.chip,
        backgroundColor: bgColor,
        ...sx
      }}
    />
  )
}

export default AppChip
