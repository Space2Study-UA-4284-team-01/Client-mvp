import { Box } from '@mui/system'
import { useState } from 'react'
import RoleSwitcher from '~/components/role-switcher/RoleSwitcher'
import { UserRoleEnum } from '~/types'

const FindOffers = () => {
  const userRole = UserRoleEnum.Tutor

  const [authorRole, setAuthorRole] = useState<UserRoleEnum>(() => userRole)

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <RoleSwitcher authorRole={authorRole} onChange={setAuthorRole} />
    </Box>
  )
}

export default FindOffers
