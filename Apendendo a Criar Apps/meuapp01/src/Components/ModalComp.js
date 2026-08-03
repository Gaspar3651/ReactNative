import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView, Modal } from 'react-native';
import React, { Component } from 'react';

class ModalComp extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalVisible: this.props.modalVisible
        }
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={{paddingTop: 12, color: '#fff', fontSize: 28, textAlign: 'center'}}>Modal</Text>
				<Button title='Fechar' onPress={ this.props.fechar}/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		backgroundColor: '#292929e8', 
		with: '100%', 
		height: 350, 
		borderRadius: 20		
	}
});

export default ModalComp;