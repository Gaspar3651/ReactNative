import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import * as Crypto from 'expo-crypto';

import getTokenApi from './Api/getToken';
import sendMsgApi from './Api/sendMsg';
import Mensagem from './Components/Mensagem';

// Mensagens do Chatbot podem vir sem clientTimestamp
function horario(entrada) {
	return entrada.clientTimestamp || entrada.serverReceivedTimestamp || 0;
}

export default function App() {
	const [mensagem, setMensagem] = useState('');
	const [mensagens, setMensagens] = useState([]);
	const [loading, setLoading] = useState(false);

	const tokenRef = useRef(null)
	const conversationIdentifierRef = useRef(null)
	const listaRef = useRef(null)
	const buscandoRef = useRef(false)

	// Busca a conversa a cada 1s para receber as respostas do Chatbot
	useEffect(() => {
		const intervalo = setInterval(buscarMensagens, 3000);

		return () => clearInterval(intervalo);
	}, []);

	async function buscarMensagens() {
		// Pula se ainda não há conversa ou se a busca anterior não terminou
		if (!conversationIdentifierRef.current || buscandoRef.current) {
			return;
		}

		buscandoRef.current = true;
		try {
			await getConversation();
		} finally {
			buscandoRef.current = false;
		}
	}

	async function getToken(){
		if (tokenRef.current) {
			return tokenRef.current;
		}

		const body = new URLSearchParams({
			grant_type: '{{grant_type}}',
			client_id: '{{client_id}}',
			client_secret: '{{client_secret}}'
		}).toString();

		await getTokenApi.post(
			'/services/oauth2/token',
			body,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			}
		).then((response) => {
			tokenRef.current = response.data.access_token;
		}).catch((error) => {
			console.error('Error fetching token:', error.response?.data || error.message);
		});

		return tokenRef.current;
	}

	async function sendMessage() {
		const texto = mensagem.trim();
		if (!texto || loading) {
			return;
		}

		setLoading(true);
		const guid = Crypto.randomUUID();
		const nowMs = Date.now();

		const payload = {
			to: '{{Id_Conversation}}',
			from: 'cliente-teste-003',
			interactions: [
				{
					timestamp: nowMs,
					interactionType: 'EntryInteraction',
					payload: {
						id: guid,
						entryType: 'Message',
						abstractMessage: {
							messageType: 'StaticContentMessage',
							id: guid,
							staticContent: {
								formatType: 'Text',
								text: texto,
							},
						},
					},
				},
			],
		};

		const body = new FormData();
		body.append('json', {
			string: JSON.stringify(payload),
			type: 'application/json', // <- o "Content-Type" da coluna no Postman
		});

		// Mostra a mensagem na tela na hora, sem esperar o servidor
		setMensagens((anteriores) => [
			...anteriores,
			{
				identifier: guid,
				messageText: texto,
				clientTimestamp: nowMs,
				sender: { role: 'EndUser', subject: 'cliente-teste-003' },
				pendente: true,
			},
		]);
		setMensagem('');

		try{
			const accessToken = await getToken();
			await sendMsgApi.post(
				'/api/v1/interactions',
				body,
				{
					headers: {
						'Authorization': 'Bearer ' + accessToken,
						'OrgId': '{{OrgId}}',
						'AuthorizationContext': '{{ChannelDefinitionName}}',
						'RequestId': guid,
						'Accept': 'application/json',
					},
				}
			).then((response) => {
				conversationIdentifierRef.current = response.data.conversationIdentifier;
				console.log('Mensagem enviada com sucesso:', response.data);
			}).catch((error) => {
				console.error('Error fetching send msg 1:', error.response?.data || error.message);
			});
		} catch (error) {
			console.error('Error fetching send msg 2:', error);
		}

		await getConversation();

		setLoading(false);
	}

	async function getConversation() {
		if (!conversationIdentifierRef.current) {
			return;
		}

		// FromEnd traz as mensagens mais recentes primeiro; com FromStart, quando a conversa
		// passa do limite de registros, as mensagens novas nunca aparecem
		const path = '/services/data/v62.0/connect/conversation/'+ conversationIdentifierRef.current +'/entries?queryDirection=FromEnd&recordLimit=100';
		const accessToken = await getToken();

		await getTokenApi.get(
			path,
			{
				headers: {
					'Authorization': 'Bearer ' + accessToken,
					'Accept': 'application/json'
				}
			}
		).then((response) => {
			const entradas = (response.data.conversationEntries || [])
				.filter((entrada) => entrada.messageText)
				.sort((a, b) => horario(a) - horario(b));

			console.log('Polling:', entradas.length, 'mensagens; última:', entradas[entradas.length - 1]?.messageText);

			setMensagens((anteriores) => {
				// Mantém as mensagens enviadas pelo app que o servidor ainda não registrou
				const pendentes = anteriores.filter((local) =>
					local.pendente && !entradas.some((servidor) =>
						servidor.sender?.role === 'EndUser' &&
						servidor.messageText === local.messageText &&
						horario(servidor) >= local.clientTimestamp - 5000
					)
				);
				const novaLista = [...entradas, ...pendentes];

				// Evita re-renderizar a lista a cada segundo quando nada mudou
				const assinatura = (lista) => lista.map((m) => m.identifier).join('|');
				return assinatura(novaLista) === assinatura(anteriores) ? anteriores : novaLista;
			});
		}).catch((error) => {
			if (error.response?.status === 401) {
				tokenRef.current = null; // token expirou, busca um novo na próxima chamada
			}
			console.error('Error fetching getConversation:', error.response?.data || error.message);
		});
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.header}>
				<Text style={styles.headerTitulo}>Atendimento</Text>
				<Text style={styles.headerSubtitulo}>Cliente Teste</Text>
			</View>

			<FlatList
				ref={listaRef}
				style={styles.lista}
				contentContainerStyle={styles.listaConteudo}
				data={mensagens}
				keyExtractor={(item) => item.identifier}
				renderItem={({item}) => <Mensagem data={item}/>}
				onContentSizeChange={() => listaRef.current?.scrollToEnd({ animated: true })}
				ListEmptyComponent={
					<Text style={styles.vazio}>Envie uma mensagem para começar a conversa</Text>
				}
			/>

			<View style={styles.areaInput}>
				<TextInput
					style={styles.input}
					placeholder='Digite uma mensagem'
					value={mensagem}
					onChangeText={(texto) => {setMensagem(texto)}}
					onSubmitEditing={sendMessage}
					returnKeyType='send'
					multiline
				/>
				<TouchableOpacity
					style={[styles.botao, (!mensagem.trim() || loading) && styles.botaoDesabilitado]}
					onPress={sendMessage}
					disabled={!mensagem.trim() || loading}
				>
					{loading
						? <ActivityIndicator color="#fff" size="small"/>
						: <Text style={styles.botaoTexto}>Enviar</Text>
					}
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 54,
		paddingBottom: 12,
		paddingHorizontal: 16,
		backgroundColor: '#09A9FF',
	},
	headerTitulo: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	headerSubtitulo: {
		color: '#E1F5FE',
		fontSize: 13,
	},
	lista: {
		flex: 1,
	},
	listaConteudo: {
		paddingVertical: 12,
		flexGrow: 1,
	},
	vazio: {
		textAlign: 'center',
		color: '#90A4AE',
		marginTop: 40,
	},
	areaInput: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		padding: 8,
		paddingBottom: Platform.OS === 'ios' ? 28 : 8,
		borderTopWidth: 1,
		borderTopColor: '#ECEFF1',
		backgroundColor: '#fff',
	},
	input: {
		flex: 1,
		maxHeight: 120,
		minHeight: 42,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 21,
		backgroundColor: '#F5F7F8',
		fontSize: 15,
	},
	botao: {
		height: 42,
		minWidth: 80,
		marginLeft: 8,
		paddingHorizontal: 14,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#09A9FF',
		borderRadius: 21,
	},
	botaoDesabilitado: {
		opacity: 0.5,
	},
	botaoTexto: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
	},
});
