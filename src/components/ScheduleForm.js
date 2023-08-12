import { useState } from "react"

import { useScheduleContext } from "../hooks/useScheduleContext"
import { useMedicineContext } from "../hooks/useMedicineContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { timings, frequencies, scheduleStatus } from "../constants/scheduleConstants"
import { getFormattedTodayDate } from "../utils/dateTimeUtils"
const ScheduleForm = () => {
    const { medicinesMap } = useMedicineContext()
    const { dispatch } = useScheduleContext()
    const { user } = useAuthContext()

    const [medicineId, setMedicineId] = useState('')
    const [medicineName, setMedicineName] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [timing1, setTiming1] = useState('')
    const [timing2, setTiming2] = useState('')
    const [timing3, setTiming3] = useState('')
    const [startFromDate, setStartFromDate] = useState(getFormattedTodayDate())
    const [startFromTime, setStartFromTime] = useState('')
    const [tillDate, setTillDate] = useState(getFormattedTodayDate())
    const [tillTime, setTillTime] = useState('')
    const [countDoseNumber, setCountDoseNumber] = useState(false)
    const [frequency, setFrequency] = useState(frequencies.at(0))

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const schedule = {
            medicineId,
            medicineName,
            additionalInfo,
            timing1: timing1 !== "" ? timing1 : null,
            timing2: timing2 !== "" ? timing2 : null,
            timing3: timing3 !== "" ? timing3 : null,
            startFromDate,
            startFromTime,
            tillDate,
            tillTime,
            countDoseNumber,
            frequency,
            status: scheduleStatus.ACTIVE
        }

        const response = await fetch('/api/schedules', {
            method: 'POST',
            body: JSON.stringify(schedule),
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
            setMedicineId('')
            setMedicineName('')
            setAdditionalInfo('')
            setTiming1('')
            setTiming2('')
            setTiming3('')
            setStartFromDate(getFormattedTodayDate())
            setStartFromTime('')
            setTillDate(getFormattedTodayDate())
            setTillTime('')
            setCountDoseNumber(false)
            setFrequency(frequencies.at(0))
            setError(null)
            dispatch({ type: 'CREATE_SCHEDULES', payload: json })
        }
    }

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <form onSubmit={handleSubmit}>
                <h3 className="text-base font-semibold leading-7 text-gray-900">Add new schedule</h3>
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-10">

                    <div className="sm:col-span-4 sm:col-start-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Medicine Name</label>
                        <div className="mt-2">
                            <select
                                value={medicineName}
                                onChange={(e) => {
                                    const index = e.target.selectedIndex;
                                    const el = e.target.childNodes[index]
                                    const optionId = el.getAttribute('id')
                                    setMedicineName(e.target.value)
                                    setMedicineId(optionId)
                                }}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                <option id={"blank"} key={"blank"}></option>
                                {medicinesMap && Array.from(medicinesMap)
                                    .sort((a, b) => a[1].name.localeCompare(b[1].name))
                                    .map(([key, value]) => (
                                        <option id={value._id} key={value._id}>{value.name} {value.concentration} {value.unit}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Timing 1</label>
                        <div className="mt-2">
                            <select
                                value={timing1}
                                onChange={(e) => setTiming1(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                {timings.map(timing => {
                                    return <option key={timing}>{timing}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Timing 2</label>
                        <div className="mt-2">
                            <select
                                value={timing2}
                                onChange={(e) => setTiming2(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                {timings.map(timing => {
                                    return <option key={timing}>{timing}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Timing 3</label>
                        <div className="mt-2">
                            <select
                                value={timing3}
                                onChange={(e) => setTiming3(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                {timings.map(timing => {
                                    return <option key={timing}>{timing}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
                        <div className="mt-2">
                            <input
                                type="date"
                                value={startFromDate}
                                onChange={(e) => setStartFromDate(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                            </input>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Start Time</label>
                        <div className="mt-2">
                            <select
                                value={startFromTime}
                                onChange={(e) => setStartFromTime(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                {timings.map(timing => {
                                    return <option key={timing}>{timing}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Till Date</label>
                        <div className="mt-2">
                            <input
                                type="date"
                                value={tillDate}
                                onChange={(e) => setTillDate(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                            </input>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Till Time</label>
                        <div className="mt-2">
                            <select
                                value={tillTime}
                                onChange={(e) => setTillTime(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                {timings.map(timing => {
                                    return <option key={timing}>{timing}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="relative flex gap-x-3 mt-8">
                            <input
                                type="checkbox"
                                checked={countDoseNumber}
                                onChange={(e) => {
                                    setCountDoseNumber((prevChecked) => !prevChecked)
                                }}
                                className="h-6 w-4 rounded border-green-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label className="mt-0 block text-sm font-medium leading-6 text-gray-900">Count Dose Number</label>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Frequency</label>
                        <div className="mt-2">
                            <select
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                {frequencies.map(frequency => {
                                    return <option key={frequency}>{frequency}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Additional Info</label>
                        <div className="mt-2">
                            <input
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2 flex justify-start items-end">
                        <button
                            className="mt-2 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Medicine
                        </button>
                    </div>
                    <div className="sm:col-span-10 sm:col-start-1">
                        {error && <div className="m:col-span-2 text-red-500">{error}</div>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ScheduleForm