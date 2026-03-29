import { FC, UIEvent, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { SxProps, Theme } from '@mui/material/styles'

import { LanguagesEnum } from '~/types'
import { styles } from '~/components/language-select-dropdowwn/LanguageSelectDropdown.styles'

const BATCH_SIZE = 6

const DEFAULT_LANGUAGES = Object.values(LanguagesEnum)

interface LanguageSelectDropdownProps {
  value: string | null
  onChange: (language: string | null) => void
  languages?: string[]
  placeholder?: string
  sx?: SxProps<Theme>
  disabled?: boolean
}

const LanguageSelectDropdown: FC<LanguageSelectDropdownProps> = ({
  value,
  onChange,
  languages = DEFAULT_LANGUAGES,
  placeholder = 'Your native language',
  sx,
  disabled = false
}) => {
  const [searchText, setSearchText] = useState('')
  const [howManyToShow, setHowManyToShow] = useState(BATCH_SIZE)

  const query = searchText.trim().toLowerCase()

  const allMatches: string[] = []
  for (let i = 0; i < languages.length; i++) {
    const name = languages[i]
    if (name.toLowerCase().includes(query)) {
      allMatches.push(name)
    }
  }

  const optionsForDropdown = allMatches.slice(0, howManyToShow)

  const onListScroll = (event: UIEvent<HTMLUListElement>) => {
    const el = event.currentTarget
    const distanceFromBottom =
      el.scrollHeight - (el.scrollTop + el.clientHeight)
    const isNearBottom = distanceFromBottom < 10

    if (isNearBottom && howManyToShow < allMatches.length) {
      setHowManyToShow(howManyToShow + BATCH_SIZE)
    }
  }

  return (
    <Autocomplete
      ListboxProps={{
        onScroll: onListScroll,
        sx: styles.listbox
      }}
      disablePortal
      disabled={disabled}
      filterOptions={(list) => list}
      inputValue={searchText}
      isOptionEqualToValue={(option, item) => option === item}
      onChange={(_, item) => {
        onChange(item)
      }}
      onInputChange={(_event, newText) => {
        setSearchText(newText)
        setHowManyToShow(BATCH_SIZE)
      }}
      options={optionsForDropdown}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} />
      )}
      sx={{ ...styles.root, ...sx }}
      value={value}
    />
  )
}

export default LanguageSelectDropdown
