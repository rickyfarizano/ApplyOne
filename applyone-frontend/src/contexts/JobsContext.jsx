import { createContext, useContext, useState, useEffect } from "react";
import { getJobsByPlatform } from "../services/jobsServices.js";

const JobsContext = createContext()

export const JobsProvider = ({children}) => {
    const [jobsXplatform, setJobsXplatform] = useState()

    const fetchJobsByPlatform = async (platform) => {
        const data = await getJobsByPlatform(platform)
        setJobsXplatform(data)
    }

    return (
        <JobsContext.Provider value={{
            jobsXplatform,
            setJobsXplatform,
            fetchJobsByPlatform
        }}>{children}</JobsContext.Provider>
    )
}

export const useJobs = () => useContext(JobsContext)

