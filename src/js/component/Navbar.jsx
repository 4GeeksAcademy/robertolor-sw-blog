import React, { useContext } from "react";
import { Link, useParams, useNagivate } from "react-router-dom";
import Logo from "../../img/sw-logo.png"
import { Context } from "../store/appContext";


export const Navbar = () => {
    const {store, actions} = useContext(Context)
    return (
        <div>
            <div className="bg-dark top-nav">
                <div className="d-flex justify-content-center align-items-center">
                    <img className="logo" src={Logo} />
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Favorites
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                <ul className="nav justify-content-center dark text-white">
                    <li className="nav-item bs-dark-text-emphasis">
                        <a className="nav-link active bs-dark-text-emphasis" aria-current="page" href="#">Films</a>
                    </li>
                    <li className="nav-item">
                        <Link className="text-decoration-none" to={"/Characters"}><span className="nav-link active bs-dark-text-emphasis text-white">Characters</span> </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Planets</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-disabled="true">Species</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-disabled="true">Starships</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-disabled="true">Vehicles</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}