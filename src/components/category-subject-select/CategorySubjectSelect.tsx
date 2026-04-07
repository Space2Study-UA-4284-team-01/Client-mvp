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

const categoryOptions = [
  { value: 'mathematics', label: 'Mathematics', category: 'Mathematics' },
  { value: 'marketing', label: 'Marketing Strategy', category: 'Marketing' },
  { value: 'music', label: 'Marimba', category: 'Music' },
  { value: 'design', label: 'Motion Design', category: 'Design' },
  { value: 'management', label: 'Product Management', category: 'Management' },
  {
    value: 'higher-mathematics',
    label: 'Higher Mathematics',
    category: 'Mathematics'
  }
]

const subjectOptionsMap: Record<string, string[]> = {
  mathematics: [
    'Botany',
    'Biochemistry',
    'Genetics',
    'Anatomy',
    'SAT',
    'Zoology'
  ],
  marketing: ['Marketing Strategy', 'Branding', 'SMM'],
  music: ['Marimba', 'Piano', 'Guitar'],
  design: ['Motion Design', 'UI Design', 'Graphic Design'],
  management: ['Product Management', 'Project Management'],
  'higher-mathematics': ['Algebra', 'Geometry', 'Calculus']
}

export interface CategoryOption {
  value: string
  label: string
  category: string
}

interface CategorySubjectSelectProps {
  selectedCategory: CategoryOption | null
  subject: string
  setSelectedCategory: Dispatch<SetStateAction<CategoryOption | null>>
  setSubject: Dispatch<SetStateAction<string>>
}

const CategorySubjectSelect = ({
  selectedCategory,
  subject,
  setSelectedCategory,
  setSubject
}: CategorySubjectSelectProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSubjectOpen, setIsSubjectOpen] = useState(false)

  const subjectOptions = useMemo(() => {
    if (!selectedCategory) return []
    return subjectOptionsMap[selectedCategory.value] ?? []
  }, [selectedCategory])

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
        {subjectOptions.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>
    </>
  )
}

export default CategorySubjectSelect
