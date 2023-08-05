import { useState } from 'react'
import { useEffect } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useMedicineContext } from "../hooks/useMedicineContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import MedicineDetails from '../components/MedicineDetails'
import MedicineForm from '../components/MedicineForm'

const Medicines = () => {
    const { medicines, dispatch } = useMedicineContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleLogOutClick = () => {
        logout()
    }

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
    }, [])

    return (
        <div className="medicines">
            <div>
                {<MedicineForm />}
            </div>
            {medicines && medicines.map((medicine) => (
                <MedicineDetails key={medicine._id} medicine={medicine} />
            ))}
            <div>
                <button onClick={handleLogOutClick}>Logout</button>
            </div>
        </div>

    )
}

export default Medicines