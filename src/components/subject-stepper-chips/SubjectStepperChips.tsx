import { useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import { styles } from '~/components/subject-stepper-chips/SubjectStepperChips.styles'

export const MAX_VISIBLE_SUBJECTS = 2

interface SubjectStepperChipsProps {
  subjects: string[]
  handleDeleteSubject: (subject: string) => void
}

const SubjectStepperChips = ({
  subjects,
  handleDeleteSubject
}: SubjectStepperChipsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const { visibleSubjects, hiddenSubjectsCount } = useMemo(() => {
    const visible = isExpanded
      ? subjects
      : subjects.slice(0, MAX_VISIBLE_SUBJECTS)
    return {
      visibleSubjects: visible,
      hiddenSubjectsCount: Math.max(subjects.length - MAX_VISIBLE_SUBJECTS, 0)
    }
  }, [isExpanded, subjects])

  const handleToggleSubjects = () => setIsExpanded((prev) => !prev)

  return (
    <Box sx={styles.chipsWrapper}>
      {visibleSubjects.map((item) => (
        <Chip
          deleteIcon={<CloseIcon sx={{ fontSize: '12px' }} />}
          key={item}
          label={item}
          onDelete={() => handleDeleteSubject(item)}
          sx={styles.chip}
        />
      ))}

      {!isExpanded && hiddenSubjectsCount > 0 && (
        <Chip
          label={`+${hiddenSubjectsCount}`}
          onClick={handleToggleSubjects}
          sx={styles.moreChip}
        />
      )}

      {isExpanded && subjects.length > MAX_VISIBLE_SUBJECTS && (
        <Chip
          label='Hide'
          onClick={handleToggleSubjects}
          sx={styles.moreChip}
        />
      )}
    </Box>
  )
}

export default SubjectStepperChips
