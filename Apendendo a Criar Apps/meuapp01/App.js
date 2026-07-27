import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet } from 'react-native';
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			nome: '',
			inputNome: '',
			numero: ''
		};

		this.mudarNome = this.mudarNome.bind(this);
		this.formatarNumero = this.formatarNumero.bind(this);
		this.entrar = this.entrar.bind(this);
	}

	render(){
		let img = 'https://sujeitoprogramador.com/steve.png';
		let nameBtn = 'Mudar nome do state para ' + this.state.btn;
		
		return(
			<View style={styles.container} >
				<Header/>

				<View style={[styles.body]}>
					<Text style={{fontSize: 25}}>Olá Mundo !!!!</Text>
					<Text style={{fontSize: 25}}>Meu primeiro App</Text>


					<TextInput style={styles.input} placeholder='Digite seu nome...' onChangeText={(texto) => {this.setState({inputNome: texto})}}/>
					<TextInput style={styles.input} placeholder='Digite seu número...' onChangeText={this.formatarNumero}/>
					<Button title='Entrar' onPress={ () => this.entrar() }/>

					<Text>{this.state.nome}</Text>
					<Text>{this.state.numero}</Text>
					
					<Jobs largura={400} altura={400} nome="Steve Jobs"/>
				</View>
				
				<Footer/>
			</View>
		);
	}

	mudarNome(nome){
		this.setState({
			nome: this.state.btn,
			btn: this.state.nome,
		});
	}

	entrar(){
		if (this.state.inputNome === '') {
			alert('Digite seu nome!');
			return;
		}
		
		this.setState({
			nome: 'Bem Vindo: ' + this.state.inputNome
		});
	}

	formatarNumero(texto){
		// Remove tudo que não for número
		texto = texto.replace(/[^0-9]/g, '');
		// Limita a 11 dígitos
		texto = texto.substring(0, 11);

		if (texto.length <= 2 && texto.length > 0) {
			texto = texto.replace(/^(\d*)/, '($1');

		} else if (texto.length <= 6) {
			texto = texto.replace(/^(\d{2})(\d+)/, '($1) $2');

		} else if (texto.length < 10) {
			texto = texto.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
		
		} else if (texto.length === 10) {
			// TELEFONE FIXO => (11) 3456-7890
			texto = texto.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
		
		} else if (texto.length === 11) {
			// TELEFONE MOVEL => (11) 9 8765-4321
			texto = texto.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
		
		} else {
			texto = texto.replace(/^(\d{2})(\d+)/, '($1) $2');
		}

		this.setState({
			numero: texto
		});
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

class Footer extends Component{
	render(){
		return(
			<View style={[styles.footer]}>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 01</Text>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 02</Text>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 03</Text>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 04</Text>
			</View>
		);
	}
}
class Header extends Component{
	render(){
		return(
			<View style={[styles.header]}>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 01</Text>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 02</Text>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 03</Text>
				<Text style={[styles.textoPrincipal, styles.alinhaTexto]}>Texto 04</Text>
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
		backgroundColor: '#ddd',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},

	body: {
		flex: 1,
		padding: 25,
	},

	input:{
		height: 45,
		borderWidth: 1,
		borderColor: '#222',
		padding: 10,
		marginBottom: 10,
		marginTop: 10
	},

	footer: {
		height: 70, 
		backgroundColor: '#ddd',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},

	textoPrincipal:{
		fontSize: 25,
		color: 'red'
	},

	alinhaTexto:{
		textAlign: 'center'
	}
});

export default App;