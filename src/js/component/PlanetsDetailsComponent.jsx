import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";


export const PlanetsDetailsComponent = () => {

    const { uid } = useParams();
    const {store, actions} = useContext(Context)
    const planet = store.planetsDetails.find(planet => planet.uid === uid)
    
    function primeraLetraMayuscula(cadena) {
        console.log("lo que recibo es", cadena)
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

    if (!store.planetsDetails || store.planetsDetails.length === 0) {
        return <div>Loading...</div>; 
    }

    
    if (!planet) {
        return <div>Planeta no encontrado</div>; 
    }

    return (
        <div className="container mt-3">
            <div className="card detail-card d-flex flex-row text-white">
                <div>
                    <img  className="rounded-start" src={`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`} alt={`An image of ${planet.properties.name}`} />
                </div> 
                <div>
                
                    <ul>
                    <h1>{planet.properties.name}</h1>
                        <li>Diameter: {primeraLetraMayuscula(`${planet.properties.diameter}`)}</li>
                        <li>Rotation Period:{primeraLetraMayuscula(`${planet.properties.rotation_period}`)}</li>
                        <li>Orbital Period:{primeraLetraMayuscula(`${planet.properties.orbital_period}`)}</li>
                        <li>Climate:{planet.properties.climate}</li>
                        <li>Terrain:{primeraLetraMayuscula(`${planet.properties.terrain}`)}</li>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia libero corporis assumenda, praesentium beatae sequi rem dolores nostrum, perspiciatis enim ipsam quos delectus. Atque maxime dolores cumque commodi dolor.</p> 
                    </ul>
                    
                </div> 
            </div>
        </div>
    );}