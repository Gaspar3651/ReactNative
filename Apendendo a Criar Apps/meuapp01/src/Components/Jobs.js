import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { Component } from 'react';

export default class Jobs extends Component {
    render(){
        let img = 'https://sujeitoprogramador.com/steve.png';
        
        return(
            <View>
                <Text style={{ fontSize: 25, margin: 15 }} >{this.props.nome}</Text>
                <Image
                    source={{ uri: img }}
                    style={{ width: this.props.largura, height: this.props.altura, margin: 'auto' }}
                    onPress={ () => this.entrar('Batata') }
                />
            </View>
        );
    }
}