import { useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useStepContext } from '~/context/step-context'
import CategorySubjectSelect from '~/components/category-subject-select/CategorySubjectSelect'
import SubjectStepperChips from '~/components/subject-stepper-chips/SubjectStepperChips'
import { tutor } from '~/constants'
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
    stepData: Record<string, unknown>
    handleStepData: (label: string, value: SubjectNameInterface[]) => void
  }

  const rawSubjects = stepData[stepLabel]
  const currentSubjects: SubjectNameInterface[] = Array.isArray(rawSubjects)
    ? rawSubjects.filter(
        (item): item is SubjectNameInterface =>
          typeof item === 'object' &&
          item !== null &&
          '_id' in item &&
          'name' in item
      )
    : []

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryNameInterface | null>(null)
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectNameInterface | null>(null)
  const [subjectError, setSubjectError] = useState('')

  const handleCategoryChange = (value: CategoryNameInterface | null) => {
    setSelectedCategory(value)
    setSelectedSubject(null)
    setSubjectError('')
  }

  const handleSubjectChange = (value: SubjectNameInterface | null) => {
    setSelectedSubject(value)
    setSubjectError('')
  }

  const addSubject = () => {
    if (!selectedCategory || !selectedSubject) {
      setSubjectError(t(`${namespace}.categories.emptyFields`))
      return
    }
    if (currentSubjects.some((s) => s._id === selectedSubject._id)) {
      setSubjectError(t(`${namespace}.categories.sameSubject`))
      return
    }
    handleStepData(stepLabel, [...currentSubjects, selectedSubject])
    setSelectedSubject(null)
    setSubjectError('')
  }

  const removeSubject = (id: string) => {
    handleStepData(
      stepLabel,
      currentSubjects.filter((s) => s._id !== id)
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
            onCategoryChange={handleCategoryChange}
            onSubjectChange={handleSubjectChange}
            selectedCategory={selectedCategory}
            subject={selectedSubject}
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
