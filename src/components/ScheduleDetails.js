import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useMedicineContext } from "../hooks/useMedicineContext"
import { useScheduleContext } from "../hooks/useScheduleContext"
import { scheduleStatus } from "../constants/scheduleConstants"

const ScheduleDetails = ({ schedule }) => {
    const { user } = useAuthContext()
    const [error, setError] = useState(null)
    const { dispatch } = useScheduleContext()
    const { medicinesMap } = useMedicineContext()
    const medicineObject = medicinesMap.get(schedule.medicineId)

    const handleDiscontinue = async () => {
        if (!user) {
            setError('You must be logged in')
            return
        }

        const response = await fetch('/api/schedules/discontinue/' + schedule._id, {
            method: 'PUT',
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
            setError(null)
            dispatch({ type: 'CREATE_SCHEDULES', payload: json })
        }
    }

    return (
        <div className="px-2 py-3 sm:grid grid-cols-12 sm:grid-cols-12 sm:gap-4 sm:px-0">
            <dt className="text-sm leading-6 text-gray-900 sm:col-span-2 sm:mt-0">
                <p className="font-semibold inline">{medicineObject.name} </p>
                <p className="font-normal inline">{medicineObject.concentration} {medicineObject.unit}</p>
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-medium">
                {schedule.timing1}{schedule.timing2 ? " | " + schedule.timing2 : ""}
                {schedule.timing3 ? " | " + schedule.timing3 : ""}
            </dd>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-medium">
                [Notes: <p className="inline text-cyan-600">{schedule.additionalInfo ? schedule.additionalInfo : "Nil"}</p>]
            </dd>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
                {schedule.startFromDate} {schedule.startFromTime} - {schedule.tillDate} {schedule.tillTime}
            </dd>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 text-blue-500">
                {schedule.frequency}
            </dd>
            {schedule.status === "Discontinued" ?
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-red-500">
                    {schedule.status}
                </dd>
                : <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 text-green-500">
                    {schedule.status}
                </dd>}
            {schedule.status === scheduleStatus.DISCONTINUED ?
                <></>
                :
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 text-red-400" onClick={handleDiscontinue}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </dd>
            }
            {error && <div className="sm:col-span-12 text-red-500">{error}</div>}
        </div>
    )
}

export default ScheduleDetails