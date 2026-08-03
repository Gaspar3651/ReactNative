import { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from 'react-native';

import Header from './src/Componentes/Header';
import Lista from './src/Componentes/Lista';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feed:[
				{id: '1', nome: 'Lucas', 			descricao: 'Mais um dia de muitos bugs', 	imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil1.png', imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto1.png', likeada: false, likers: 0},
				{id: '2', nome: 'Matheus', 			descricao: 'Isso sim é ser raiz!!!!!', 		imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil2.png', imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto2.png', likeada: false, likers: 0},
				{id: '3', nome: 'Jose', 			descricao: 'Bora trabalhar hahaha', 		imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil3.png', imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto3.png', likeada: false, likers: 3},
				{id: '4', nome: 'Gustavo', 			descricao: 'Isso sim que é TI!', 			imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil4.png', imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto4.png', likeada: false, likers: 1},
				{id: '5', nome: 'Guilherme', 		descricao: 'Boa tarde galera do insta...',	imgperfil: 'https://sujeitoprogramador.com/instareact/fotoPerfil5.png', imgPublicacao: 'https://sujeitoprogramador.com/instareact/foto5.png', likeada: false, likers: 32},
			]
		};
	}

	render(){
		return (
			<View style={styles.container}>
				<Header />

				<View style={styles.body}>
					<FlatList 
						ShowVerticalScrollIndicator={false}
						data={this.state.feed}
						keyExtractor={(item) => item.id}
						renderItem={ ({item}) => <Lista data={item}/>}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
