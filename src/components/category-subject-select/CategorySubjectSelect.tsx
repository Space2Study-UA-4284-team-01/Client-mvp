import { SyntheticEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import type { CategoryNameInterface, SubjectNameInterface } from '~/types'
import { styles } from '~/components/category-subject-select/CategorySubjectSelect.styles'

export type CategoryOption = CategoryNameInterface

interface CategorySubjectSelectProps {
  selectedCategory: CategoryOption | null
  subject: SubjectNameInterface | null
  onCategoryChange: (value: CategoryOption | null) => void
  onSubjectChange: (value: SubjectNameInterface | null) => void
}

const unwrapData = <T,>(response: T[] | { data: T[] }): T[] =>
  Array.isArray(response) ? response : response.data ?? []

const CategorySubjectSelect = ({
  selectedCategory,
  subject,
  onCategoryChange,
  onSubjectChange
}: CategorySubjectSelectProps) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  const translationKey =
    userRole === UserRoleEnum.Student ? 'becomeStudent' : 'becomeTutor'

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(selectedCategory?._id ?? null),
    [selectedCategory?._id]
  )

  const handleCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    onCategoryChange(value)
  }

  const handleSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    onSubjectChange(value)
  }

  return (
    <>
      <AsyncAutocomplete<CategoryNameInterface>
        axiosProps={{ transform: unwrapData }}
        fullWidth
        labelField='name'
        onChange={handleCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t(`${translationKey}.categories.mainSubjectsLabel`)
        }}
        value={selectedCategory?._id ?? null}
        valueField='_id'
      />
      <AsyncAutocomplete<SubjectNameInterface>
        axiosProps={{ transform: unwrapData }}
        disabled={!selectedCategory}
        fetchCondition={Boolean(selectedCategory)}
        fetchOnFocus
        fullWidth
        key={selectedCategory?._id ?? 'no-category'}
        labelField='name'
        onChange={handleSubjectChange}
        service={getSubjectsNames}
        sx={styles.autocomplete}
        textFieldProps={{
          label: t(`${translationKey}.categories.subjectLabel`)
        }}
        value={subject?._id ?? null}
        valueField='_id'
      />
    </>
  )
}

export default CategorySubjectSelect
