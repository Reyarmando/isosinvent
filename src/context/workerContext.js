import { createContext, useState } from "react";


export const workerContext = createContext()

export const WorkerProvider = (props) => {

    const [ workers ] = useState()

    return (
        <workerContext.Provider value={{workers}}>
            {props.children}
        </workerContext.Provider>
    )
}

