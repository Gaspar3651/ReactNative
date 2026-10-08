import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from "react-native";

import ModalComponent from './Modal.js';

export default function Filme({data}){
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.card}>
            <Text style={styles.titulo}>{data.nome}</Text>
            <Image
                source={{uri: data.foto}}
                style={styles.capa}
            />

            <View style={styles.areaBotao}>
                <TouchableOpacity style={styles.botao} onPress={() => setModalVisible(true)}>
                    <Text style={styles.botaoTexto}>LEIA MAIS</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <ModalComponent filme={data} voltar={() => setModalVisible(false)}/>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        elevation: 2,
    },
    capa:{
        width: '100%', 
        height: 250,
        zindex: 2,
    },
    titulo:{
        padding: 15,
        fontSize: 30
    },
    areaBotao:{
        alignItems: 'flex-end',
        marginTop: -45,
        zindex: 9,
    },
    botao:{
        width: 100,
        backgroundColor: '#09A9FF',
        opacity: 1,
        padding: 8,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    botaoTexto:{
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});