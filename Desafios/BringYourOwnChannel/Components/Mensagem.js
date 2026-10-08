import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function formatarHora(timestamp) {
	const data = new Date(timestamp);
	const horas = String(data.getHours()).padStart(2, '0');
	const minutos = String(data.getMinutes()).padStart(2, '0');
	return horas + ':' + minutos;
}

export default function Mensagem({ data }) {
	const ehCliente = data.sender?.role === 'EndUser';

	return (
		<View style={[styles.linha, ehCliente ? styles.linhaDireita : styles.linhaEsquerda]}>
			<View style={[styles.balao, ehCliente ? styles.balaoCliente : styles.balaoBot]}>
				{!ehCliente && (
					<Text style={styles.remetente}>{data.sender?.subject || 'Chatbot'}</Text>
				)}
				<Text style={ehCliente ? styles.textoCliente : styles.textoBot}>
					{data.messageText}
				</Text>
				<Text style={[styles.hora, ehCliente ? styles.horaCliente : styles.horaBot]}>
					{formatarHora(data.clientTimestamp || data.serverReceivedTimestamp)}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	linha: {
		flexDirection: 'row',
		marginVertical: 4,
		paddingHorizontal: 12,
	},
	linhaDireita: {
		justifyContent: 'flex-end',
	},
	linhaEsquerda: {
		justifyContent: 'flex-start',
	},
	balao: {
		maxWidth: '80%',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 16,
	},
	balaoCliente: {
		backgroundColor: '#09A9FF',
		borderBottomRightRadius: 4,
	},
	balaoBot: {
		backgroundColor: '#ECEFF1',
		borderBottomLeftRadius: 4,
	},
	remetente: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#546E7A',
		marginBottom: 2,
	},
	textoCliente: {
		color: '#fff',
		fontSize: 15,
	},
	textoBot: {
		color: '#263238',
		fontSize: 15,
	},
	hora: {
		fontSize: 11,
		marginTop: 4,
		alignSelf: 'flex-end',
	},
	horaCliente: {
		color: '#E1F5FE',
	},
	horaBot: {
		color: '#90A4AE',
	},
});
