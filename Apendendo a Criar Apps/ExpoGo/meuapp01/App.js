import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			nome: 'Andrielysson',
			btn: 'Batata'
		};

		this.mudarNome = this.mudarNome.bind(this);
	}

	mudarNome(nome){
		this.setState({
			nome: this.state.btn,
			btn: this.state.nome,
		});
	}

	render(){
		let img = 'https://sujeitoprogramador.com/steve.png';
		let nameBtn = 'Mudar nome do state para ' + this.state.btn;
		
		return(
			<View style={styles.container} >
				<View style={[styles.header]}></View>

				<View style={[styles.body]}>
					<Text style={{fontSize: 25}}>Olá Mundo!!!!</Text>
					<Text style={{fontSize: 25}}>Meu primeiro App</Text>

					<Button title={nameBtn} onPress={ () => this.mudarNome('Batata') }/>
					<Text  style={{ fontSize: 25, marginTop: 15, marginLeft: 15 }} >Sujeito Programador: {this.state.nome}</Text>

					<Jobs largura={400} altura={400} nome="Steve Jobs"/>

					<View style={[styles.flexBox]}>
						<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 01</Text>
						<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 02</Text>
						<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 03</Text>
						<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 04</Text>
					</View>
				</View>
				
				<View style={[styles.footer]}></View>
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
					style={{ width: this.props.largura, height: this.props.altura, margin: 'auto' }}
					onPress={ () => this.entrar('Batata') }
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		marginTop: 50,
	},

	header: {
		height: 70, 
		backgroundColor: '#ddd'
	},

	body: {
		flex: 1,
		padding: 25,
	},

	footer: {
		height: 70, 
		backgroundColor: '#ddd'
	},

	textoPrincipal:{
		fontSize: 25,
		color: 'red'
	},

	alinhaTexto:{
		textAlign: 'center'
	},

	flexBox:{
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default App;