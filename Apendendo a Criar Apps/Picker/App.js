import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state={
			pizza: null,
			pizzasList: [
				{key:1, nome:"Calabresa", 		valor: 60.79},
				{key:2, nome:"Brigadeiro", 		valor: 25.84},
				{key:3, nome:"Strogonoff", 		valor: 55.95},
				{key:4, nome:"Quatro queijos",	valor: 37.99}
			]
		}
	}

	render(){
		let pizzasItem = this.state.pizzasList.map((item, index) => {
			return <Picker.Item style={styles.pizzas} key={index} value={index} label={item.nome}/>
		});

		return(
			<View style={styles.container}>
				<Text style={styles.logo}>Menu Pizza</Text>

				<Picker
					selectedValue={this.state.pizza}
					onValueChange={ (itemValue, itemIndex) => {this.setState({pizza: itemValue})} }
				>
					{pizzasItem}
				</Picker>

				<Text style={styles.pizzas}>{this.state.pizza == null ? '' :  'Você escolheu: Pizza ' + this.state.pizzasList[this.state.pizza].nome}</Text>
				<Text style={styles.pizzas}>{this.state.pizza == null ? '' :  'R$ ' + this.state.pizzasList[this.state.pizza].valor.toFixed(2)}</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({	
    container:{
        flex: 1,
		marginTop: 80,
		padding: 20
    },

    logo:{
		textAlign: 'center',
		fontSize: 28,
		fontWeight: 'bold'
	},
	pizzas:{
		marginTop: 15,
		fontSize: 25,
		textAlign: 'center'
	}
});
