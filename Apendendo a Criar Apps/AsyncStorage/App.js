import { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			input: '',
			nome: '',
		}

		this.gravaBtn = this.gravaBtn.bind(this);
	}

	// componentDidMount - Quando  componente é montado em tela
	async componentDidMount(){
		await AsyncStorage.getItem('nome').then((value) =>{
			this.setState({nome: value});
		});
	}

	// componentDidUpdate - Quando o componente é atualizado
	async componentDidUpdate(prevProps, prevState){
		if(prevState.nome !== this.state.nome){
			await AsyncStorage.setItem('nome', this.state.nome);
		}
	}

	render(){
		return (
			<View style={styles.container}>
				<View style={styles.viewInput}>
					<TextInput
						style={styles.input}
						value={this.state.input}
						onChangeText={(text) => this.setState({input: text})}
						placeholder="Digite algo"
					/>

					<TouchableOpacity onPress={this.gravaBtn}>
						<Text style={styles.btn}>Salvar</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.nome}>{this.state.nome}</Text>
			</View>
		);
	}	

	gravaBtn(){
		this.setState({nome: this.state.input});
		Keyboard.dismiss();
		alert('Nome salvo com sucesso!');
		// AsyncStorage.setItem('nome', this.state.input);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 150,
	},

	viewInput:{
		flexDirection: 'row',
		alignItems: 'center',
	},

	input:{
		width: '80%',
		height: 40,
		borderWidth: 1,
		borderColor: '#121212',
		borderRadius: 5,
		padding: 10,
		marginLeft: 10,
	},

	btn:{
		backgroundColor: '#222',
		color: '#FFF',
		padding: 10,
		marginLeft: 10,
		borderRadius: 5,
	},

	nome:{
		fontSize: 25,
		textAlign: 'center',
		marginTop: 20,
	}
});
