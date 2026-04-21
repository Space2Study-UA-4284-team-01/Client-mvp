import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { validationData } from './constants'
import { imageResize } from '~/utils/image-resize'
import { useRef, useState } from 'react'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [photoError, setPhotoError] = useState('')
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const jobId = useRef(0)

  const photo = stepData.photo

  const handleAddPhoto = async ({ files, error }) => {
    if (error) {
      setPhotoError(error)
      return
    }

    setPhotoError('')

    if (!files.length || files[0].src) {
      handleStepData('photo', files)
      return
    }

    const myJob = ++jobId.current
    const photoPath = URL.createObjectURL(files[0])
    try {
      const resizedPhoto = await imageResize(photoPath, {
        newWidth: 440,
        newHeight: 440
      })
      if (myJob === jobId.current) {
        handleStepData('photo', [{ name: files[0].name, src: resizedPhoto }])
      }
    } finally {
      URL.revokeObjectURL(photoPath)
    }
  }

  const photoPreview = photo?.length ? (
    <Box sx={style.imgContainer}>
      <Box alt='' component='img' src={photo[0].src} sx={style.img} />
    </Box>
  ) : (
    <DragAndDrop
      emitter={handleAddPhoto}
      initialState={photo}
      style={{
        root: style.imgContainer,
        uploadBox: style.uploadBox,
        activeDrag: style.activeDrag
      }}
      validationData={validationData}
    >
      <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
    </DragAndDrop>
  )

  return (
    <Box sx={style.root}>
      {isLaptopAndAbove && photoPreview}
      <Box sx={style.rigthBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={handleAddPhoto}
            initialError={photoError}
            initialState={photo}
            isImages
            sx={style.fileUploader}
            validationData={validationData}
          />
        </Box>
        {(isMobile || isTablet) && photoPreview}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
