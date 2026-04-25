import { FC, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import { Offer } from '~/types'

interface Props {
  offer: Offer
  onClose: () => void
  onSubmit: (message: string) => void
}

const MessageForm: FC<Props> = ({ offer, onClose, onSubmit }) => {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    console.log('SEND MESSAGE:', {
      offerId: offer._id,
      text: message
    })

    onSubmit(message)
    onClose()
  }

  return (
    <Box sx={{ width: 400 }}>
      <Typography mb={2} variant='h6'>
        Message to {offer.author.firstName}
      </Typography>

      <TextField
        fullWidth
        multiline
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Write your message...'
        rows={4}
        value={message}
      />

      <Box display='flex' gap={2} mt={2}>
        <AppButton fullWidth onClick={handleSend}>
          Send
        </AppButton>

        <AppButton fullWidth onClick={onClose} variant='outlined'>
          Cancel
        </AppButton>
      </Box>
    </Box>
  )
}

export default MessageForm
