import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			nome: 'Andrielysson'
		};

		this.entrar = this.entrar.bind(this);
	}

	entrar(nome){
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
			<View>
				<Text style={{marginTop: 100, fontSize: 25}}>Olá Mundo!!!!</Text>
				<Text style={{fontSize: 25}}>Meu primeiro App</Text>

				<Button
					title='Mudar nome do state'
					onPress={ () => this.entrar('Batata') }
				/>

				<Text 
					style={{
						fontSize: 25,
						color: 'red',
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



export default App;