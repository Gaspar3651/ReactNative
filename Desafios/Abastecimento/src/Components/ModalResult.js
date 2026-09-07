import { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, Modal} from 'react-native';

export default class ModalResult extends Component {
	render(){	
		return (
            <Modal visible={this.props.modalResultVisible} animationType="slide" style={styles.container}>
                <View style={styles.logoView}>
                    <Image source={require('../img/gas.png')}></Image>
                    <Text style={styles.titulo}>{this.props.compensaUsar}</Text>
                </View>

                <View>
                    <Text style={styles.titulo02}>Com os preços:</Text>
                    <Text style={styles.labelInput}>Álcool: R$ {this.props.precoAlcool}</Text>
                    <Text style={styles.labelInput}>Gasolina: R$ {this.props.precoGasolina}</Text>
                </View>

                <TouchableOpacity style={styles.btnCalcular} onPress={this.props.fechar}>
                    <Text style={styles.labelBtn}>Calcular novamente</Text>
                </TouchableOpacity>
            </Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#212121', 
		with: '100%', 
		height: 350, 
		borderRadius: 20,		
		padding: 20,
		borderColor: '#EF4130',
		borderWidth: 1,
		marginVertical: 150,
		marginHorizontal: 30
	},

	logoView: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	titulo:{
		color: '#44ff00',
		fontWeight: 'bold',
		fontSize: 30,
		marginTop: 20,
		marginBottom: 20
	},

	titulo02:{
		color: '#fff',
		fontSize: 30,
		marginTop: 20,
		marginBottom: 10,
		fontWeight: 'bold',
		textAlign: 'center'
	},

	labelInput:{
		color: '#FFF',
		fontSize: 20,
		textAlign: 'center'
	},

	labelBtn:{
		color: '#EF4130',
		fontSize: 20,
		textAlign: 'center'
	},

	btnCalcular:{
		backgroundColor: '#212121',
		borderColor: '#EF4130',
		borderWidth: 1,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 20,
	},
});
