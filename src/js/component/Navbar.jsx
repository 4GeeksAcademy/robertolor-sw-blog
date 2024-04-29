import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Logo from "../../img/sw-logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleNavigation = (elem) => {
        console.log('clicked on:', elem)
       
        const type = elem.properties.url.split('/')[4]; 
        console.log('Type:', type)
        
        switch (type) {
            case 'people':
                navigate(`/characters/${elem.uid}`);
                break;
            case 'planets':
                navigate(`/planets/${elem.uid}`);
                break;
            case 'species':
                navigate(`/species/${elem.uid}`);
                break;
            case 'starships':
                navigate(`/starships/${elem.uid}`);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div className="bg-black top-nav">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="logo-container">
                        <img className="logo mx-auto" src={Logo} alt="Star Wars Logo" />
                    </div>
                    <div className="dropdown-container">
                        <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Favorites
                        </button>
                        <ul className="dropdown-menu">
                            {store.favorites.map(elem => (
                                <li key={elem._id}><button className="fav-btn"onClick={()=> handleNavigation(elem)}>{elem.properties.name}</button></li>
                            ))}
                            
                        </ul>
                    </div>
                </div>
                <ul className="nav justify-content-center dark text-white nav-2">
                    <li className="nav-item bs-dark-text-emphasis">
                        <a className="nav-link active bs-dark-text-emphasis" aria-current="page" href="#">Films</a>
                        <div className="underline"></div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to={"/characters"}>Characters</Link>
                        <div className="underline"></div>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link text-white" to={"/planets"}>Planets</Link>
                        <div className="underline"></div>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link text-white" to={"/species"}>Species</Link>
                        <div className="underline"></div>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link text-white" to={"/starships"}>Starships</Link>
                        <div className="underline"></div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" aria-disabled="true">Vehicles</a>
                        <div className="underline"></div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
