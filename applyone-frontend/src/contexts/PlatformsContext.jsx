import { createContext, useContext, useState, useEffect } from "react";
import { getAllLinkedPlatforms } from "../services/platformsServices";

const PlatformsContext = createContext()

export const PlatformsProvider = ({children}) => {
    const [allPlatforms, setAllPlatforms] = useState([])
    const [actualPlatform, setActualPlatform] = useState(null)

    useEffect(() => {
        const getAllPlatforms = async () => {
            const request = await getAllLinkedPlatforms()
            setAllPlatforms(request)
            if(request.length > 0) {
                setActualPlatform(request[0].platform_name)
            }
        }
        getAllPlatforms()
    }, [])

    return (
        <PlatformsContext.Provider
        value={{
            allPlatforms,
            setAllPlatforms,
            actualPlatform,
            setActualPlatform,
        }}
        >
            {children}
        </PlatformsContext.Provider>
    )
}

export const usePlatforms = () =>  useContext(PlatformsContext)