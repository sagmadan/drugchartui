import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import { useAuthContext } from "../hooks/useAuthContext"
import { useChart } from "../hooks/useChart"
import { useMedicineContext } from "../hooks/useMedicineContext"

import ChartTimeSlotCard from '../components/ChartTimeSlotCard'

import { timings } from "../constants/scheduleConstants"
import { chartTimeSlots, chartMedicineStatus } from "../constants/chartConstants"
import { getFormattedTodayDate } from "../utils/dateTimeUtils"

const Chart = () => {
    const { user } = useAuthContext()
    const { medicinesMap } = useMedicineContext()

    const { getChart, updateChart, chartData, setChartData, error } = useChart()

    const [chartDate, setChartDate] = useState(getFormattedTodayDate())
    const [medicineId, setMedicineId] = useState('')
    const [medicineName, setMedicineName] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')


    const handleAdhocMedicineSubmit = (e) => {
        e.preventDefault()

        const randomId = "Adhoc" + uuidv4();
        chartData[time][randomId] = { medicineId, status: 'Adhoc Not Given', notes }
        setMedicineId('')
        setMedicineName('')
        setTime('')
        setNotes('')
    }


    const handleUpdateChart = async (e) => {
        const updateCurrentChart = async () => {
            await updateChart(chartData)
        }
        if (user) {
            updateCurrentChart()
        }
    }


    const updateChartMedicineStatus = (timeSlot, scheduleId, newStatus) => {
        const updatedChartData = { ...chartData };
        const updatedTimeSlot = { ...updatedChartData[timeSlot] };
        const updatedSchedule = { ...updatedTimeSlot[scheduleId] };

        updatedSchedule.status = newStatus;

        updatedTimeSlot[scheduleId] = updatedSchedule;
        updatedChartData[timeSlot] = updatedTimeSlot;

        setChartData(updatedChartData);
    }

    const handleStatusChange = (timeSlot, scheduleId) => {
        switch (chartData[timeSlot][scheduleId].status) {
            case chartMedicineStatus.NOT_GIVEN:
                updateChartMedicineStatus(timeSlot, scheduleId, chartMedicineStatus.GIVEN)
                break;
            case chartMedicineStatus.GIVEN:
                updateChartMedicineStatus(timeSlot, scheduleId, chartMedicineStatus.SKIPPED)
                break;
            case chartMedicineStatus.SKIPPED:
                updateChartMedicineStatus(timeSlot, scheduleId, chartMedicineStatus.ADHOC_NOT_GIVEN)
                break;
            case chartMedicineStatus.ADHOC_NOT_GIVEN:
                updateChartMedicineStatus(timeSlot, scheduleId, chartMedicineStatus.ADHOC_GIVEN)
                break;
            case chartMedicineStatus.ADHOC_GIVEN:
                updateChartMedicineStatus(timeSlot, scheduleId, chartMedicineStatus.NOT_GIVEN)
                break;
            default:
                console.log("Invalid status")
        }
    }

    useEffect(() => {

    }, [chartData])

    useEffect(() => {
        const fetchChart = async () => {
            await getChart(chartDate)
        }
        if (user) {
            fetchChart()
        }
    }, [user, chartDate])

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-3">

            {/* Chart date with chart update button*/}
            <div className="flex justify-between items-center space-x-4">
                <div className="flex justify-start items-center">
                    <h3 className="text-base font-semibold pr-5 leading-7 text-gray-900">Select Date:</h3>
                    <input
                        type="date"
                        value={chartDate}
                        onChange={(e) => setChartDate(e.target.value)}
                        className="block rounded-md border border-gray-300 md:border-gray-100 rounded p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                    >
                    </input>
                </div>

                {chartData && <button
                    onClick={handleUpdateChart}
                    className="ml-auto rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                    Update Chart
                </button>}
            </div>


            {/* Add adhoc medicine form */}
            {chartData && <div className="mt-4 border-t border-gray-200">
                <form onSubmit={handleAdhocMedicineSubmit}>
                    <h3 className="mt-2 text-base font-semibold leading-7 text-gray-900">Add Adhoc Medicine</h3>
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
                            <label className="block text-sm font-medium leading-6 text-gray-900">Time</label>
                            <div className="mt-2">
                                <select
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 md:border-gray-100 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                >
                                    {timings.map(timing => {
                                        return <option key={timing}>{timing}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Notes</label>
                            <div className="mt-2">
                                <input
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
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

                    </div>
                </form>
            </div>}



            {/*  Chart time slot cards */}
            <div className="mt-4 border-t border-gray-200">

                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {chartData && chartTimeSlots.map(timing => {
                        return <ChartTimeSlotCard key={timing} chartTimeSlot={timing} chartTimeSlotDetails={chartData[timing]} onUpdateStatus={handleStatusChange} />
                    })}
                </div>

                {error && <div className="mt-5 text-red-500">{error}</div>}

            </div>

        </div>

    )
}

export default Chart