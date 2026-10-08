import { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default class Filme extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>{this.props.data.nome}</Text>
                <Text style={{fontSize: 20}}>{this.props.data.sinopse}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});