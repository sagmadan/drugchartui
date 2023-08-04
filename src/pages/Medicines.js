import { useState } from 'react'
import { useEffect }from 'react'

// components
import MedicineDetails from '../components/MedicineDetails'

const Medicines = () => {
    const [medicines, setMedicines] = useState(null);

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/medicines')
            console.log(response)
            const json = await response.json()

            if (response.ok) {
                setMedicines(json)
            }
        }
        fetchMedicines()
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