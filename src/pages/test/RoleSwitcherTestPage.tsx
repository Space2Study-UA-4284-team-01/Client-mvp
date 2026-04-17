import { useState } from 'react'
import { UserRoleEnum } from '~/types'
import RoleSwitcher from '~/components/role-switcher/RoleSwitcher'
import Box from '@mui/material/Box'

const RoleSwitcherTestPage = () => {
  const userRole = UserRoleEnum.Tutor

  const [authorRole, setAuthorRole] = useState<UserRoleEnum>(() => userRole)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ display: 'inline-flex' }}>
        <RoleSwitcher authorRole={authorRole} onChange={setAuthorRole} />
      </Box>
    </Box>
  )
}

export default RoleSwitcherTestPage
