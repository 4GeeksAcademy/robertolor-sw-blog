import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CharacterCard } from "../component/CharacterCard.jsx"

export const People = () => {
    return(
        <div>
            <CharacterCard/>
        </div>
    )
    
}