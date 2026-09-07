import React, {useState, useEffect, useMemo, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
	const [nome, setNome] = useState('');
	const [input, setInput] = useState('');
	const nomeInput = useRef(null);

	// ComponentDidMount => ConnectedCallback
	useEffect(() => {
		async function getStorage(){
			const nomeStorage = await AsyncStorage.getItem('nomes');
			if(nomeStorage !== null){
				setNome(nomeStorage);
			}
		}

		getStorage();

		// return () => {} 
	}, []);

	// Trigger do state 'nome'
	useEffect(() => {
		async function saveStorage(){
			await AsyncStorage.setItem('nomes', nome);
		}

		saveStorage();
	}, [nome]);

	// Trigger do state 'nome' => useMemo
	const letrasNome = useMemo(() => {
		console.log('Calculando letras do nome');
		return nome.length
	}, [nome]);

	return (
		<View style={styles.container}>
			
			<TextInput 
				style={styles.textInput}
				placeholder="Digite seu nome"
				value={input}
				ref={nomeInput}
				onChangeText={(texto) => setInput(texto)}
			/>
			<Text style={styles.texto}>{nome}</Text>
			<Text style={styles.texto}>Tem {letrasNome} letras</Text>

			<TouchableOpacity style={styles.btn} onPress={alterarNome}>
				<Text style={styles.btnText}>Alterar Nome</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.btn} onPress={novoNome}>
				<Text style={styles.btnText}>Novo Nome</Text>
			</TouchableOpacity>
		</View>
	);

	function alterarNome(){
		setNome(input);
		setInput('');
	}

	function novoNome(){
		nomeInput.current.focus();
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
		marginTop: 10,
	},	
	btnText:{
		fontSize: 20,
		color: '#fff',
	},	
});
