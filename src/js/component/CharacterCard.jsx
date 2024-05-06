import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

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

    const handleFavorite = (elem) => {
        actions.handleFavorites(elem)

    }

    const isFavorite = (elem) => {
        
        return store.favorites.some(favorite => favorite._id === elem._id);
    };

    

    return (
        <div className="container text-center fondo-tarjetas">
            <div className=" pt-2 text-center">
                <button className={`btn btn-secondary mx-4 ${(previous) ? '' : 'd-none'}`} onClick={handlePrevious}>Previous Page</button>
                <button className={`btn btn-secondary mx-4 ${(next) ? '' : 'd-none'}`} onClick={handleNext}>Next Page</button>

            </div>
            <div className="row">
                {/* usamos el && para evitar que nos explote el codigo cuando existe la posibildiad de que map recorra un undefined. */}
                {store.characterDetails && store.characterDetails.map(elem => (
                    <div key={elem.uid} className="col-md-3 d-flex justify-content-center">
                        <div className="card m-3 feed-card" style={{ width: "24rem" }}>
                            <img className="img-det-card" src={`https://starwars-visualguide.com/assets/img/characters/${elem.uid}.jpg`} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{elem.properties.name}</h5>

                                <Link to={`/characters/${elem.uid}`} className="btn btn-primary mt-3">More Details</Link>
                                <button className="" onClick={() => handleFavorite(elem)}>{isFavorite(elem) ? <FaHeart /> : <CiHeart />}</button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

