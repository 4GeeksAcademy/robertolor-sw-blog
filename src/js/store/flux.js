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

		},
		
		fetchData: async () => {
			/* let initialData = []; */
			const store = getStore();
			try {
				let response = await fetch("https://www.swapi.tech/api/");
				if(!response.ok){throw new Error ("Network response from API was not OK")};

				let dataGeneral = await response.json();
				console.log(dataGeneral)
				
				/* initialData.push(data); */
				setStore({...store, generalData: dataGeneral.result}) 
				console.log(store.generalData.people)
				console.log(`${store.generalData.people}`)
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
				console.log(dataPersonaje)
				
				/* Guardando la data de la API en el Store. Aun falta acceder al array de "Results" */
				setStore({...store, characterData: dataPersonaje})
				/* Estamos obteniendo el array guardado dentro del objeto que nos trajo la API */
				store.characterData.results.map(elem => currentCharactersData.push(elem))
				
				/* estamos guardando la data que venia DENTRO del array "results" */
				setStore({...store, currentCharacter: currentCharactersData})
				console.log(store.currentCharacter)
				
			} catch(error){
				console.error("Error fetching data2:", error)
			}		
		},

		fetchCharacterDetails: async () => {
			const store = getStore()
		},

		}
	};
};

export default getState;
