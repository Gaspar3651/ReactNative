import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			nome: 'Andrielysson'
		};

		this.mudarNome = this.mudarNome.bind(this);
	}

	mudarNome(nome){
		if (this.state.nome == 'Andrielysson') {
			this.setState({
				nome: nome
			});
		} else {
			this.setState({
				nome: 'Andrielysson'
			});
		}
	}

	render(){
		let nome = 'Andrielysson';
		let img = 'https://sujeitoprogramador.com/steve.png';
		
		return(
			<View style={styles.container} >
				<Text style={{fontSize: 25}}>Olá Mundo!!!!</Text>
				<Text style={{fontSize: 25}}>Meu primeiro App</Text>

				<Button
					title='Mudar nome do state'
					onPress={ () => this.mudarNome('Batata') }
				/>

				<Text 
					style={{
						fontSize: 25,
						textAlign: 'center'
					}}
				>
					Nome com state: {this.state.nome}
				</Text>

				<Text 
					style={{
						fontSize: 25,
						marginTop: 15,
						marginLeft: 15
					}}
				>
					Sujeito Programador: {nome}
				</Text>

				<Jobs
					largura={400}
					altura={400}
					nome="Steve Jobs"
				/>

				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 01</Text>
				<Text style={styles.alinhaTexto}>Texto 02</Text>
				<Text style={styles.alinhaTexto}>Texto 03</Text>
				<Text style={styles.alinhaTexto}>Texto 04</Text>
			</View>
		);
	}
}

class Jobs extends Component {
	render(){
		let img = 'https://sujeitoprogramador.com/steve.png';
		
		return(
			<View>
				<Text style={{ fontSize: 25, margin: 15 }} >{this.props.nome}</Text>
				<Image
					source={{ uri: img }}
					style={{ 
						width: this.props.largura, 
						height: this.props.altura 
					}}
					onPress={ () => this.entrar('Batata') }
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		marginTop: 100,
		marginLeft: 25,
		marginRight: 25
	},

	textoPrincipal:{
		fontSize: 35,
		color: 'red'
	},

	alinhaTexto:{
		textAlign: 'center'
	}
});

export default App;