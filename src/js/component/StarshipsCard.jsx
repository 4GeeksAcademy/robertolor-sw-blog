import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


export const StarshipsCard = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context)
    console.log(store.StarshipsDetails)
    let who = ""
    let previous = store.starshipsData.previous
    let next = store.starshipsData.next



    const handleNext = () => {
        who = "next"
        actions.fetchStarshipsData(who)
    }
    const handlePrevious = () => {
        who = "previous"
        actions.fetchStarshipsData(who)
    }
    const handleFavorite = (elem) => {
        actions.handleFavorites(elem)

    }
    const isFavorite = (elem) => {
        
        return store.favorites.some(favorite => favorite.uid === elem.uid);
    }

    return (
        <div className="container text-center">
            <div className="mt-2 text-center">
                <button className={`btn btn-secondary mx-4 ${(previous)? '': 'd-none'}`} onClick={handlePrevious}>Previous Page</button>
                <button className={`btn btn-secondary mx-4 ${(next)? '': 'd-none'}`} onClick={handleNext}>Next Page</button>
                
            </div>
            <div className="row">
                {store.starshipsDetails.map(elem => (
                    <div key={elem.uid} className="col-md-3 d-flex justify-content-center">
                        <div className="card m-3 feed-card" style={{width: "24rem"}}>
                            <img className="img-det-card" src={`https://starwars-visualguide.com/assets/img/starships/${elem.uid}.jpg`} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{elem.properties.name}</h5>
                            
                                <Link to={`/starships/${elem.uid}`} className="btn btn-primary mt-3">More Details</Link>
                                <button className="" onClick={() => handleFavorite(elem)}>{isFavorite(elem) ? <FaHeart /> : <CiHeart />}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
