import { useEffect } from 'react'
import { createContext, useReducer } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

export const ScheduleContext = createContext()

export const scheduleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCHEDULES':
            return {
                schedulesMap: action.payload
            }
        case 'CREATE_SCHEDULES':
            const scheduleObj = action.payload
            state.schedulesMap.set(scheduleObj._id, scheduleObj);
            return {
                schedulesMap: state.schedulesMap
            }
        default:
            return state
    }
}

export const SchedulesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(scheduleReducer, {
        schedulesMap: new Map()
    })

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchSchedules = async () => {
            const response = await fetch('/api/schedules', {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            const json = await response.json()

            const schedulesIdToObjMap = new Map(json.map(schedule => [schedule._id, schedule]))

            if (response.ok) {
                dispatch({ type: 'SET_SCHEDULES', payload: schedulesIdToObjMap })
            }
        }
        if (user) {
            fetchSchedules()
        }
    }, [user])

    return (
        <ScheduleContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ScheduleContext.Provider>
    )
}