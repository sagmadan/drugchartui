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
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Medicine</h3>

            <label>Medicine Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Concentration:</label>
            <input
                type="number"
                onChange={(e) => setConcentration(e.target.value)}
                value={concentration}
            />

            <label>Unit:</label>
            <input
                type="text"
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
            />

            <button>Add Medicine</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MedicineForm