import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView, Modal } from 'react-native';
import React, { Component } from 'react';

import Header 			from './src/Components/Header';
import Footer 			from './src/Components/Footer';
import Jobs 			from './src/Components/Jobs';
import FlatListComp 	from './src/Components/FlatListComp';
import SwitchComp 		from './src/Components/SwitchComp';
import ModalComp 		from './src/Components/ModalComp';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			nome: '',
			inputNome: '',
			numero: '',
			modalVisible: false,
			feed: [
				{id: '1', nome: 'Andrielysson',	idade: '18', email: 'teste@gmail.com'	},
				{id: '2', nome: 'Matheus', 		idade: '22', email: 'batata@gmail.com'	},
				{id: '3', nome: 'Henrique',		idade: '29', email: 'henrique@gmail.com'},
				{id: '4', nome: 'Paulo', 		idade: '15', email: 'paulo@gmail.com'	}
			]
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

				<ScrollView>
					<View style={[styles.body]}>
						<Text style={{fontSize: 25}}>Olá Mundo !!!!</Text>
						<Text style={{fontSize: 25}}>Meu primeiro App</Text>


						<TextInput style={styles.input} placeholder='Digite seu nome...' onChangeText={(texto) => {this.setState({inputNome: texto})}}/>
						<TextInput style={styles.input} placeholder='Digite seu número...' onChangeText={this.formatarNumero}/>
						<Button title='Entrar' onPress={ () => this.entrar() }/>

						<Text style={{fontSize: 25}}>{this.state.nome}</Text>
						<Text style={{fontSize: 25}}>{this.state.numero}</Text>
						
						<Modal transparent={true} animationType='slide' visible={this.state.modalVisible}>
							<View style={{flex: 1, justifyContent: 'center', margin: 15, with: '100%'}}>
								<ModalComp fechar={()=> this.setState({modalVisible: false})}/>
							</View>
						</Modal>

						<SwitchComp/>
						
						{/* <FlatListComp/> */}
						{/* <Jobs largura={400} altura={400} nome="Steve Jobs"/> */}
					</View>
				</ScrollView>
				
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

		this.setState({
			// nome: 'Bem Vindo: ' + this.state.inputNome,
			modalVisible: true
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

const styles = StyleSheet.create({
	container:{
		flex: 1,
		marginTop: 50,
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
});

export default App;