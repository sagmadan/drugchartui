import { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export const MedicineContext = createContext()

export const medicineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICINES':
      return {
        medicinesMap: action.payload
      }
    case 'CREATE_MEDICINES':
      const medObj = action.payload
      state.medicinesMap.set(medObj._id, medObj);
      return {
        medicinesMap: state.medicinesMap
      }
    default:
      return state
  }
}

export const MedicinesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, {
    medicinesMap: new Map()
  })

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/medicines', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })

      const json = await response.json()

      const medicinesIdToObjMap = new Map(json.map(medicine => [medicine._id, medicine]))

      if (response.ok) {
        dispatch({ type: 'SET_MEDICINES', payload: medicinesIdToObjMap })
      }
    }
    if (user) {
      fetchMedicines()
    }
  }, [user])

  return (
    <MedicineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MedicineContext.Provider>
  )
}