import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";


export const CharacterCard = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context)
    console.log(store.characterDetails)
    let who = ""
    let previous = store.characterData.previous
    let next = store.characterData.next

    const handleNext = () => {
        who = "next"
        actions.fetchCharacterData(who)
    }
    const handlePrevious = () => {
        who = "previous"
        
        actions.fetchCharacterData(who)
    }
    function primeraLetraMayuscula(cadena) {
        console.log("lo que recibo es", cadena)
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
      }

    return (
        <div className="container text-center">
            <div className="mt-2 text-center">
                <button className={`btn btn-secondary mx-4 ${(previous)? '': 'd-none'}`} onClick={handlePrevious}>Previous Page</button>
                <button className={`btn btn-secondary mx-4 ${(next)? '': 'd-none'}`} onClick={handleNext}>Next Page</button>
                
            </div>
            <div className="row">
                {store.characterDetails.map(elem => (
                    <div key={elem.uid} className="col-md-3 d-flex justify-content-center">
                        <div className="card m-3 feed-card" style={{width: "24rem"}}>
                            <img className="img-det-card" src={`https://starwars-visualguide.com/assets/img/characters/${elem.uid}.jpg`} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{elem.properties.name}</h5>
                                
                                <Link to={`/characters/${elem.uid}`} className="btn btn-primary mt-3">More Details</Link>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

