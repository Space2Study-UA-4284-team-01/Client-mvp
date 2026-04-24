import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const faqKeys = [
  {
    question: 'studentHomePage.faq.findTutor',
    answer: 'studentHomePage.faq.findTutorDescription'
  },
  {
    question: 'studentHomePage.faq.bookLesson',
    answer: 'studentHomePage.faq.bookLessonDescription'
  },
  {
    question: 'studentHomePage.faq.rules',
    answer: 'studentHomePage.faq.rulesDescription'
  },
  {
    question: 'studentHomePage.faq.howPayLessons',
    answer: 'studentHomePage.faq.howPayLessonsDescription'
  }
]

const Faq = () => {
  const { t } = useTranslation()

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />

      <Box sx={{ mt: 3 }}>
        {faqKeys.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              boxShadow: 'none',
              border: 'none',
              borderRadius: '0px',
              mb: index === faqKeys.length - 1 ? 0 : 2,
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                minHeight: 64,
                paddingY: 1.5
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{t(item.question)}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>{t(item.answer)}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

export default Faq
