// script-simulacao.js
function simularEmprestimo() {
    const valor = parseFloat(document.getElementById('valorEmprestimo').value);
    const juros = parseFloat(document.getElementById('jurosEmprestimo').value);
    const parcelas = parseInt(document.getElementById('parcelasEmprestimo').value);
    if (isNaN(valor) || isNaN(juros) || isNaN(parcelas) || valor <= 0 || parcelas <= 0) {
        mostrarNotificacao('Por favor, informe valores válidos para simulação.', 'erro');
        return;
    }
    const taxa = juros / 100;
    const parcelaValor = valor * (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1);
    const totalPagar = parcelaValor * parcelas;
    const resultado = `Valor do Empréstimo: R$ ${valor.toFixed(2).replace('.', ',')}\nJuros: ${juros.toFixed(2).replace('.', ',')}% ao mês\nNúmero de Parcelas: ${parcelas}\n---------------------------------\nValor da Parcela: R$ ${parcelaValor.toFixed(2).replace('.', ',')}\nTotal a Pagar: R$ ${totalPagar.toFixed(2).replace('.', ',')}`;
    document.getElementById('resultadoSimulacao').value = resultado.trim();
}

function realizarEmprestimo() {
    const clienteId = parseInt(document.getElementById('clienteSimulacao').value);
    const fiadorId = parseInt(document.getElementById('fiadorSimulacao').value);
    const valor = parseFloat(document.getElementById('valorEmprestimo').value);
    const juros = parseFloat(document.getElementById('jurosEmprestimo').value);
    const parcelas = parseInt(document.getElementById('parcelasEmprestimo').value);
    const vencimento = document.getElementById('vencimentoEmprestimo').value;
    if (!clienteId || !fiadorId) {
        mostrarNotificacao('Selecione cliente e fiador para o empréstimo.', 'erro');
        return;
    }
    if (isNaN(valor) || isNaN(juros) || isNaN(parcelas) || !vencimento) {
        mostrarNotificacao('Preencha todos os campos do empréstimo corretamente.', 'erro');
        return;
    }
    const cliente = clientes.find(c => c.id === clienteId);
    const fiador = fiadores.find(f => f.id === fiadorId);
    const taxa = juros / 100;
    const parcelaValor = valor * (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1);
    const parcelasDetalhadas = [];
    const [ano, mes, dia] = vencimento.split('-');
    let dataVencimento = new Date(ano, mes - 1, dia);
    for (let i = 1; i <= parcelas; i++) {
        parcelasDetalhadas.push({ numero: i, valor: parcelaValor, vencimento: new Date(dataVencimento), status: 'A vencer', dataPagamento: null });
        dataVencimento.setMonth(dataVencimento.getMonth() + 1);
    }
    const novoEmprestimo = { id: proximoEmprestimoId++, cliente, fiador, valor, juros, parcelas, parcelasDetalhadas, status: 'A vencer', dataContrato: new Date() };
    emprestimos.push(novoEmprestimo);
    mostrarNotificacao('Empréstimo realizado com sucesso!', 'sucesso');
    atualizarInterfaceCompleta();
    fecharModal('modalSimulacao');
    limparCamposSimulacao();
}

function limparCamposSimulacao() {
    document.getElementById('valorEmprestimo').value = '';
    document.getElementById('jurosEmprestimo').value = '';
    document.getElementById('parcelasEmprestimo').value = '';
    document.getElementById('vencimentoEmprestimo').value = '';
    document.getElementById('resultadoSimulacao').value = '';
    document.getElementById('clienteSimulacao').selectedIndex = 0;
    document.getElementById('fiadorSimulacao').selectedIndex = 0;
}