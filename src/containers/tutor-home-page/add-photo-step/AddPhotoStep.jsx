import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { validationData } from './constants'
import { imageResize } from '~/utils/image-resize'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isTablet, isMobile } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()

  const photo = stepData.photo

  const addPhoto = async ({ files }) => {
    if (files.length && !files[0].src) {
      await resizePhoto(files[0])
    } else {
      handleStepData('photo', files)
    }
  }

  const handleAddPhoto = async (photo) => {
    await addPhoto(photo)
  }

  const resizePhoto = async (file) => {
    const photoPath = URL.createObjectURL(file)
    const photoSizes = { newWidth: 440, newHeight: 440 }
    const resizedPhoto = await imageResize(photoPath, photoSizes)
    const photoName = file.name

    handleStepData('photo', [
      {
        name: photoName,
        src: resizedPhoto
      }
    ])
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
