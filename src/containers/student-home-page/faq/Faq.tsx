import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const faqData = [
  {
    question: 'How to find a tutor',
    answer:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  },
  {
    question: 'How to book a lesson',
    answer:
      'Choose a tutor, pick a convenient time, and confirm your booking in a few clicks.'
  },
  {
    question: 'Rules for students',
    answer:
      'Students should follow platform rules, respect tutors, and attend lessons on time.'
  },
  {
    question: 'How you can pay for lessons',
    answer:
      'Payments are available via card and other supported methods on the platform.'
  }
]

const Faq = () => {
  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description='Everything you need to know about learning journey in Space2Study as a student.'
        style={styles.titleWithDescription}
        title='Frequently Asked Questions'
      />

      <Box sx={{ mt: 3 }}>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              boxShadow: 'none',
              border: 'none',
              borderRadius: '0px',
              mb: index === faqData.length - 1 ? 0 : 2,
              '&:before': { display: 'none' },
              '& .MuiAccordionSummary-root': {
                minHeight: 64,
                paddingY: 1.5
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={500}>{item.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

export default Faq
