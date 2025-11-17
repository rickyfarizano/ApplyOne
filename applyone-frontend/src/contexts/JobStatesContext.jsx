import { createContext, useContext, useState, useEffect } from "react";
import { getAllJobStates } from "../services/jobStatesServices";

const JobStatesContext = createContext()

export const JobStatesProvider = ({children}) => {
    const [jobStates, setJobStates] = useState([])

    useEffect(() => {
        const fetchJobStates = async () => {
            const data = await getAllJobStates()
            setJobStates(data)
        }
    }, [])

    return (
        <JobStatesContext.Provider value={{
            jobStates,
            setJobStates
        }}>{children}</JobStatesContext.Provider>
    )
}

export const useJobStates = () => useContext(JobStatesContext)