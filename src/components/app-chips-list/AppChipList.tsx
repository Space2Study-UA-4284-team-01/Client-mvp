import { SvgIconProps, SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import AppChip from '~/components/app-chip/AppChip'
import AppPopover from '~/components/app-popover/AppPopover'

import { styles } from '~/components/app-chips-list/AppChipsList-styles'

type ChipItem = {
  label: string
  bgColor?: string
  textColor?: string
}

interface AppChipListProps {
  items: ChipItem[]
  defaultQuantity: number
  handleChipDelete?: (item: ChipItem) => void
  icon?: React.ReactElement<SvgIconProps>
  wrapperStyle?: SxProps
}

const AppChipList: React.FC<AppChipListProps> = ({
  items,
  defaultQuantity,
  handleChipDelete,
  icon,
  wrapperStyle
}) => {
  const hideChips =
    items.length - defaultQuantity > 0 && items.length - defaultQuantity

  const chips = items.map((item: ChipItem) => {
    return (
      <AppChip
        bgColor={item.bgColor}
        handleDelete={
          handleChipDelete ? () => handleChipDelete(item) : undefined
        }
        icon={icon}
        key={item.label}
        textColor={item.textColor}
      >
        {item.label}
      </AppChip>
    )
  })

  const initialItems = (
    <Box sx={styles.feature}>{chips.slice(0, defaultQuantity)}</Box>
  )

  const showMoreElem = hideChips && (
    <Chip
      data-testid='amount-of-chips'
      label={`+${hideChips}`}
      sx={styles.chip}
    />
  )

  return (
    <Box sx={wrapperStyle}>
      <AppPopover
        PaperProps={{ sx: styles.paperProps }}
        TransitionProps={{ timeout: 500 }}
        hideElem
        initialItems={initialItems}
        initialItemsWrapperStyle={styles.initialItemsWrapperStyle}
        showMoreElem={showMoreElem}
      >
        <Box sx={{ ...styles.feature, p: '15px 20px' }}>{chips}</Box>
      </AppPopover>
    </Box>
  )
}

export default AppChipList
