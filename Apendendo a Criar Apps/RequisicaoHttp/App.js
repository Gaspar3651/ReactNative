import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';

import Api from './src/services/api';
import Filme from './Components/Filme.js';

export default function App() {
	const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		async function loadFilmes() {
			const response = await Api.get('/r-api/?api=filmes');
			setFilmes(response.data);
			// console.log(response.data);
		}

		loadFilmes();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={filmes}
				keyExtractor={(item) => String(item.id)}
				renderItem={({item}) => (
					<Filme data={item}/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		marginLeft: 20,
		flex: 1,
	},
});
