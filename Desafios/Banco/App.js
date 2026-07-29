import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Banco</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        padding: 15
    },
    
    title:{
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});