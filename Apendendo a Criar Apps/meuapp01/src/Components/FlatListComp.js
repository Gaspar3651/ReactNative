import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { Component } from 'react';
import Pessoas from './Pessoas';


export default class FlatListComp extends Component {
    constructor(props){
		super(props);
		this.state = {
			feed: [
				{id: '1', nome: 'Andrielysson',	idade: '18', email: 'teste@gmail.com'	},
				{id: '2', nome: 'Matheus', 		idade: '22', email: 'batata@gmail.com'	},
				{id: '3', nome: 'Henrique',		idade: '29', email: 'henrique@gmail.com'},
				{id: '4', nome: 'Paulo', 		idade: '15', email: 'paulo@gmail.com'	}
			]
		};
	}

    render(){
        let img = 'https://sujeitoprogramador.com/steve.png';
        
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed}
                    keyExtrator={(item)=> item.id}
                    renderItem={({ item }) => (
                        <Pessoas data={item}/>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
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