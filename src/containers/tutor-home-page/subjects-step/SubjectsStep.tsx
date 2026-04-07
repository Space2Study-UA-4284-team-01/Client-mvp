import { useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, FormHelperText, Typography } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'
import CategorySubjectSelect from '~/components/category-subject-select/CategorySubjectSelect'
import SubjectStepperChips from '~/components/subject-stepper-chips/SubjectStepperChips'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { tutor } from '~/constants'
import { SubjectNameInterface } from '~/types'
import type { CategoryOption } from '~/components/category-subject-select/CategorySubjectSelect'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

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
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null)
  const [subject, setSubject] = useState<string>('')

  //TODO: Remove after step context refactored to typescript
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { stepData, handleStepData } = useStepContext()
  const currentSubjects =
    (stepData as Record<string, SubjectNameInterface[]>)[stepLabel] ?? []

  const subjectNames = currentSubjects.map((s) => s.name)

  const addSubject = () => {
    if (!selectedCategory || !subject) {
      setSubjectError(t(`${namespace}.categories.emptyFields`))
      return
    }

    const isSameSubject = currentSubjects.some((s) => s.name === subject)

    if (isSameSubject) {
      setSubjectError(t(`${namespace}.categories.sameSubject`))
      return
    }

    const nextSubjects: SubjectNameInterface[] = [
      ...currentSubjects,
      { _id: subject, name: subject }
    ]

    //TODO: Remove after step context refactored to typescript
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    handleStepData(stepLabel, nextSubjects)
    setSubjectError('')
    setSubject('')
  }

  const removeSubject = (name: string) => {
    const updated = currentSubjects.filter((s) => s.name !== name)
    //TODO: Remove after step context refactored to typescript
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    handleStepData(stepLabel, updated)
  }

  const imageContainer = (
    <Box sx={styles.imgContainer}>
      <Box alt='' component='img' src={img} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageContainer}
      <Box sx={styles.rightBox}>
        {isMobile && imageContainer}
        <Box sx={styles.contentBox}>
          <Typography>{t(`${namespace}.categories.title`)}</Typography>
          <CategorySubjectSelect
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSubject={setSubject}
            subject={subject}
          />
          <Button fullWidth onClick={addSubject} variant='tonal'>
            {t(`${namespace}.categories.btnText`)}
          </Button>
          <SubjectStepperChips
            handleDeleteSubject={removeSubject}
            subjects={subjectNames}
          />
          <FormHelperText error={!!subjectError}>{subjectError}</FormHelperText>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
