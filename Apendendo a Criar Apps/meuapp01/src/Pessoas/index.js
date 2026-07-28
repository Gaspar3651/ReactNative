import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView } from 'react-native';

class Pessoa extends Component {
    render(){
        return(
            <View style={styles.areaPessoa}>
                <Text style={styles.textoPessoa}>Nome: {this.props.data.nome}</Text>
                <Text style={styles.textoPessoa}>Idade: {this.props.data.idade}</Text>
                <Text style={styles.textoPessoa}>Email: {this.props.data.email}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({	
	areaPessoa:{
		backgroundColor: '#222',
		height: 100
	},

	textoPessoa:{
		color: '#fff',
		fontSize: 20
	}
});

export default Pessoa;
