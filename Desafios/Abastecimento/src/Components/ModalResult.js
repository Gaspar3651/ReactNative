import { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, Modal} from 'react-native';

export default class ModalResult extends Component {
	constructor(props){
		super(props);
		this.state = {
            compensaUsar: this.props.compensaUsar,
            precoAlcool: this.props.precoAlcool,
            precoGasolina: this.props.precoGasolina,
            modalResultVisible: this.props.modalResultVisible
		};
	}

	render(){
		return (
            <Modal visible={this.state.modalResultVisible} animationType="slide">
                <View style={styles.logoView}>
                    <Image source={require('../img/gas.png')}></Image>
                    <Text style={styles.titulo}>{this.state.compensaUsar}</Text>
                </View>

                <View>
                    <Text style={styles.labelInput}>Com os preços:</Text>
                    <Text style={styles.labelInput}>Álcool {this.state.precoAlcool}:</Text>
                    <Text style={styles.labelInput}>Gasolina {this.state.precoGasolina}:</Text>
                </View>

                <TouchableOpacity style={styles.btnCalcular} onPress={this.props.fechar}>
                    <Text style={styles.labelInput}>Calcular novamente</Text>
                </TouchableOpacity>
            </Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#212121',
		paddingLeft: 20,
		paddingRight: 20,
	},

	logoView: {
		backgroundColor: '#212121',
		justifyContent: 'center',
		alignItems: 'center',
	},

	titulo:{
		color: '#FFF',
		fontSize: 30,
		marginTop: 20,
		marginBottom: 20
	},

	labelInput:{
		color: '#FFF',
		fontSize: 20,
	},

	inputField:{
		backgroundColor: '#FFF',
		fontSize: 20,
		marginBottom: 20,
		borderRadius: 8,
	},

	btnCalcular:{
		backgroundColor: '#EF4130',
		color: '#FFF',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},

	btnCalcularNovamente:{
		backgroundColor: '#212121',
		color: '#EF4130',
	}
});
