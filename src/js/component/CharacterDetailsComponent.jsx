import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";


export const CharacterDetailsComponent = () => {

    const { uid } = useParams();
    const {store, actions} = useContext(Context)
    const person = store.characterDetails.find(person => person.uid === uid)
    
    function primeraLetraMayuscula(cadena) {
        console.log("lo que recibo es", cadena)
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

    if (!store.characterDetails || store.characterDetails.length === 0) {
        return <div>Loading...</div>; // Puedes mostrar un mensaje de carga aquí
    }

    // Verifica si se encontró una persona con el UID dado
    if (!person) {
        return <div>Personaje no encontrado</div>; // Puedes mostrar un mensaje de error aquí
    }

    return (
        <div className="container mt-3">
            <div className="card detail-card d-flex flex-row text-white">
                <div>
                    <img  className="rounded-start" src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} alt={`An image of ${person.properties.name}`} />
                </div> 
                <div>
                <h1>{person.properties.name}</h1>
                    <ul>
                        
                        <li>Homeworld: Tatooine</li>
                        <li>Hair Color: {primeraLetraMayuscula(`${person.properties.hair_color}`)}</li>
                        <li>Skin Color:{primeraLetraMayuscula(`${person.properties.skin_color}`)}</li>
                        <li>Eye Color:{primeraLetraMayuscula(`${person.properties.eye_color}`)}</li>
                        <li>Birth Year:{person.properties.birth_year}</li>
                        <li>Gender:{primeraLetraMayuscula(`${person.properties.gender}`)}</li>
                        <br />
                    </ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque officia libero corporis assumenda, praesentium beatae sequi rem dolores nostrum, perspiciatis enim ipsam quos delectus. Atque maxime dolores cumque commodi dolor.</p> 
                </div> 
            </div>
        </div>
    );}