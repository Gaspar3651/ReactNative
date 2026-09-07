import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
	const [nome, setNome] = useState('Andrielysson');
	const [input, setInput] = useState('');

	return (
		<View style={styles.container}>
			
			<TextInput 
				style={styles.textInput}
				placeholder="Digite seu nome"
				value={input}
				onChangeText={(texto) => setInput(texto)}
			/>
			<Text style={styles.texto}>{nome}</Text>

			<TouchableOpacity style={styles.btn} onPress={alterarNome}>
				<Text style={styles.btnText}>Alterar Nome</Text>
			</TouchableOpacity>
		</View>
	);

	function alterarNome(){
		setNome(input);
		setInput('');
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
		marginLeft: 15,
		marginRight: 15,
	},
	texto:{
		fontSize: 30,
	},	
	btn:{
		backgroundColor: '#222',
		alignItems: 'center',
	},	
	btnText:{
		fontSize: 20,
		color: '#fff',
	},	
});
