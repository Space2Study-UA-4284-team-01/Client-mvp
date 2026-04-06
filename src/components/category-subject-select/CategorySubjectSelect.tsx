import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'

interface CategorySubjectSelectProps {
  namespace: string
  subjects: {
    category: CategoryNameInterface | null
    subject: SubjectNameInterface | null
  }
  onChangeCategory: (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => void
  onChangeSubject: (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => void
  categoryService: () => Promise<{ data: CategoryNameInterface[] }>
  subjectService: () => Promise<{ data: SubjectNameInterface[] }>
}

const CategorySubjectSelect = ({
  namespace,
  subjects,
  onChangeCategory,
  onChangeSubject,
  categoryService,
  subjectService
}: CategorySubjectSelectProps) => {
  const { t } = useTranslation()

  return (
    <>
      <AsyncAutocomplete
        labelField='name'
        onChange={onChangeCategory}
        service={categoryService}
        textFieldProps={{
          label: t(`${namespace}.categories.mainSubjectsLabel`)
        }}
        value={subjects.category?._id ?? null}
        valueField='_id'
      />
      <AsyncAutocomplete
        disabled={!subjects.category}
        fetchCondition={!!subjects.category}
        labelField='name'
        onChange={onChangeSubject}
        service={subjectService}
        textFieldProps={{
          label: t(`${namespace}.categories.subjectLabel`)
        }}
        value={subjects.subject?._id ?? null}
        valueField='_id'
      />
    </>
  )
}

export default CategorySubjectSelect
