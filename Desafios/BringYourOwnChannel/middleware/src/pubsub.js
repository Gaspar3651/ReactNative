// Script de estudo: escuta as mensagens que o Salesforce envia para o canal (saída)
// usando a Pub/Sub API e repassa para o app por WebSocket. Rodar com: npm start (dentro da pasta middleware)
import { WebSocketServer } from 'ws';
import PubSubApiClient from 'salesforce-pubsub-api-client';

// Platform Event de saída configurado no Bring Your Own Channel
const TOPICO = '/event/Test_Event__e';
// Porta da ponte (não usar 8081, que é a do Metro/Expo)
const PORTA = 3000;

// 0. Ponte: o app conecta em ws://<ip-do-pc>:3000/?cliente=cliente-teste-003
//    e a conexão fica aberta; a ponte envia cada mensagem assim que ela chega
const wss = new WebSocketServer({ port: PORTA });

wss.on('connection', (app, req) => {
	// Guarda na conexão qual cliente ela representa, para entregar só as mensagens dele
	app.cliente = new URL(req.url, 'http://localhost').searchParams.get('cliente');
	console.log('App conectado: ' + app.cliente);

	app.on('close', () => console.log('App desconectado: ' + app.cliente));
});

// 1. Cria o cliente. Ele faz o login OAuth (client credentials) sozinho
const client = new PubSubApiClient({
	authType: 'oauth-client-credentials',
	loginUrl: 'https://{{org_domain}}.my.salesforce.com',
	clientId: '{{client_id}}',
	clientSecret: '{{client_secret}}',
});

// 2. Abre a conexão gRPC com o servidor da Pub/Sub API (api.pubsub.salesforce.com:7443)
await client.connect();

// 3. Assina o tópico. A função abaixo é chamada para tudo que chega pelo stream.
//    O último parâmetro (null) mantém a assinatura aberta para sempre
await client.subscribe(TOPICO, (assinatura, tipo, dados) => {
	if (tipo === 'event') {
		tratarEvento(dados);
	} else if (tipo === 'error') {
		console.error('Erro no stream:', dados);
	} else if (tipo === 'end') {
		console.log('Stream encerrado');
	}
	// "grpcKeepalive" chega a cada ~270s quando não há eventos, só para manter a conexão viva
}, null);

function tratarEvento(dados) {
	// Payload__c vem como texto JSON: precisa de JSON.parse
	const conteudo = JSON.parse(dados.payload.Payload__c);
	const entrada = conteudo.payload;

	console.log('Evento ' + dados.event?.replayId + ': ' + entrada.entryType + ' de ' + entrada.sender?.role);

	// Também chegam TypingStartedIndicator, TypingStoppedIndicator etc.; aqui só interessa texto
	if (entrada.entryType !== 'Message') {
		return;
	}

	const texto = entrada.entryPayload?.abstractMessage?.staticContent?.text;
	if (!texto) {
		console.log('Mensagem sem texto simples, conteúdo completo:', JSON.stringify(entrada, null, 2));
		return;
	}

	// Mesmo formato que o componente Mensagem do app usa
	const mensagem = {
		identifier: entrada.identifier,
		messageText: texto,
		clientTimestamp: entrada.clientTimestamp,
		sender: { role: entrada.sender.role, subject: entrada.senderDisplayName },
	};

	// 4. Empurra a mensagem para os apps conectados desse cliente.
	//    Se o app estiver fechado nesse momento, a mensagem se perde (não fica guardada)
	const cliente = conteudo.recipient.subject;
	wss.clients.forEach((app) => {
		if (app.cliente === cliente && app.readyState === app.OPEN) {
			app.send(JSON.stringify(mensagem));
		}
	});
}

console.log('Escutando ' + TOPICO + ' e aceitando apps em ws://<ip-do-pc>:' + PORTA);
