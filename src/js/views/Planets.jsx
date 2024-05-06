import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PlanetsCard } from "../component/PlanetsCard.jsx"

export const Planets = () => {
    const { store } = useContext(Context);
    return(
        <div>
            <PlanetsCard favorites={store.favorites}/>
        </div>
    )
    
}