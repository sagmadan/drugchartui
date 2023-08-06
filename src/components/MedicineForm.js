// Sagar pending
import { useState } from "react"
import { useMedicineContext } from "../hooks/useMedicineContext"
import { useAuthContext } from '../hooks/useAuthContext'

const MedicineForm = () => {
    const { dispatch } = useMedicineContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [concentration, setConcentration] = useState('')
    const [unit, setUnit] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const medicine = { name, concentration, unit }

        const response = await fetch('/api/medicines', {
            method: 'POST',
            body: JSON.stringify(medicine),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setConcentration('')
            setUnit('')
            setError(null)
            dispatch({ type: 'CREATE_MEDICINES', payload: json })
        }
    }

    return (
        <div className="border-b border-gray-900/10 pb-12">


            <form onSubmit={handleSubmit}>
                <h3 className="text-base font-semibold leading-7 text-gray-900">Add new medicine</h3>
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-10">

                    <div className="sm:col-span-2 sm:col-start-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Medicine name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Concentration</label>
                        <div className="mt-2">
                            <input
                                type="number"
                                onChange={(e) => setConcentration(e.target.value)}
                                value={concentration}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Unit</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                onChange={(e) => setUnit(e.target.value)}
                                value={unit}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 flex justify-start items-end">
                        <button
                            className="mt-2 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Medicine
                        </button>
                    </div>
                    {error && <div className="m:col-span-2 text-red-500">{error}</div>}

                </div>

            </form>
        </div>
    )
}

export default MedicineForm