// Sagar pending
import { useAuthContext } from './useAuthContext'
import { useMedicineContext } from './useMedicineContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchMedicines } = useMedicineContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchMedicines({ type: 'SET_MEDICINES', payload: null })
  }

  return { logout }
}