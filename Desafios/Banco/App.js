import { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, ScrollView, TouchableOpacity } from 'react-native';

import { Picker }   from '@react-native-picker/picker';
import Slider       from '@react-native-community/slider';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            nome : null,
            idade : null,
            sexo : null,
            limiteCredito : 250,
            extudante : false,
            clientes: [],
            sexoOptions: [
                {id: 0, label: '-- Selecione --'        , value: ''},
                {id: 1, label: 'Masculino'              , value: 'M'},
                {id: 2, label: 'Feminino'               , value: 'F'},
                {id: 3, label: 'Prefiro não responder'  , value: 'PNR'}
            ]
        };

        this.listClientes = [];
        this.cadastroCliente = this.cadastroCliente.bind(this);
    }

    render(){
        let sexoOptions = this.state.sexoOptions.map((item, index) => {
            return <Picker.Item style={styles.inputText} key={index} value={item.value} label={item.label}/>
        });

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Banco</Text>
                <ScrollView>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Nome</Text>
                        <TextInput style={styles.inputText} placeholder='Digite o seu nome...' onChangeText={ (valor) => {this.setState({ nome : valor })} }/>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Idade</Text>
                        <TextInput style={styles.inputText} keyboardType="numeric" placeholder='Digite a sua idade...' onChangeText={ (valor) => {this.setState({ idade : valor })} }/>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Sexo</Text>
                        <Picker
                            style={styles.inputText} 
                            selectedValue={this.state.sexo}
                            onValueChange={ (itemValue, itemIdex) => {this.setState({sexo: this.state.sexoOptions[itemIdex].label})}}
                        >
                            {sexoOptions}
                        </Picker>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Limite de Crédito</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={500}
                            value={this.state.limiteCredito}
                            onValueChange={(value) => {this.setState({limiteCredito: value})}}
                        />
                    </View>

                    <View style={[styles.areaInline, styles.areaCampo]}>
                        <Text style={[styles.labelCampo]}>É estudante?</Text>
                        <Switch
                            value={this.state.extudante}
                            label='Teste'
                            onValueChange={(value) => {this.setState({extudante: value})}}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={this.cadastroCliente}>
                        <Text style={styles.btnTexto}>Cadastrar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    cadastroCliente(){
        let msgAlert = 'Preenchar os campos para continuar:';
        msgAlert = (this.state.nome != null && this.state.nome != '') ? msgAlert : msgAlert + '\n   - Nome';
        msgAlert = (this.state.idade != null && this.state.idade != '') ? msgAlert : msgAlert + '\n   - Idade';
        msgAlert = (this.state.sexo != null && this.state.sexo != '' && this.state.sexo != '-- Selecione --') ? msgAlert : msgAlert + '\n   - Sexo';
        
        if (msgAlert != 'Preenchar os campos para continuar:') {
            alert(msgAlert);
            return;
        }

        let novoCliente = {
            nome            : this.state.nome,
            idade           : this.state.idade,
            sexo            : this.state.sexo,
            limiteCredito   : this.state.limiteCredito,
            extudante       : this.state.extudante,
            createdDate     : new Date().toISOString()
        }
        
        this.listClientes.unshift(novoCliente);
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
    },

    areaCampo:{
        marginBottom: 20
    },
    
    labelCampo:{
        fontSize: 20
    },
    
    inputText:{
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 15,
        fontSize: 20
    },
    
    areaInline:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    btn:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00aeef',
        height: 40,
        margin: 17,
        borderRadius: 15
    },

    btnTexto:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
});