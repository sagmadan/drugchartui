import { useMedicineContext } from "../hooks/useMedicineContext"
import { useScheduleContext } from "../hooks/useScheduleContext"

import { statusToColor } from "../constants/chartConstants"

const ChartTimeSlotCard = ({ chartTimeSlot, chartTimeSlotDetails, onUpdateStatus }) => {

    const handleOnClick = (timeSlot, scheduleId) => {
        onUpdateStatus(timeSlot, scheduleId)
    }

    const { medicinesMap } = useMedicineContext()
    const { schedulesMap } = useScheduleContext()

    return (

        <div className="bg-white p-4 shadow-md rounded-md">

            <h3 className="text-md font-semibold text-gray-900 mb-2">{chartTimeSlot}</h3>
            <ol className="space-y-1 list-decimal mt-4 ml-6 text-sm">
                {Object.keys(chartTimeSlotDetails).map((scheduleId) => {
                    const timeSlotMedicineDetails = chartTimeSlotDetails[scheduleId];
                    if (medicinesMap.size !== 0 && schedulesMap.size !== 0) {
                        const medicineObj = medicinesMap.get(timeSlotMedicineDetails.medicineId)
                        let scheduleObj = schedulesMap.get(scheduleId)
                        if (scheduleObj == null) {
                            scheduleObj = {}
                        }
                        const textColorClass = statusToColor[timeSlotMedicineDetails.status] || 'text-gray-500';

                        return <li key={scheduleId} onClick={() => handleOnClick(chartTimeSlot, scheduleId)}><p className="inline text-sm">
                            {medicineObj.name} {medicineObj.concentration}{medicineObj.unit} {scheduleObj.additionalInfo ? '(' + (scheduleObj.additionalInfo) + ')' : null}
                            {timeSlotMedicineDetails.doseNumber ? ' (Dose: ' + (timeSlotMedicineDetails.doseNumber) + ')' : null}
                            {timeSlotMedicineDetails.notes ? ' (Note: ' + (timeSlotMedicineDetails.notes) + ')' : null}</p>
                            <p className={`inline text-sm ${textColorClass}`}> [{timeSlotMedicineDetails.status}]</p></li>
                    }
                })}
            </ol>
        </div>

    )
}

export default ChartTimeSlotCard