import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			texoFrase: '',
			img: require('./src/biscoito.png')
		};

		this.quebraBiscoito = this.quebraBiscoito.bind(this);

		this.frases = [
			'Siga os bons e aprenda com eles.',
			'O bom-senso vale mais do que muito conhecimento.',
			'O riso é a menor distância entre duas pessoas.',
			'Deixe de lado as preocupações e seja feliz.',
			'Realize o óbvio, pense no improvável e conquiste o impossível.',
			'Acredite em milagres, mas não dependa deles.',
			'A maior barreira para o sucesso é o medo do fracasso.'
		];
	}

	render(){
		return (
			<View style={styles.container}>
				
				<Image source={this.state.img} style={styles.imagem}/>
				<Text style={styles.textoFrase}>{this.state.texoFrase}</Text>

				<TouchableOpacity style={styles.btn} onPress={this.quebraBiscoito}>
					<View style={styles.btnArea}>
						<Text style={styles.btnTexto}>Quebrar Biscoito</Text>
					</View>
				</TouchableOpacity>
				
				<StatusBar style="auto" />
			</View>
		);
	}

	quebraBiscoito(){
		let numeroAleatorio = Math.floor(Math.random() * this.frases.length);

		this.setState({
			texoFrase: '"' + this.frases[numeroAleatorio] + '"',
			img: require('./src/biscoitoAberto.png')
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	imagem:{
		width: 250,
		height: 250
	},

	textoFrase:{
		fontSize: 20,
		color: '#dd7b22',
		margin: 30,
		fontStyle: 'italic',
		textAlign: 'center'
	},

	btn:{
		width: 230,
		height: 50,
		borderWidth: 2,
		borderColor: '#dd7b22',
		borderRadius: 25
	},

	btnArea:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},

	btnTexto:{
		fontSize: 18,
		fontWeight: 'bold',
		color: '#dd7b22'
	}
});

export default App;