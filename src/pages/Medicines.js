import { useEffect } from 'react'
import { useMedicineContext } from "../hooks/useMedicineContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import MedicineDetails from '../components/MedicineDetails'
import MedicineForm from '../components/MedicineForm'

const Medicines = () => {
    const { medicines, dispatch } = useMedicineContext()
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
    }, [dispatch, user])

    return (
        <div className="bg-gray-50 px-5 py-3">
            <div>
                {<MedicineForm />}
            </div>
            <div className="mt-5 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Medicine List</h3>
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    {medicines && medicines.map((medicine) => (
                        <MedicineDetails key={medicine._id} medicine={medicine} />
                    ))}
                </dl>
            </div>
        </div >

    )
}

export default Medicines