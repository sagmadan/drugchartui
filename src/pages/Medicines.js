import { useState } from 'react'
import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import MedicineDetails from '../components/MedicineDetails'

const Medicines = () => {
    const [medicines, setMedicines] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/medicines', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            console.log(response)
            const json = await response.json()

            if (response.ok) {
                setMedicines(json)
            }
        }
        if (user) {
            fetchMedicines()
        }
    }, [])

    return (
        <div className="medicines">
            {medicines && medicines.map((medicine) => (
                <MedicineDetails key={medicine._id} medicine={medicine} />
            ))}
        </div>
    )
}

export default Medicines