import {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  KeyboardEvent
} from 'react'
import { useTranslation } from 'react-i18next'

import { createFilterOptions, FilterOptionsState } from '@mui/material'
import {
  AutocompleteProps,
  AutocompleteRenderInputParams
} from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/search-autocomplete/SearchAutocomplete.styles'
import {
  SizeEnum,
  ButtonVariantEnum,
  VisibilityEnum,
  TextFieldVariantEnum
} from '~/types'

interface SearchAutocompleteProps
  extends Omit<AutocompleteProps<string, false, true, true>, 'renderInput'> {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  onSearchChange?: (value: string) => void
  textFieldProps: TextFieldProps
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
}

const SearchAutocomplete = ({
  search,
  setSearch,
  onSearchChange,
  textFieldProps,
  ...props
}: SearchAutocompleteProps) => {
  const [searchInput, setSearchInput] = useState<string>(search)

  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    const defaultOptions = createFilterOptions<string>()
    return defaultOptions(options, state).slice(0, 6)
  }

  const onInputChange = (_: SyntheticEvent, value: string) => {
    setSearchInput(value)
  }

  const handleAutoCompleteChange = (_: SyntheticEvent, value: string) => {
    onSearchChange?.(value)
    setSearch(value)
  }

  const onSearch = () => {
    if (searchInput !== search) {
      onSearchChange?.(searchInput)
    }
    setSearch(searchInput)
  }

  const onClear = () => {
    if (search) {
      onSearchChange?.('')
    }
    setSearchInput('')
    setSearch('')
  }

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  const labelStyle = {
    ...styles.inputLabel,
    visibility: searchInput ? VisibilityEnum.Hidden : VisibilityEnum.Visible
  }

  const clearIconVisibility = {
    visibility: searchInput ? VisibilityEnum.Visible : VisibilityEnum.Hidden
  }

  return (
    <Box sx={styles.container}>
      {!isMobile && <SearchIcon sx={styles.searchIcon} />}

      <AppAutoComplete
        filterOptions={filterOptions}
        freeSolo
        hideClearIcon
        inputValue={searchInput}
        onChange={handleAutoCompleteChange}
        onInputChange={onInputChange}
        sx={styles.autocomplete}
        textFieldProps={{
          InputLabelProps: { style: labelStyle, shrink: false },
          InputProps: { disableUnderline: true },
          onKeyDown: onEnterPress,
          variant: TextFieldVariantEnum.Standard,
          sx: styles.input,
          ...textFieldProps
        }}
        {...props}
      />

      <IconButton onClick={onClear} sx={clearIconVisibility}>
        <ClearIcon fontSize={SizeEnum.Small} />
      </IconButton>

      <Button
        onClick={onSearch}
        size={isMobile ? SizeEnum.Small : SizeEnum.Large}
        sx={styles.searchBtn}
        variant={ButtonVariantEnum.ContainedLight}
      >
        {isMobile ? <SearchIcon /> : t('common.search')}
      </Button>
    </Box>
  )
}

export default SearchAutocomplete
