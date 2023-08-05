import { createContext, useReducer } from 'react'

export const MedicineContext = createContext()

export const medicineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDICINES':
      return {
        medicines: action.payload
      }
    case 'CREATE_MEDICINES':
      return {
        medicines: [action.payload, ...state.medicines]
      }
    default:
      return state
  }
}

export const MedicinesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, {
    medicines: null
  })

  return (
    <MedicineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MedicineContext.Provider>
  )
}