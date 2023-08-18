import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useChart = () => {
    const [chartData, setChartData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const { user } = useAuthContext()

    const getChart = async (date) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/charts/${date}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
        })
        const json = await response.json()

        if (!response.ok) {
            // if API call succeeded with an error, stop the loading
            setIsLoading(false)

            // setting the error if response is not okay
            setError(json.error)

            // setting the chart data to null in case response is not okay
            setChartData(null)
        }
        if (response.ok) {
            // set the chart data
            setChartData(json)

            // update loading state
            setIsLoading(false)

            // set error back to null
            setError(null)
        }
    }

    const updateChart = async (chartData) => {
        const id = chartData._id

        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/charts/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({updateData: chartData}),
        })

        const json = await response.json()

        if (!response.ok) {
            // if API call succeeded with an error, stop the loading
            setIsLoading(false)

            // setting the error if response is not okay
            setError(json.error)
        }
        if (response.ok) {
            // update loading state
            setIsLoading(false)

            // set error back to null
            setError(null)
        }
    }

    return { getChart, updateChart, chartData, setChartData, isLoading, error }
}