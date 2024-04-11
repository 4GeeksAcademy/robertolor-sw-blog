import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const CharacterCard = () => {
    const { store, actions } = useContext(Context)
    console.log(store.characterDetails)
    return (

        <div className="container">
            <div className="row">


                <div className="col-md-6">
                    <div className="d-flex flex-column ms-5 me-5">

                        <div className="card m-3">
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${store.characterDetails[5].result.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{}</h5>


                                <div>
                                    <p className="card-text">Birth Year: </p>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>



                                <a href="#" className="btn btn-primary">More Details</a>

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

