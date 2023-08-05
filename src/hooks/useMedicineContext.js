import { MedicineContext } from '../context/MedicineContext'
import { useContext } from 'react'

export const useMedicineContext = () => {
  const context = useContext(MedicineContext)

  if (!context) {
    throw Error('useMedicineContext must be used inside an MedicinesContextProvider')
  }

  return context
}