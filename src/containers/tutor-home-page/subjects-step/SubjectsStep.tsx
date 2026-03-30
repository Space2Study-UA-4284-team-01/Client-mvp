import { useState, ReactNode, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, FormHelperText, Typography } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'

// TODO: Replace mockGetCategories with categoryService.getCategoriesNames when auth is ready
// import { subjectService } from '~/services/subject-service'
// TODO: Replace mockGetSubjects with subjectService.getSubjectsNames when auth is ready
// import { categoryService } from '~/services/category-service'
import { useStepContext } from '~/context/step-context'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppChipList from '~/components/app-chips-list/AppChipList'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

import { mockGetCategories, mockGetSubjects } from './constants'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'
import { tutor } from '~/constants'

interface SubjectsStepProps {
  btnsBox?: ReactNode
  stepLabel: string
  userRole: string
}

const SubjectsStep = ({ btnsBox, stepLabel, userRole }: SubjectsStepProps) => {
  const { t } = useTranslation()
  const namespace = userRole === tutor ? 'becomeTutor' : 'becomeStudent'
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const [subjectError, setSubjectError] = useState<string>('')
  const [subjects, setSubjects] = useState<{
    category: CategoryNameInterface | null
    subject: SubjectNameInterface | null
  }>({
    category: null,
    subject: null
  })

  //TODO: Remove after step context refactored to typescript
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { stepData, handleStepData } = useStepContext()
  const currentSubjects =
    (stepData as Record<string, SubjectNameInterface[]>)[stepLabel] ?? []

  const subjectNames = currentSubjects.map((s) => s.name)

  //TODO: Replace mockGetCategories with categoryService.getCategoriesNames when auth is ready
  // const getCategoriesNames = categoryService.getCategoriesNames

  const categoryId = subjects.category?._id
  // TODO:
  // const getSubjectsNames = useCallback(
  //   () => subjectService.getSubjectsNames(category),
  //   [category]
  // )

  const onChangeCategory = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setSubjects((prev) =>
      prev.category?._id === value?._id
        ? prev
        : { category: value, subject: null }
    )
  }

  const onChangeSubject = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    setSubjects((prev) => ({ category: prev.category, subject: value }))
  }

  const addSubject = () => {
    if (!subjects.subject || !subjects.category) {
      setSubjectError(t(`${namespace}.categories.emptyFields`))
      return
    }

    const isSameSubject = currentSubjects.some(
      (s) => s._id === subjects.subject?._id
    )

    if (isSameSubject) {
      setSubjectError(t(`${namespace}.categories.sameSubject`))
      return
    }

    //TODO: Remove after step context refactored to typescript
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    handleStepData(stepLabel, [...currentSubjects, subjects.subject])
    setSubjectError('')
    setSubjects({ category: null, subject: null })
  }

  const removeSubject = (name: string) => {
    const updated = currentSubjects.filter((s) => s.name !== name)
    //TODO: Remove after step context refactored to typescript
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    handleStepData(stepLabel, updated)
  }

  const imageContainer = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageContainer}
      <Box sx={styles.rightBox}>
        {isMobile && imageContainer}
        <Box sx={styles.contentBox}>
          <Typography>{t(`${namespace}.categories.title`)}</Typography>
          <AsyncAutocomplete
            labelField='name'
            onChange={onChangeCategory}
            service={mockGetCategories}
            /* TODO: Wrap getSubjectsNames in useCallback with categoryId as dependency to avoid unnecessary refetches  */
            /*service={getCategoriesNames}*/
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
            service={mockGetSubjects(categoryId)}
            /* TODO: Remove mock imports from ./constants once real services are connected  */
            /*service={getSubjectsNames}*/
            textFieldProps={{
              label: t(`${namespace}.categories.subjectLabel`)
            }}
            value={subjects.subject?._id ?? null}
            valueField='_id'
          />
          <Button fullWidth onClick={addSubject} variant='tonal'>
            {t(`${namespace}.categories.btnText`)}
          </Button>
          <AppChipList
            defaultQuantity={4}
            handleChipDelete={removeSubject}
            items={subjectNames}
          />
          <FormHelperText error={!!subjectError}>{subjectError}</FormHelperText>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
