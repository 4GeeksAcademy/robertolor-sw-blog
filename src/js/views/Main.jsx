import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Main = () => {
    const { store, actions } = useContext(Context); 

    useEffect (() => {
        actions.fetchData()
    }, [])
    
    
    return (
        <div>
            <h1>Welcome</h1>
            <p>Use the navbar on top to access the info that interests you the most</p>

            <br />
            <p>This is a small practice project in which I am conecting to an API to render the info from the server into my App. It is meant to be simple and most of the info will be lorem.</p>
            <br />
            <p>If you are interested in using the same API, here's the link to it: <a href="https://www.swapi.tech/documentation#intro">https://www.swapi.tech/documentation#intro</a></p>

        </div>
    )
}
