import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";


export const SpeciesDetailsComponent = () => {

    const { uid } = useParams();
    const {store, actions} = useContext(Context)
    const species = store.speciesDetails.find(species => species.uid === uid)
    
    function primeraLetraMayuscula(cadena) {
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

    if (!store.speciesDetails || store.speciesDetails.length === 0) {
        return <div>Loading...</div>; 
    }

    
    if (!species) {
        return <div>Planet not found </div>; 
    }

    return (
        <div className="container mt-3">
            <div className="card detail-card d-flex flex-row text-white">
                <div>
                    <img  className="rounded-start" src={`https://starwars-visualguide.com/assets/img/species/${uid}.jpg`} alt={`An image of ${species.properties.name}`} />
                </div> 
                <div>
                
                    <ul>
                    <h1>{species.properties.name}</h1>
                        <li>Classification: {primeraLetraMayuscula(`${species.properties.classification}`)}</li>
                        <li>Designation: {primeraLetraMayuscula(`${species.properties.designation}`)}</li>
                        <li>Average Lifespan: {primeraLetraMayuscula(`${species.properties.average_lifespan}`)}</li>
                        <li>Skin Colors: {primeraLetraMayuscula(`${species.properties.skin_colors}`)}</li>
                        <li>Language: {primeraLetraMayuscula(`${species.properties.language}`)}</li>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia libero corporis assumenda, praesentium beatae sequi rem dolores nostrum, perspiciatis enim ipsam quos delectus. Atque maxime dolores cumque commodi dolor.</p> 
                    </ul>
                    
                </div> 
            </div>
        </div>
    );}