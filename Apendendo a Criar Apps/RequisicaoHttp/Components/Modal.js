import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Modal(props) {
    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={props.voltar}>
                    <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>Fechar</Text>
                </TouchableOpacity>

                <Text style={styles.titulo}>{props.filme.nome}</Text>
                <Text style={styles.sinopse}>Sinopse do Filme:</Text>
                <Text style={styles.descricao}>{props.filme.sinopse}</Text>
            </View>
            

        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
		marginLeft: 20,
		marginRight: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
	},
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalContainer: {
        height: '80%',
        backgroundColor: '#121212',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '95%',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        color: '#fff',
    },
    sinopse: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 10,        
    },
    descricao: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,        
        marginRight: 10,        
    }
});
