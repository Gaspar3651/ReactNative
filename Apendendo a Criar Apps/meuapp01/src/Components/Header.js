import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView } from 'react-native';

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
	header: {
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

export default Header;