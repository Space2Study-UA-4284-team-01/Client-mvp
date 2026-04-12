import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'
import { useStepContext } from '~/context/step-context'
import { userService } from '~/services/user-service'
import { type UserGeneralInfo, type UserResponse, type UserRole } from '~/types'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import Loader from '~/components/loader/Loader'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'
import { validations } from '~/components/user-steps-wrapper/constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

interface GeneralInfoStepProps {
  btnsBox?: React.ReactNode
}

const GeneralInfoStep: React.FC<GeneralInfoStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { stepData, handleStepData } = useStepContext()
  const isProfileSynced = useRef(false)

  const getUserProfile = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { loading, response } = useAxios<UserResponse>({
    service: getUserProfile,
    fetchOnMount: Boolean(userId && userRole),
    defaultResponse: null as unknown as UserResponse
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const generalInfo = stepData.generalInfo as {
    data: UserGeneralInfo
    errors: Record<string, string>
  }

  const {
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    handleErrors,
    data,
    errors
  } = useForm<UserGeneralInfo>({
    initialValues: generalInfo?.data ?? {
      firstName: '',
      lastName: '',
      country: null,
      city: null,
      professionalSummary: '',
      isConfirmed: false
    },
    validations
  })

  const hasPersistedGeneralInfo = Boolean(
    generalInfo?.data?.firstName ||
    generalInfo?.data?.lastName ||
    generalInfo?.data?.country ||
    generalInfo?.data?.city ||
    generalInfo?.data?.professionalSummary ||
    generalInfo?.data?.isConfirmed
  )
  useEffect(() => {
    if (!response?._id || isProfileSynced.current || hasPersistedGeneralInfo) {
      return
    }
    handleNonInputValueChange('firstName', response.firstName ?? '')
    handleNonInputValueChange('lastName', response.lastName ?? '')
    const country = response.address?.country?.trim() || null
    const city = response.address?.city?.trim() || null
    if (country) {
      handleNonInputValueChange('country', country)
    }
    if (city && country) {
      handleNonInputValueChange('city', city)
    }
    if (response.professionalSummary) {
      handleNonInputValueChange(
        'professionalSummary',
        response.professionalSummary
      )
    }
    isProfileSynced.current = true
  }, [response, handleNonInputValueChange, hasPersistedGeneralInfo])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    handleStepData('generalInfo', data, errors)
  }, [data, errors, handleStepData])

  useEffect(() => {
    handleErrors(
      'isConfirmed',
      data.isConfirmed ? '' : 'becomeTutor.generalInfo.confirmAgeError'
    )
  }, [data.isConfirmed, handleErrors])

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Loader />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box component='form' sx={styles.form}>
        <Typography mb='20px'>{t('becomeTutor.generalInfo.title')}</Typography>
        {isMobile && (
          <Box sx={styles.imgContainer}>
            <Box component='img' src={img} sx={styles.img} />
          </Box>
        )}
        <Box
          mt='20px'
          sx={isMobile ? styles.mobileFields : styles.nameContainer}
        >
          <AppTextField
            autoFocus
            errorMsg={t(errors.firstName)}
            fullWidth
            label={t('common.labels.firstName')}
            onBlur={handleBlur('firstName')}
            onChange={handleInputChange('firstName')}
            required
            sx={{ mb: '5px' }}
            type='text'
            value={data.firstName}
          />
          <AppTextField
            errorMsg={t(errors.lastName)}
            fullWidth
            label={t('common.labels.lastName')}
            onBlur={handleBlur('lastName')}
            onChange={handleInputChange('lastName')}
            required
            sx={{ mb: '5px' }}
            type='text'
            value={data.lastName}
          />
        </Box>
        <Box
          sx={isMobile ? styles.mobileLocationFields : styles.locationContainer}
        >
          <LocationSelectionInputs
            data={data}
            onDataChange={handleNonInputValueChange}
            sx={isMobile ? undefined : { flex: 1 }}
          />
        </Box>
        <AppTextArea
          fullWidth
          label={t('becomeTutor.generalInfo.textFieldLabel')}
          maxLength={200}
          onChange={handleInputChange('professionalSummary')}
          sx={{ mt: '30px' }}
          type='text'
          value={data.professionalSummary}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.isConfirmed}
              onChange={(e) =>
                handleNonInputValueChange('isConfirmed', e.target.checked)
              }
            />
          }
          label={t('becomeTutor.generalInfo.confirmAge')}
          sx={{ mt: '8px' }}
        />
        <Typography variant='caption'>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
