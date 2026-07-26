import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
class App extends Component {
	render(){
		
		let nome = 'Andrielysson';
		let img = 'https://sujeitoprogramador.com/steve.png';
		
		return(
			<View>
				<Text style={{marginTop: 100, fontSize: 25}}>Olá Mundo!!!!</Text>
				<Text>Meu primeiro App</Text>
				<Text>Batata!</Text>
				<Text style={{ color: 'red', fontSize: 25, margin: 15 }}>
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
					/>
			</View>
		);
	}
}



export default App;