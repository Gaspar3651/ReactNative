import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, Switch } from 'react-native';

export default class SwitchComp extends Component{
    constructor(props){
        super(props);
        this.state={
            status: false
        };
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Switch
                    value={this.state.status}
                    thumbColor='red'
                    onValueChange={ (valueSwitch) => this.setState({status: valueSwitch}) }
                />

                <Text style={styles.texto}>O botão está: {this.state.status ? 'Ligado' : 'Desligado'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margingTop: 10
    },

    texto:{
        textAlign: 'right',
        fontSize: 30
    }
});