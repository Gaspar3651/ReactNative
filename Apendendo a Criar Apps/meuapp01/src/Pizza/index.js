import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, FlatList, ScrollView } from 'react-native';

class Pizza extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.logo}>Menu Pizza</Text>

                <Text style={styles.pizzas}>Você escolheu: Piza Calabresa</Text>
                <Text style={styles.pizzas}>R$ 59,90</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({	
    container:{
        flex: 1
    },

    logo:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28
    },

    pizzas:{
        fontSize: 20,
        marginTop: 15
    }
});

export default Pizza;
