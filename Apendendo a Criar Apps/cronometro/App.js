import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            numero: 0,
            nomeIniciar: 'Iniciar',
            voltas: []
        };

        this.timer = null;
        this.controleVoltas = [];

        this.liparCronometro = this.liparCronometro.bind(this);
        this.iniciarCronometro = this.iniciarCronometro.bind(this);
        this.marcarVolta = this.marcarVolta.bind(this);
    }

    render(){
        return (
            <View style={styles.container}>
                <Image source={require('./src/cronometro.png')} style={styles.imgCronometro} />
                <Text style={styles.timer}>{this.state.numero.toFixed(2)}</Text>

                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.btn} onPress={this.iniciarCronometro}>
                        <Text style={styles.btnTexto}>{this.state.nomeIniciar}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={this.marcarVolta}>
                        <Text style={styles.btnTexto}>Volta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={this.liparCronometro}>
                        <Text style={styles.btnTexto}>Resetar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.voltasArea}>
                    <Text style={styles.voltas}>Voltas</Text>
                    <FlatList
                        style={styles.flatVoltas}
                        data={this.state.voltas}
                        renderItem={({ item }) => (
                            <Text style={styles.flatTexto}>{item}</Text>
                        )}
                    />
                </View>
            </View>
        );
    }

    liparCronometro(){
        if (this.timer != null) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({
            numero: 0,
            nomeIniciar: 'Iniciar',
            voltas: []
        });
        this.controleVoltas = [];
    }

    iniciarCronometro(){
        if (this.timer != null) {
            clearInterval(this.timer);
            this.timer = null;
            this.setState({
                nomeIniciar: 'Iniciar'
            });
        }else{
            this.timer = setInterval(() =>{
                this.setState({
                    numero: this.state.numero + 0.1,
                    nomeIniciar: 'Pausar'
                });
            }, 100);
        }
    }

    marcarVolta(){
        if (this.timer != null) {
            this.controleVoltas.unshift('Volta ' + (this.controleVoltas.length + 1) + ':  ' + this.state.numero.toFixed(2) + ' s');
    
            this.setState({
                voltas: this.controleVoltas
            });
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00aeef'
    },

    imgCronometro:{
       
    },

    timer:{
        marginTop: -160,
        color: '#fff',
        fontSize: 65,
        fontWeight: 'bold'
    },

    btnArea:{
        flexDirection: 'row',
        marginTop: 80,
        height: 40
    },

    btn:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 40,
        margin: 17,
        borderRadius: 15
    },

    btnTexto:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00aeef'
    },

    voltasArea:{
        marginTop: 40
    },

    voltas:{
        fontSize: 25,
        fontStyle: 'italic',
        color: '#fff',
        margin: 'auto'
    },

    flatVoltas:{
        width: 400,
        maxHeight: 200,
        color: '#000',
        borderRadius: 15,
        backgroundColor: '#fff'
    },

    flatTexto:{
        color: '#00aeef',
        fontSize: 25,
        margin: 'auto'
    }
});

export default App;