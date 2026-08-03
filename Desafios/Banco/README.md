# Desafio - Banco
<h2>Critérios</h2>
<ul>
    <li>
        Dados do cliente
        <ul>
            <li>Nome</li>
            <li>Idade</li>
            <li>Sexo</li>
            <li>Limite de Crédito</li>
            <li>É estudante?</li>
        </ul>
    </li>
    <li>
        Botão (Abrir a conta)
        <ul>
            <li>Ao clicar no botão, exibir os dados em um alerta</li>
            <li>Não pode clicar no botão com dados em branco</li>
        </ul>
    </li>
</ul>

<h2>Objeto Cliente</h2>
<code>
{
    id              : 0,
    nome            : 'Teste 01',
    documento       : '111.222.333-44',
    telefone        : '(11) 9 9999-9999',
    idade           : '40',
    sexo            : 'Masculino',
    limiteCredito   : 395.13,
    estudante       : false,
    createdDate     : new Date()
}