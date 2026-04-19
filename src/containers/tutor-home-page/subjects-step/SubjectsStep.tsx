import { useState, useCallback, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import { useStepContext } from '~/context/step-context'
import CategorySubjectSelect, {
  CategoryOption
} from '~/components/category-subject-select/CategorySubjectSelect'
import SubjectStepperChips from '~/components/subject-stepper-chips/SubjectStepperChips'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { tutor, defaultResponses } from '~/constants'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import type { CategoryNameInterface, SubjectNameInterface } from '~/types'

interface SubjectsStepProps {
  btnsBox?: ReactNode
  stepLabel: string
  userRole: string
}

const SubjectsStep = ({ btnsBox, stepLabel, userRole }: SubjectsStepProps) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const namespace = userRole === tutor ? 'becomeTutor' : 'becomeStudent'

  const { stepData, handleStepData } = useStepContext() as {
    stepData: Record<string, SubjectNameInterface[]>
    handleStepData: (label: string, value: SubjectNameInterface[]) => void
  }
  const currentSubjects: SubjectNameInterface[] = stepData[stepLabel] ?? []

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null)
  const [subject, setSubject] = useState('')
  const [subjectError, setSubjectError] = useState('')

  const { response: categories } = useAxios<CategoryNameInterface[]>({
    service: categoryService.getCategoriesNames,
    defaultResponse: defaultResponses.array
  })

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(selectedCategory?.value ?? null),
    [selectedCategory]
  )

  const { response: subjectNames } = useAxios<SubjectNameInterface[]>({
    service: getSubjectsNames,
    defaultResponse: defaultResponses.array,
    fetchOnMount: Boolean(selectedCategory)
  })

  useEffect(() => {
    setSubject('')
  }, [selectedCategory])

  const addSubject = () => {
    if (!selectedCategory || !subject) {
      setSubjectError(t(`${namespace}.categories.emptyFields`))
      return
    }
    if (currentSubjects.some((s) => s.name === subject)) {
      setSubjectError(t(`${namespace}.categories.sameSubject`))
      return
    }
    handleStepData(stepLabel, [
      ...currentSubjects,
      { _id: subject, name: subject }
    ])
    setSubject('')
    setSubjectError('')
  }

  const removeSubject = (name: string) => {
    handleStepData(
      stepLabel,
      currentSubjects.filter((s) => s.name !== name)
    )
  }

  const image = (
    <Box sx={styles.imgContainer}>
      <Box alt='' component='img' src={img} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && image}
      <Box sx={styles.rightBox}>
        {isMobile && image}
        <Box sx={styles.contentBox}>
          <Typography>{t(`${namespace}.categories.title`)}</Typography>
          <CategorySubjectSelect
            categories={categories}
            onCategoryChange={(value) => {
              setSelectedCategory(value)
              setSubjectError('')
            }}
            onSubjectChange={(value) => {
              setSubject(value)
              setSubjectError('')
            }}
            selectedCategory={selectedCategory}
            subject={subject}
            subjects={subjectNames.map((s) => s.name)}
          />
          <Button fullWidth onClick={addSubject} variant='tonal'>
            {t(`${namespace}.categories.btnText`)}
          </Button>
          <SubjectStepperChips
            handleDeleteSubject={removeSubject}
            subjects={currentSubjects.map((s) => s.name)}
          />
          {subjectError && (
            <FormHelperText error>{subjectError}</FormHelperText>
          )}
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
