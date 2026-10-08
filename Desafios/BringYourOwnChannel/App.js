import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, FlatList, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';

import getTokenApi from './Api/getToken';
import sendMsgApi from './Api/sendMsg';
import Mensagem from './Components/Mensagem';

// Identificador do cliente no canal, vindo do .env
const CLIENTE = process.env.EXPO_PUBLIC_CLIENTE;

// O SafeAreaProvider mede as áreas seguras do aparelho (status bar, notch, barra de navegação)
// e disponibiliza essas medidas para o useSafeAreaInsets
export default function App() {
	return (
		<SafeAreaProvider>
			<Chat/>
		</SafeAreaProvider>
	);
}

function Chat() {
	const [mensagem, setMensagem] = useState('');
	const [mensagens, setMensagens] = useState([]);
	const [loading, setLoading] = useState(false);
	const [tecladoAberto, setTecladoAberto] = useState(false);

	const tokenRef = useRef(null)
	const conversationIdentifierRef = useRef(null)
	const listaRef = useRef(null)

	// Tamanho real das áreas seguras deste aparelho, em vez de valores fixos
	const insets = useSafeAreaInsets();

	// Acompanha o teclado: com ele aberto, o espaço da barra de navegação não é necessário
	// (o iOS avisa antes da animação, "Will"; o Android só depois, "Did")
	useEffect(() => {
		const eventoAbrir = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
		const eventoFechar = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

		const abrir = Keyboard.addListener(eventoAbrir, () => {
			setTecladoAberto(true);
			// Mantém a última mensagem visível acima do teclado
			setTimeout(() => listaRef.current?.scrollToEnd({ animated: true }), 100);
		});
		const fechar = Keyboard.addListener(eventoFechar, () => setTecladoAberto(false));

		return () => {
			abrir.remove();
			fechar.remove();
		};
	}, []);

	// Abre uma conexão com a ponte (middleware/src/pubsub.js) que fica aberta enquanto o app existe.
	// As respostas do Chatbot/agente chegam por ela assim que o Salesforce publica o evento.
	// O endereço da ponte fica no .env (EXPO_PUBLIC_PONTE_URL)
	useEffect(() => {
		const ws = new WebSocket(process.env.EXPO_PUBLIC_PONTE_URL + '/?cliente=' + CLIENTE);

		ws.onopen = () => console.log('Conectado à ponte');
		ws.onmessage = (evento) => {
			const resposta = JSON.parse(evento.data);
			setMensagens((anteriores) => [...anteriores, resposta]);
		};
		ws.onerror = (erro) => console.error('Erro na ponte:', erro.message);
		ws.onclose = () => console.log('Conexão com a ponte fechada');

		return () => ws.close();
	}, []);

	async function getToken(){
		if (tokenRef.current) {
			return tokenRef.current;
		}

		const body = new URLSearchParams({
			grant_type: 'client_credentials',
			client_id: process.env.EXPO_PUBLIC_SF_CLIENT_ID,
			client_secret: process.env.EXPO_PUBLIC_SF_CLIENT_SECRET
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
			to: process.env.EXPO_PUBLIC_SF_CHANNEL_ADDRESS_ID,
			from: CLIENTE,
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
				sender: { role: 'EndUser', subject: CLIENTE },
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
						'OrgId': process.env.EXPO_PUBLIC_SF_ORG_ID,
						'AuthorizationContext': process.env.EXPO_PUBLIC_SF_AUTHORIZATION_CONTEXT,
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

		setLoading(false);
	}

	return (
		// "padding" nas duas plataformas: com o edge-to-edge do Android, a tela não encolhe
		// sozinha quando o teclado abre, então o KeyboardAvoidingView precisa empurrar o conteúdo
		<KeyboardAvoidingView
			style={styles.container}
			behavior='padding'
		>
			<View style={[styles.header, { paddingTop: insets.top + 12 }]}>
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

			{/* Teclado fechado: respeita a barra de navegação. Aberto: encosta no teclado */}
			<View style={[styles.areaInput, { paddingBottom: tecladoAberto ? 8 : insets.bottom + 8 }]}>
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
