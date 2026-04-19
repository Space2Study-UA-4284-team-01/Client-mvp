import { SyntheticEvent } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { styles } from '~/components/category-subject-select/CategorySubjectSelect.styles'

export interface CategoryOption {
  value: string
  label: string
}

interface CategorySubjectSelectProps {
  categories: { _id: string; name: string }[]
  subjects: string[]
  selectedCategory: CategoryOption | null
  subject: string
  onCategoryChange: (value: CategoryOption | null) => void
  onSubjectChange: (value: string) => void
}

const CategorySubjectSelect = ({
  categories,
  subjects,
  selectedCategory,
  subject,
  onCategoryChange,
  onSubjectChange
}: CategorySubjectSelectProps) => {
  const categoryOptions: CategoryOption[] = Array.isArray(categories)
    ? categories.map((c) => ({ value: c._id, label: c.name }))
    : []

  return (
    <>
      <Autocomplete
        fullWidth
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(_: SyntheticEvent, value: CategoryOption | null) =>
          onCategoryChange(value)
        }
        options={categoryOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Main Study Category'
            sx={styles.select}
          />
        )}
        sx={styles.autocomplete}
        value={selectedCategory}
      />
      <TextField
        SelectProps={{
          onChange: (e) => onSubjectChange(e.target.value as string)
        }}
        disabled={!selectedCategory}
        fullWidth
        label='Subject'
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
