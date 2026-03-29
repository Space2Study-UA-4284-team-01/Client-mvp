import { useState, ReactNode, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, FormHelperText, Typography } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'

//TODO:
// import { subjectService } from '~/services/subject-service'
//TODO:
// import { categoryService } from '~/services/category-service'
import { useStepContext } from '~/context/step-context'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppChipList from '~/components/app-chips-list/AppChipList'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

import { mockGetCategories } from './constants'
import { mockGetSubjects } from './constants'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'

interface SubjectsStepProps {
  btnsBox?: ReactNode
  stepLabel: string
}

const SubjectsStep = ({ btnsBox, stepLabel }: SubjectsStepProps) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const [subjectError, setSubjectError] = useState<string>('')
  const [subjects, setSubjects] = useState<{
    category: CategoryNameInterface | null
    subject: SubjectNameInterface | null
  }>({
    category: null,
    subject: null
  })

  const { stepData, handleStepData } = useStepContext()
  const stepDataByLabel = stepData as unknown as Record<
    string,
    SubjectNameInterface[] | undefined
  >
  const currentSubjects = stepDataByLabel[stepLabel] ?? []

  const subjectNames = currentSubjects.map((s) => s.name)

  //TODO:
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
      prev.category?._id !== value?._id
        ? { category: value, subject: null }
        : prev
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
      setSubjectError(t('becomeTutor.categories.emptyFields'))
      return
    }

    const isSameSubject = currentSubjects.some(
      (s) => s._id === subjects.subject?._id
    )

    if (isSameSubject) {
      setSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    }

    handleStepData(stepLabel, [...currentSubjects, subjects.subject])
    setSubjectError('')
    setSubjects({ category: null, subject: null })
  }

  const removeSubject = (name: string) => {
    const updated = currentSubjects.filter((s) => s.name !== name)
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
          <Typography>{t('becomeTutor.categories.title')}</Typography>
          <AsyncAutocomplete
            labelField='name'
            onChange={onChangeCategory}
            service={mockGetCategories}
            /* TODO:  */
            /*service={getCategoriesNames}*/
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
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
            /* TODO:  */
            /*service={getSubjectsNames}*/
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subjects.subject?._id ?? null}
            valueField='_id'
          />
          <Button fullWidth onClick={addSubject} variant='tonal'>
            {t('becomeTutor.categories.btnText')}
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
