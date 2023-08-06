import { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export const MedicineContext = createContext()

export const medicineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICINES':
      return {
        medicines: action.payload
      }
    case 'CREATE_MEDICINES':
      return {
        medicines: [action.payload, ...state.medicines].sort((a, b) => {
          const na = a.name.toLowerCase()
          const nb = b.name.toLowerCase()
          if (na < nb) {
            return -1;
          }
          if (na > nb) {
            return 1;
          }
          return 0;
        })
      }
    default:
      return state
  }
}

export const MedicinesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, {
    medicines: null
  })

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch('/api/medicines', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })

      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_MEDICINES', payload: json })
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