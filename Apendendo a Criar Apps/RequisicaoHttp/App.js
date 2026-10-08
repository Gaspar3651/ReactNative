import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';

import Api from './src/services/api';
import Filme from './Components/Filme.js';

export default function App() {
	const [filmes, setFilmes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		async function loadFilmes() {
			const response = await Api.get('/r-api/?api=filmes');
			setFilmes(response.data);
			setLoading(false);
		}

		loadFilmes();
	}, []);

	if(loading) {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator color="#09A9FF" size={50}/>
			</View>
		);
	}else{
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

}

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		marginLeft: 20,
		marginRight: 20,
		flex: 1,
	},
});
