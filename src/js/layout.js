import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "./component/Navbar.jsx"
import { Main } from "./views/Main.jsx"
import { People } from "./views/People.jsx";
import { CharacterDetails } from "./views/CharacterDetails.jsx";
import { Planets } from "./views/Planets.jsx"
import { PlanetsDetails } from "./views/PlanetsDetails.jsx";
import { Species } from "./views/Species.jsx"
import { SpeciesDetails } from "./views/SpeciesDetails.jsx"
import { Starships } from "./views/Starships.jsx"
import { StarshipsDetails } from "./views/StarshipsDetails.jsx"
import injectContext from "./store/appContext";



const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/characters" element={<People />}/>
					<Route path="/characters/:uid" element={<CharacterDetails />}/>
					<Route path="/planets/" element={<Planets />}/>
					<Route path="/planets/:uid" element={<PlanetsDetails />}/>
					<Route path="/species/" element={<Species />}/>
					<Route path="/species/:uid" element={<SpeciesDetails />}/>
					<Route path="/starships/" element={<Starships />}/>
					<Route path="/starships/:uid" element={<StarshipsDetails />}/>
					
					
					
					
					
					<Route path="*" element={<h1>Not found!</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
