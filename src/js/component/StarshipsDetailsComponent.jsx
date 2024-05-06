import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";


export const StarshipsDetailsComponent = () => {

    const { uid } = useParams();
    const {store, actions} = useContext(Context)
    const starships = store.starshipsDetails.find(starships => starships.uid === uid)
    
    function primeraLetraMayuscula(cadena) {
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

    if (!store.starshipsDetails || store.starshipsDetails.length === 0) {
        return <div>Loading...</div>; 
    }

    
    if (!starships) {
        return <div>Starship not found </div>; 
    }

    return (
        <div className="container mt-3">
            <div className="card detail-card d-flex flex-row text-white">
                <div>
                    <img  className="rounded-start" src={`https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`} alt={`An image of ${starships.properties.name}`} />
                </div> 
                <div>
                
                    <ul>
                    <h1>{starships.properties.name}</h1>
                        <li>Model: {primeraLetraMayuscula(`${starships.properties.model}`)}</li>
                        <li>Starship Class: {primeraLetraMayuscula(`${starships.properties.starship_class}`)}</li>
                        <li>Manufacturer: {primeraLetraMayuscula(`${starships.properties.manufacturer}`)}</li>
                        <li>Crew: {primeraLetraMayuscula(`${starships.properties.crew}`)}</li>
                        <li>Passengers: {primeraLetraMayuscula(`${starships.properties.passenger}`)}</li>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia libero corporis assumenda, praesentium beatae sequi rem dolores nostrum, perspiciatis enim ipsam quos delectus. Atque maxime dolores cumque commodi dolor.</p> 
                    </ul>
                    
                </div> 
            </div>
        </div>
    );}