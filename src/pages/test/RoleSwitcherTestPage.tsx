import { useState } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import { getOpositeRole } from '~/utils/helper-functions'
import RoleSwitcher from '~/components/role-switcher/RoleSwitcher'

const RoleSwitcherTestPage = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const [authorRole, setAuthorRole] = useState<UserRoleEnum>(() =>
    getOpositeRole(userRole)
  )

  return <RoleSwitcher authorRole={authorRole} onChange={setAuthorRole} />
}

export default RoleSwitcherTestPage
