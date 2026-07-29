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
            documento : null,
            telefone : null,
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
        this.formatarNumero = this.formatarNumero.bind(this);
        this.formatarDocumento = this.formatarDocumento.bind(this);
        this.validarDocumento = this.validarDocumento.bind(this);
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
                        <TextInput style={styles.inputText} value={this.state.nome} placeholder='Digite o seu nome...' onChangeText={ (valor) => {this.setState({ nome : valor })} }/>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>CPF</Text>
                        <TextInput style={styles.inputText} value={this.state.documento} keyboardType="numeric" placeholder='Digite o seu documento...' onChangeText={this.formatarDocumento}/>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Telefone</Text>
                        <TextInput style={styles.inputText} value={this.state.telefone} keyboardType="numeric" placeholder='Digite o seu telefone...' onChangeText={this.formatarNumero}/>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Idade</Text>
                        <TextInput style={styles.inputText} value={this.state.idade} keyboardType="numeric" placeholder='Digite a sua idade...' onChangeText={ (valor) => {this.setState({ idade : valor })} }/>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Sexo</Text>
                        <Picker
                            style={styles.inputText} 
                            selectedValue={this.state.sexo}
                            value={this.state.sexo}
                            onValueChange={ (itemValue, itemIdex) => {this.setState({sexo: this.state.sexoOptions[itemIdex].label})}}
                        >
                            {sexoOptions}
                        </Picker>
                    </View>

                    <View style={styles.areaCampo}>
                        <Text style={styles.labelCampo}>Limite de Crédito</Text>
                        <View style={[styles.areaInline, styles.areaCampo]}>
                            <Slider
                                style={{width: 370}}
                                minimumValue={0}
                                maximumValue={500}
                                value={this.state.limiteCredito}
                                onValueChange={(value) => {this.setState({limiteCredito: value})}}
                            />
                            <Text style={[styles.labelCampo, {width: 85}]}>R$ {this.state.limiteCredito.toFixed(2)}</Text>
                        </View>
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
        let msgAlertError = 'Preencha corretamente os campos abaixo para continuar:';
        msgAlertError = (this.state.nome            != null && this.state.nome          != '')  ? msgAlertError : msgAlertError + '\n   - Nome';
        msgAlertError = (this.state.idade           != null && this.state.idade         != '')  ? msgAlertError : msgAlertError + '\n   - Idade';
        msgAlertError = (this.state.telefone        != null && this.state.telefone      != '' && this.state.telefone.length == 16)  ? msgAlertError : msgAlertError + '\n   - Telefone';
        msgAlertError = (this.state.documento       != null && this.state.documento     != '' && this.state.documento.length == 14) ? msgAlertError : msgAlertError + '\n   - CPF';
        msgAlertError = (this.state.sexo            != null && this.state.sexo          != '' && this.state.sexo != '-- Selecione --') ? msgAlertError : msgAlertError + '\n   - Sexo';
        msgAlertError = (this.state.limiteCredito   != null && this.state.limiteCredito != '' && this.state.limiteCredito != '0') ? msgAlertError : msgAlertError + '\n   - Limite de Crédito';
        
        if (msgAlertError != 'Preencha corretamente os campos abaixo para continuar:') {
            alert(msgAlertError);
            return;
        }
        
        if (!this.validarDocumento(this.state.documento)) {
            alert('Documento fornecido é inválido');
            return;
        }
        
        console.log('TESTE::: ' + this.state.documento);
        let docDuplicado = false;
        this.listClientes.forEach((item, idex) =>{
            console.log('>>>> ' + item.documento);
            
            if (this.state.documento == item.documento){
                docDuplicado = true;
            }
        });
        
        if (docDuplicado) {
            alert('Documento fornecido já está cadastrado');
            return;
        }

        let novoCliente = {
            nome            : this.state.nome,
            documento       : this.state.documento,
            telefone        : this.state.telefone,
            idade           : this.state.idade,
            sexo            : this.state.sexo,
            limiteCredito   : this.state.limiteCredito.toFixed(2),
            extudante       : this.state.extudante,
            createdDate     : new Date().toISOString()
        }

        this.listClientes.unshift(novoCliente);
        this.setState({
            nome : null,
            idade : null,
            documento : null,
            telefone : null,
            sexo : '',
            limiteCredito : 250,
            extudante : false,
            clientes: this.listClientes
        })
        console.log(JSON.stringify(this.listClientes));
        
    }

    formatarNumero(texto){
		// Remove tudo que não for número
		texto = texto.replace(/[^0-9]/g, '');
		// Limita a 11 dígitos
		texto = texto.substring(0, 11);

		if (texto.length <= 2 && texto.length > 0) {
			texto = texto.replace(/^(\d*)/, '($1');

		} else if (texto.length <= 6) {
			texto = texto.replace(/^(\d{2})(\d+)/, '($1) $2');

		} else if (texto.length < 10) {
			texto = texto.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
		
		} else if (texto.length === 10) {
			// TELEFONE FIXO => (11) 3456-7890
			texto = texto.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
		
		} else if (texto.length === 11) {
			// TELEFONE MOVEL => (11) 9 8765-4321
			texto = texto.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
		
		} else {
			texto = texto.replace(/^(\d{2})(\d+)/, '($1) $2');
		}

		this.setState({
			telefone: texto
		});
	}

    formatarDocumento(texto){
        // Remove tudo que não for número
		texto = texto.replace(/[^0-9]/g, '');
		// Limita a 11 dígitos
		texto = texto.substring(0, 11);

		if (texto.length > 3 && texto.length <= 6) {
			texto = texto.replace(/^(\d{3})(\d+)/, '$1.$2');

		} else if (texto.length > 6 && texto.length <= 9) {
			texto = texto.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
		
		} else if (texto.length > 9) {
			// TELEFONE FIXO => (11) 3456-7890
			texto = texto.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
		}

		this.setState({
			documento: texto
		});
    }

    validarDocumento(cpf){
        if (typeof cpf !== 'string') return false;
        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        // Valida 1º dígito
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        // Valida 2º dígito
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
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