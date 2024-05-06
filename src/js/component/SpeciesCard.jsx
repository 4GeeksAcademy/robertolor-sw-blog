import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


export const SpeciesCard = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context)
    console.log(store.SpeciesDetails)
    let who = ""
    let previous = store.speciesData.previous
    let next = store.speciesData.next



    const handleNext = () => {
        who = "next"
        actions.fetchSpeciesData(who)
    }
    const handlePrevious = () => {
        who = "previous"
        actions.fetchSpeciesData(who)
    }
    const handleFavorite = (elem) => {
        actions.handleFavorites(elem)

    }
    const isFavorite = (elem) => {
        
        return store.favorites.some(favorite => favorite._id === elem._id);
    };
    
    return (
        <div className="container text-center">
            <div className="mt-2 text-center">
                <button className={`btn btn-secondary mx-4 ${(previous)? '': 'd-none'}`} onClick={handlePrevious}>Previous Page</button>
                <button className={`btn btn-secondary mx-4 ${(next)? '': 'd-none'}`} onClick={handleNext}>Next Page</button>
                
            </div>
            <div className="row">
                {store.speciesDetails.map(elem => (
                    <div key={elem._id} className="col-md-3 d-flex justify-content-center">
                        <div className="card m-3 feed-card" style={{width: "24rem"}}>
                            <img className="img-det-card" src={`https://starwars-visualguide.com/assets/img/species/${elem.uid}.jpg`} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{elem.properties.name}</h5>
                            
                                <Link to={`/species/${elem.uid}`} className="btn btn-primary mt-3">More Details</Link>
                                <button className="" onClick={() => handleFavorite(elem)}>{isFavorite(elem) ? <FaHeart /> : <CiHeart />}</button>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

