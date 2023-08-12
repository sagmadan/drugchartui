import { useMedicineContext } from "../hooks/useMedicineContext"

// components
import MedicineDetails from '../components/MedicineDetails'
import MedicineForm from '../components/MedicineForm'

const Medicines = () => {
    const { medicinesMap } = useMedicineContext()
    return (
        <div className="min-h-screen bg-gray-50 px-5 py-3">
            <div>
                {<MedicineForm />}
            </div>
            <div className="mt-5 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Medicine List</h3>
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    {medicinesMap && Array.from(medicinesMap)
                        .sort((a, b) => a[1].name.localeCompare(b[1].name))
                        .map(([key, value]) => (
                            <MedicineDetails key={key} medicine={value} />
                        ))}
                </dl>
            </div>
        </div >
    )
}

export default Medicines