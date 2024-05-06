import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CharacterCard } from "../component/CharacterCard.jsx"

export const People = () => {
    const { store } = useContext(Context);
    return(
        <div>
            <CharacterCard favorites={store.favorites}/>
        </div>
    )
    
}