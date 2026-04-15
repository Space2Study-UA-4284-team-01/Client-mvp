import { SwitchOptions, UserRoleEnum } from '~/types'
import { getOpositeRole } from '~/utils/helper-functions'
import AppContentSwitcher from '../app-content-switcher/AppContentSwitcher'
import { useTranslation } from 'react-i18next'

interface RoleSwitcherProps {
  authorRole: UserRoleEnum
  onChange: (role: UserRoleEnum) => void
}

const RoleSwitcher = ({ authorRole, onChange }: RoleSwitcherProps) => {
  const { t } = useTranslation()

  const switchRoleOptions: SwitchOptions = {
    left: { text: t('topMenu.tutorsOffers') },
    right: { text: t('topMenu.studentsRequests') }
  }

  const handleChangeRole = () => {
    onChange(getOpositeRole(authorRole))
  }

  return (
    <AppContentSwitcher
      active={authorRole === UserRoleEnum.Tutor}
      onChange={handleChangeRole}
      switchOptions={switchRoleOptions}
      typographyVariant='inherit'
    />
  )
}

export default RoleSwitcher
