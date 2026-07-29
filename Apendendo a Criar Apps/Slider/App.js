import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Slider from '@react-native-community/slider'

export default class App extends Component {
	constructor(props){
		super(props);
		this.state={
			valor: 50
		};
	}
	
	render(){
		return (
			<View style={styles.container}>
				<Slider
					minimumValue={0}
					maximumValue={100}
					value={this.state.valor}
					onValueChange={(value) => {this.setState({valor: value})}}
				/>
				<Text style={{textAlign: 'center', fontSize: 30}}>{this.state.valor.toFixed(0)}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 100,
		padding: 15
	},
});
