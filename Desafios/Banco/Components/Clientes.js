import { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

export default class Clientes extends Component{
    render(){
        let dataCriacao = this.props.infoCliente.createdDate.getDate() + '/' +
                          this.props.infoCliente.createdDate.getMonth() + '/' +
                          this.props.infoCliente.createdDate.getFullYear() + ' ' +
                          this.props.infoCliente.createdDate.getHours() + ':' + 
                          this.props.infoCliente.createdDate.getMinutes() + ':' +
                          this.props.infoCliente.createdDate.getSeconds();

        return(
            <View style={styles.container}>
                <View style={styles.cliente}>
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Cliente: </Text>
                        <Text style={styles.clienteValue}>{this.props.infoCliente.nome}</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>CPF: </Text>
                        <Text style={styles.clienteValue}>{this.props.infoCliente.documento}</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Telefone: </Text>
                        <Text style={styles.clienteValue}>{this.props.infoCliente.telefone}</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Idade: </Text>
                        <Text style={styles.clienteValue}>{this.props.infoCliente.idade} anos</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Sexo: </Text>
                        <Text style={styles.clienteValue}>{this.props.infoCliente.sexo}</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Limite de Crédito: </Text>
                        <Text style={styles.clienteValue}>R$ {this.props.infoCliente.limiteCredito}</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Estudante: </Text>
                        <Text style={styles.clienteValue}>{this.props.infoCliente.estudante ? 'Sim' : 'Não'}</Text>
                    </View> 
                    <View style={styles.infoCliente}>
                        <Text style={styles.clienteLabel}>Criado em: </Text>
                        <Text style={styles.clienteValue}>{dataCriacao}</Text>
                    </View> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 40
    },

    cliente:{
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        margin: 15,
        borderRadius: 15,
        backgroundColor: '#00aeef'
    },

    infoCliente:{
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    
    clienteLabel:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    
    clienteValue:{
        fontSize: 20,
        color: '#fff'
    }
});