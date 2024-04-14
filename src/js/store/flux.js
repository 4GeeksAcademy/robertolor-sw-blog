const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			generalData: [],
			/* Characters data */
			characterData: [],
			characterDetails: [],

			/* Planet Data */
		},

		actions: {

			/* funcion que lanzamos al context para que cargue PRIMERO fetchData y espere. LUEGO me cargue las datas de cada fetch en paralelo. */

			initialFetchAndWait: async () => {
				const store = getStore();
				await getActions().fetchData();
				await getActions().fetchCharacterData()


			},

			fetchData: async () => {

				/* funcion para transformar la pagian de 10 elementos a 12 */
				function transformedUrl(originalUrl) {
					let transformedUrl = `?${originalUrl}page=1&limit=12`
					return transformedUrl;
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
					
				
 					setStore({ ...store, generalData: {
						films: dataGeneral.result.films,
						people: transformedPeopleUrl,
						planets: transformedPlanestUrl,
						species: transformedSpeciesUrl,
						vehicles: transformedVehiclesUrl,
						starships: transformedStarshipsUrl }})
					
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

					// Array de promesas para obtener los detalles de cada personaje
					let characterDetailPromises = dataCharacter.results.map(async details => {
						try{
							let resCharDetails = await fetch(details.url);
							if (!resCharDetails.ok) throw new Error("error fetching Character detail");

							return resCharDetails.json();
						}catch (error) {
							console.error("Error fetching character detail:", error);
							return null;
						}
					});

					
					let characterDetailsArray = await Promise.all(characterDetailPromises);
					let characterDetailsArrayIn = characterDetailsArray.map( (ele) =>ele.result ) 
					
					setStore({ ...store, characterDetails: characterDetailsArrayIn });
					console.log(store.characterDetails);
				} catch (error) {
					console.error("Error fetching data2:", error);
				}
			},

		}
	};
};

export default getState;
