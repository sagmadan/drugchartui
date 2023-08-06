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
    // sagar todo : can use navigate here to redirect to login page once logged out
  }

  return { logout }
}