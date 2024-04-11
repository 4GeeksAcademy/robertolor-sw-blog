const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			generalData: [],
			/* Characters data */
			characterData: [],
			currentCharacter: [],
			currentCharacterDetails: [],

			/* Planet Data */
		},
			
		actions: {

		/* funcion que lanzamos al context para que cargue PRIMERO fetchData y espere. LUEGO me cargue las datas de cada fetch en paralelo. */

		initialFetchAndWait: async () => {
			const store= getStore() 
			await getActions().fetchData();
			
			/* deberia haber un promise para que ejecute todas las que vienen en paralelo */
			await getActions().fetchCharacterData()
			await getActions().fetchCharacterDetails(1)

		},
		
		fetchData: async () => {
			/* let initialData = []; */
			const store = getStore();
			try {
				let response = await fetch("https://www.swapi.tech/api/");
				if(!response.ok){throw new Error ("Network response from API was not OK")};

				let dataGeneral = await response.json();
				/* console.log(dataGeneral) */
				
				/* initialData.push(data); */
				setStore({...store, generalData: dataGeneral.result}) 
				/* console.log(store.generalData.people)
				console.log(`${store.generalData.people}`) */
			}catch(error){
				console.error("Error fetching data:", error);
			}
		},
		
		fetchCharacterData: async () => {
			const store = getStore()
			let currentCharactersData = []
			
			try{
				let response = await fetch(store.generalData.people)
				
				if (!response.ok){throw new Error("error fetching Character data.")};
				
				let dataPersonaje = await response.json();
				/* console.log(dataPersonaje) */
				
				/* Guardando la data de la API en el Store. Aun falta acceder al array de "Results" */
				setStore({...store, characterData: dataPersonaje})
				/* Estamos obteniendo el array guardado dentro del objeto que nos trajo la API */
				store.characterData.results.map(elem => currentCharactersData.push(elem))
				
				/* estamos guardando la data que venia DENTRO del array "results" */
				setStore({...store, currentCharacter: currentCharactersData})
				/* console.log(store.currentCharacter) */
				
			} catch(error){
				console.error("Error fetching data2:", error)
			}		
		},

		fetchCharacterDetails: async (pageNumber) => {
			const store = getStore()
			console.log(pageNumber)
			
			try{
				let response = await fetch (`https://www.swapi.tech/api/people/${pageNumber}`)
				if (!response.ok){throw new Error("error fetching character details.")}

				let dataCharDetails = await response.json();
				console.log(dataCharDetails.result)
				
				/* tenemos dudas sobre sobre su result es un array */
				setStore({...store, currentCharacterDetails: dataCharDetails.result.properties})
				console.log(store.currentCharacterDetails)


			}catch (error) {
				console.error("error fetching data 3: error")
			}

		},

		}
	};
};

export default getState;
