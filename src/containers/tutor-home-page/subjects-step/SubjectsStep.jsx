import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { Button, FormHelperText, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useMemo, useState } from 'react'
import { categoryService } from '~/services/category-service'
import { useStepContext } from '~/context/step-context'
import AppChipList from '~/components/app-chips-list/AppChipList'
import useBreakpoints from '~/hooks/use-breakpoints'
import { subjectService } from '~/services/subject-service'
import { mockGetCategories } from './constants'
import { mockGetSubjects } from './constants'

const USE_MOCK = true

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const [subjectError, setSubjectError] = useState()
  const [subjects, setSubjects] = useState({
    category: null,
    subject: null
  })
  const { stepData, handleStepData } = useStepContext()
  const subjectNames = stepData.subjects.map((subject) => subject.name)

  const categoryServiceFn = USE_MOCK
    ? mockGetCategories
    : categoryService.getCategoriesNames

  const categoryId = subjects.category?._id
  const subjectsServiceFn = useMemo(
    () =>
      USE_MOCK
        ? mockGetSubjects(categoryId)
        : subjectService.getSubjectsNames(categoryId),
    [categoryId]
  )

  const onChangeCategory = (_, value) => {
    setSubjects((prev) =>
      prev.category?._id !== value?._id
        ? {
            category: value,
            subject: null
          }
        : prev
    )
  }

  const onChangeSubject = (_, value) => {
    setSubjects((prev) => ({ category: prev.category, subject: value }))
  }

  const addSubject = () => {
    if (!subjects.subject && !subjects.category) {
      setSubjectError(t('becomeTutor.categories.emptyFields'))
      return
    }

    const isSameSubject = stepData.subjects.some(
      (s) => s._id === subjects.subject?._id
    )

    if (isSameSubject) {
      setSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    }

    handleStepData('subjects', [...stepData.subjects, subjects.subject])
    setSubjectError(null)
    setSubjects({
      category: null,
      subject: null
    })
  }

  const removeSubject = (name) => {
    const updated = stepData.subjects.filter((subject) => subject.name !== name)
    handleStepData('subjects', updated)
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
            service={categoryServiceFn}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={subjects.category}
          />
          <AsyncAutocomplete
            disabled={!subjects.category}
            fetchCondition={!!subjects.category}
            labelField='name'
            onChange={onChangeSubject}
            service={subjectsServiceFn}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subjects.subject}
          />
          <Button fullWidth onClick={addSubject} variant='tonal'>
            {t('becomeTutor.categories.btnText')}
          </Button>
          <AppChipList
            defaultQuantity={4}
            handleChipDelete={removeSubject}
            items={subjectNames}
          />
          <FormHelperText error={subjectError}>{subjectError}</FormHelperText>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
