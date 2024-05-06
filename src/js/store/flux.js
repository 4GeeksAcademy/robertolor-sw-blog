const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			generalData: [],

			/* Favorites Array */
			favorites: [],
			/* Characters data */
			characterData: [],
			characterDetails: [],

			/* Planet Data */
			planetsData: [],
			planetsDetails: [],

			/* Species Data */
			speciesData: [],
			speciesDetails: [],
			/* Starships Data */
			starshipsData: [],
			starshipsDetails: [],
		},

		actions: {

			initialFetchAndWait: async () => {
				try {
					await getActions().fetchData();
					await getActions().fetchCharacterData();
					await getActions().fetchPlanetData();
					await getActions().fetchSpeciesData();
					await getActions().fetchStarshipsData();
				} catch (e) {
					console.error(e);
				}
			},


			fetchData: async () => {

				
				function transformedUrl(originalUrl) {
					return `${originalUrl}?page=1&limit=12`
						;
				}
				const store = getStore();
				try {
					let response = await fetch("https://www.swapi.tech/api/");
					if (!response.ok) { throw new Error("Network response from API was not OK") };

					let dataGeneral = await response.json();
					let transformedPeopleUrl = transformedUrl(dataGeneral.result.people);
					let transformedPlanestUrl = transformedUrl(dataGeneral.result.planets);
					let transformedSpeciesUrl = transformedUrl(dataGeneral.result.species);
					let transformedVehiclesUrl = transformedUrl(dataGeneral.result.vehicles);
					let transformedStarshipsUrl = transformedUrl(dataGeneral.result.starships);


					setStore({
						...store, generalData: {
							films: dataGeneral.result.films,
							people: transformedPeopleUrl,
							planets: transformedPlanestUrl,
							species: transformedSpeciesUrl,
							vehicles: transformedVehiclesUrl,
							starships: transformedStarshipsUrl
						}
					})

				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},

			fetchCharacterData: async (who) => {
				const store = getStore();
				let url = store.generalData.people
				if (who == 'next') url = store.characterData.next
				if (who == 'previous') url = store.characterData.previous
				console.log(url)

				try {
					let response = await fetch(url);
					if (!response.ok) throw new Error("error fetching Character data.");

					let dataCharacter = await response.json();
					setStore({ ...store, characterData: dataCharacter });

					
					let characterDetailPromises = dataCharacter.results.map(async details => {
						try {
							let resCharDetails = await fetch(details.url);
							if (!resCharDetails.ok) throw new Error("error fetching Character detail");

							return resCharDetails.json();
						} catch (error) {
							console.error("Error fetching character detail:", error);
							return null;
						}
					});


					let characterDetailsArray = await Promise.all(characterDetailPromises);
					let characterDetailsArrayIn = characterDetailsArray.map((ele) => ele.result)

					setStore({ ...store, characterDetails: characterDetailsArrayIn });
					console.log(store.characterDetails);
				} catch (error) {
					console.error("Error fetching data2:", error);
				}
			},

			fetchPlanetData: async (who) => {
				const store = getStore();
				let url = store.generalData.planets
				if (who == 'next') url = store.planetsData.next
				if (who == 'previous') url = store.planetsData.previous
				console.log(url)

				try {
					let response = await fetch(url);
					if (!response.ok) throw new Error("error fetching Planets data.");

					let dataPlanets = await response.json();
					setStore({ ...store, planetsData: dataPlanets });

					// Array de promesas para obtener los detalles de cada personaje
					let planetsDetailPromises = dataPlanets.results.map(async details => {
						try {
							let resPlanetsDetails = await fetch(details.url);
							if (!resPlanetsDetails.ok) throw new Error("error fetching Planets detail");

							return resPlanetsDetails.json();
						} catch (error) {
							console.error("Error fetching planets detail:", error);
							return null;
						}
					});


					let planetsDetailsArray = await Promise.all(planetsDetailPromises);
					let planetsDetailsArrayIn = planetsDetailsArray.map((ele) => ele.result)

					setStore({ ...store, planetsDetails: planetsDetailsArrayIn });
					console.log(store.planetsDetails);
				} catch (error) {
					console.error("Error fetching data2:", error);
				}
			},

			fetchSpeciesData: async (who) => {
				const store = getStore();
				let url = store.generalData.species
				if (who == 'next') url = store.speciesData.next
				if (who == 'previous') url = store.speciesData.previous
				console.log(url)

				try {
					let response = await fetch(url);
					if (!response.ok) throw new Error("error fetching Species data.");

					let dataSpecies = await response.json();
					setStore({ ...store, speciesData: dataSpecies });

					// Array de promesas para obtener los detalles de cada personaje
					let speciesDetailPromises = dataSpecies.results.map(async details => {
						try {
							let resSpeciesDetails = await fetch(details.url);
							if (!resSpeciesDetails.ok) throw new Error("error fetching Species detail");

							return resSpeciesDetails.json();
						} catch (error) {
							console.error("Error fetching species detail:", error);
							return null;
						}
					});


					let speciesDetailsArray = await Promise.all(speciesDetailPromises);
					let speciesDetailsArrayIn = speciesDetailsArray.map((ele) => ele.result)

					setStore({ ...store, speciesDetails: speciesDetailsArrayIn });
					console.log(store.speciesDetails);
				} catch (error) {
					console.error("Error fetching data2 species:", error);
				}
			},

			fetchStarshipsData: async (who) => {
				const store = getStore();
				let url = store.generalData.starships
				if (who == 'next') url = store.starshipsData.next
				if (who == 'previous') url = store.starshipsData.previous
				console.log(url)

				try {
					let response = await fetch(url);
					if (!response.ok) throw new Error("error fetching Starships data.");

					let dataStarships = await response.json();
					setStore({ ...store, starshipsData: dataStarships });

					// Array de promesas para obtener los detalles de cada personaje
					let starshipsDetailPromises = dataStarships.results.map(async details => {
						try {
							let resStarshipsDetails = await fetch(details.url);
							if (!resStarshipsDetails.ok) throw new Error("error fetching Starships detail");

							return resStarshipsDetails.json();
						} catch (error) {
							console.error("Error Starships species detail:", error);
							return null;
						}
					});


					let starshipsDetailsArray = await Promise.all(starshipsDetailPromises);
					let starshipsDetailsArrayIn = starshipsDetailsArray.map((ele) => ele.result)

					setStore({ ...store, starshipsDetails: starshipsDetailsArrayIn });
					console.log(store.starshipsDetails);
				} catch (error) {
					console.error("Error fetching data2 star:", error);
				}
			},

			handleFavorites: (elem) => {
				/* hacemos un backup del store */
				let store = getStore()
				let existOrNot = store.favorites.filter((item) => elem._id === item._id) /* filter siempre devuelve un Array independientemente del numero de resultados */

				if (existOrNot[0]) {
					let newList = store.favorites.filter((item) => elem._id !== item._id)
					setStore({ ...store, favorites: newList })
				} else {
					/* creamos store desde 0 utilizando el backup && agregamos datos nuevos */
					setStore({ ...store, favorites: [...store.favorites, elem] })
				}
				let newStore = getStore()

				console.log(newStore.favorites)
			}


		}
	};
};

export default getState;
