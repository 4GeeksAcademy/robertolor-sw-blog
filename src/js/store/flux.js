const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			generalData: [],
			characterData: [],

		},
			
		actions: {
		
		fetchData: async () => {
			/* let initialData = []; */
			const store = getStore();
			try {
				let response = await fetch("https://www.swapi.tech/api/");
				if(!response.ok){throw new Error ("Network response from API was not OK")};

				let data = await response.json();
				console.log(data)
				
				/* initialData.push(data); */
				setStore({...store, generalData: data.result}) 
				console.log(store.generalData.people)
				console.log(`${store.generalData.people}`)
			}catch(error){
				console.error("Error fetching data:", error);
			}
		},
		
		fetchCharacterData: async () => {
			const store = getStore()
			let currentCharacters = []
			console.log(`"${store.generalData.people}"`)
			try{
				let response = await fetch(`"${store.generalData.people}"`)
				if (!response.ok){throw new Error("error fetching Character data.")};
				
				let data = await response.json();
				setStore({...store, characterData: data})

				store.characterData.map(elem => currentCharacters.push(elem))
				console.log(currentCharacters)


			}catch(error){
				console.error("Error fetching data2:", error)
			}

		}

		}
	};
};

export default getState;
