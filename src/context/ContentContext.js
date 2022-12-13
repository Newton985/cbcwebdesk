import React, { useState } from "react";

export const ContentContext = React.createContext({})

export const ContentContextProvider = (props) => {

    const [strands, setStrands] = useState([])
    const [activeUrl, setActiveUrl] = useState("")
    const [playerOpen, setPlayerOpen] = useState(false)

    return (

        <ContentContext.Provider value={{
            strands, setStrands, activeUrl, setActiveUrl, playerOpen, setPlayerOpen
        }}>
            {props.children}
        </ContentContext.Provider>
    )

}