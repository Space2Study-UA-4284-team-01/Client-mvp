import AttachFileIcon from '@mui/icons-material/AttachFile'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { getFormattedDate } from '~/utils/helper-functions'
import { Attachment, RemoveColumnRules } from '~/types'

export const columns = [
  {
    label: 'myResourcesPage.attachments.title',
    field: 'fileName',
    calculatedCellValue: (attachment: Attachment) => (
      <IconExtensionWithTitle
        icon={<AttachFileIcon />}
        title={attachment.fileName}
      />
    )
  },
  {
    label: 'myResourcesPage.attachments.updated',
    field: 'updatedAt',
    calculatedCellValue: (attachment: Attachment) =>
      getFormattedDate({ date: attachment.updatedAt })
  }
]

export const removeColumnRules: RemoveColumnRules<Attachment> = {
  tablet: ['myResourcesPage.attachments.updated']
}
