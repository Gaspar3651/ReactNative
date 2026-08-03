import { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import ModalResult from './src/Components/ModalResult';
export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			precoAlcool: 0,
			precoGasolina: 0,
			modalResultVisible: false,
		};

		this.changeField = this.changeField.bind(this);
		this.calcular = this.calcular.bind(this);
		this.fecharModal = this.fecharModal.bind(this);
	}

	render(){
		return (
			<View style={styles.container}>
				<View style={styles.logoView}>
					<Image source={require('./src/img/logo.png')}></Image>
					<Text style={styles.titulo}>Qual a melhor opção?</Text>
				</View>

				<View>
					<Text style={styles.labelInput}>Álcool (preço por litro):</Text>
					<TextInput keyboardType="numeric" value={this.state.precoAlcool} style={styles.inputField} onChangeText={(value) => {this.changeField('alcool', value)}}/>
				</View>

				<View>
					<Text style={styles.labelInput}>Gasolina (preço por litro):</Text>
					<TextInput keyboardType="numeric" value={this.state.precoGasolina} style={styles.inputField} onChangeText={(value) => {this.changeField('gasolina', value)}}/>
				</View>

				<TouchableOpacity style={styles.btnCalcular} onPress={this.calcular}>
					<Text style={styles.labelInput}>Calcular</Text>
				</TouchableOpacity>

				{/* <ModalResult compensaUsar={this.state.compensaUsar} precoAlcool={this.state.precoAlcool} precoGasolina={this.state.precoGasolina} fechar={() => this.fecharModal()}/> */}
			</View>
		);
	}

	changeField( field, value ){
		if(field === 'alcool'){
			this.setState({ precoAlcool: value });
		}else if(field === 'gasolina'){
			this.setState({ precoGasolina: value });
		}
	}

	calcular(){
		Keyboard.dismiss();
		
		const precoAlcool = this.state.precoAlcool;
		const precoGasolina = this.state.precoGasolina;

		if(precoAlcool && precoGasolina){
			const resultado = precoAlcool / precoGasolina;
			if(resultado >= 0.7){
				this.setState({ 
					modalResultVisible: true,
					compensaUsar: 'Melhor abastecer com Gasolina',
				});
			}else{
				this.setState({ 
					modalResultVisible: true,
					compensaUsar: 'Melhor abastecer com Álcool',
				});
			}
			
		}else{
			alert('Preencha os preços primeiro!');
		}
	}

	fecharModal(){
		this.setState({ modalResultVisible: false });
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#212121',
		paddingLeft: 20,
		paddingRight: 20,
	},

	logoView: {
		backgroundColor: '#212121',
		justifyContent: 'center',
		alignItems: 'center',
	},

	titulo:{
		color: '#FFF',
		fontSize: 30,
		marginTop: 20,
		marginBottom: 20
	},

	labelInput:{
		color: '#FFF',
		fontSize: 20,
	},

	inputField:{
		backgroundColor: '#FFF',
		fontSize: 20,
		marginBottom: 20,
		borderRadius: 8,
	},

	btnCalcular:{
		backgroundColor: '#EF4130',
		color: '#FFF',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},

	btnCalcularNovamente:{
		backgroundColor: '#212121',
		color: '#EF4130',
	}
});
