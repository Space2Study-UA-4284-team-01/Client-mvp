import {
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  ChangeEvent
} from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styles } from '~/components/category-subject-select/CategorySubjectSelect.styles'

export interface CategoryOption {
  value: string
  label: string
  category: string
}

interface CategorySubjectSelectProps {
  categories: string[]
  subjects: string[]
  selectedCategory: CategoryOption | null
  subject: string
  setSelectedCategory: Dispatch<SetStateAction<CategoryOption | null>>
  setSubject: Dispatch<SetStateAction<string>>
}

const CategorySubjectSelect = ({
  categories,
  subjects,
  selectedCategory,
  subject,
  setSelectedCategory,
  setSubject
}: CategorySubjectSelectProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)

  const categoryOptions: CategoryOption[] = useMemo(
    () =>
      categories.map((name) => ({ value: name, label: name, category: name })),
    [categories]
  )

  const handleCategoryChange = (
    _: SyntheticEvent,
    newValue: CategoryOption | null
  ) => {
    setSelectedCategory(newValue)
    setSubject('')
  }

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value)
  }

  return (
    <>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={handleCategoryChange}
        onClose={() => setIsCategoryOpen(false)}
        onOpen={() => setIsCategoryOpen(true)}
        open={isCategoryOpen}
        options={categoryOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: isCategoryOpen ? (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ fontSize: '18px' }} />
                </InputAdornment>
              ) : null
            }}
            label='Main Study Category'
            sx={styles.select}
          />
        )}
        renderOption={(props, option) => (
          <Box component='li' {...props} sx={styles.optionItem}>
            <Typography component='span' sx={styles.optionTitle}>
              {option.label}
            </Typography>
            <Typography component='span' sx={styles.optionCategory}>
              Category: {option.category}
            </Typography>
          </Box>
        )}
        sx={styles.autocomplete}
        value={selectedCategory}
      />

      <TextField
        InputProps={{
          startAdornment: isSubjectOpen ? (
            <InputAdornment position='start'>
              <SearchIcon sx={{ fontSize: '18px' }} />
            </InputAdornment>
          ) : null
        }}
        SelectProps={{
          open: isSubjectOpen,
          onOpen: () => setIsSubjectOpen(true),
          onClose: () => setIsSubjectOpen(false)
        }}
        disabled={!selectedCategory}
        fullWidth
        label='Subject'
        onChange={handleSubjectChange}
        select
        sx={styles.select}
        value={subject}
      >
        {subjects.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
    </>
  )
}

export default CategorySubjectSelect
