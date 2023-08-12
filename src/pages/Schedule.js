import { useScheduleContext } from "../hooks/useScheduleContext"

// components
import ScheduleDetails from '../components/ScheduleDetails'
import ScheduleForm from '../components/ScheduleForm'

const Schedule = () => {
    const { schedulesMap } = useScheduleContext()
    return (
        <div className="min-h-screen bg-gray-50 px-5 py-3">
            <div>
                {<ScheduleForm />}
            </div>
            <div className="mt-5 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Schedule List</h3>
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    {schedulesMap && Array.from(schedulesMap)
                        .sort((a, b) => a[1].medicineName.localeCompare(b[1].medicineName))
                        .sort((a, b) => a[1].status.localeCompare(b[1].status))
                        .map(([key, value]) => (
                            <ScheduleDetails key={key} schedule={value} />
                        ))}
                </dl>
            </div>
        </div >
    )
}

export default Schedule
