// script-simulacao.js
function simularEmprestimo() {
    const valor = parseFloat(document.getElementById('valorEmprestimo').value);
    const juros = parseFloat(document.getElementById('jurosEmprestimo').value);
    const parcelas = parseInt(document.getElementById('parcelasEmprestimo').value);
    const valorEntradaVeiculo = parseFloat(document.getElementById('valorVeiculoEntrada').value) || 0;
    const valorAposEntrada = valor - valorEntradaVeiculo;

    if (isNaN(valor) || isNaN(juros) || isNaN(parcelas) || valor <= 0 || parcelas <= 0) {
        mostrarNotificacao('Por favor, informe valores válidos para simulação.', 'erro');
        return;
    }
    const taxa = juros / 100;
    const parcelaValor = valorAposEntrada * (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1);
    const totalPagar = parcelaValor * parcelas + valorEntradaVeiculo;
    const resultado = `Valor Total do Empréstimo: R$ ${valor.toFixed(2).replace('.', ',')}\nEntrada (veículo): R$ ${valorEntradaVeiculo.toFixed(2).replace('.', ',')}\nValor a Financiar: R$ ${valorAposEntrada.toFixed(2).replace('.', ',')}\nJuros: ${juros.toFixed(2).replace('.', ',')}% ao mês\nNúmero de Parcelas: ${parcelas}\n---------------------------------\nValor da Parcela: R$ ${parcelaValor.toFixed(2).replace('.', ',')}\nTotal a Pagar: R$ ${totalPagar.toFixed(2).replace('.', ',')}`;
    document.getElementById('resultadoSimulacao').value = resultado.trim();
}

function realizarEmprestimo() {
    const clienteId = parseInt(document.getElementById('clienteSimulacao').value);
    const fiador1Id = parseInt(document.getElementById('fiador1Simulacao').value);
    const fiador2Id = parseInt(document.getElementById('fiador2Simulacao').value);
    const valor = parseFloat(document.getElementById('valorEmprestimo').value);
    const juros = parseFloat(document.getElementById('jurosEmprestimo').value);
    const parcelas = parseInt(document.getElementById('parcelasEmprestimo').value);
    const vencimento = document.getElementById('vencimentoEmprestimo').value;
    
    // Novas validações
    if (!clienteId || !fiador1Id) {
        mostrarNotificacao('Selecione um cliente e pelo menos um fiador para o empréstimo.', 'erro');
        return;
    }
    if (fiador1Id && fiador2Id && fiador1Id === fiador2Id) {
        mostrarNotificacao('Fiador 1 e Fiador 2 não podem ser a mesma pessoa.', 'erro');
        return;
    }
    if (isNaN(valor) || isNaN(juros) || isNaN(parcelas) || !vencimento) {
        mostrarNotificacao('Preencha todos os campos do empréstimo corretamente.', 'erro');
        return;
    }

    const cliente = clientes.find(c => c.id === clienteId);
    const fiadoresSelecionados = [];
    if(fiador1Id) fiadoresSelecionados.push(fiadores.find(f => f.id === fiador1Id));
    if(fiador2Id) fiadoresSelecionados.push(fiadores.find(f => f.id === fiador2Id));

    const taxa = juros / 100;
    const valorEntradaVeiculo = parseFloat(document.getElementById('valorVeiculoEntrada').value) || 0;
    const valorAposEntrada = valor - valorEntradaVeiculo;
    const parcelaValor = valorAposEntrada * (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1);
    
    const parcelasDetalhadas = [];
    const [ano, mes, dia] = vencimento.split('-');
    let dataVencimento = new Date(ano, mes - 1, dia);
    for (let i = 1; i <= parcelas; i++) {
        parcelasDetalhadas.push({ numero: i, valor: parcelaValor, vencimento: new Date(dataVencimento), status: 'A vencer', dataPagamento: null });
        dataVencimento.setMonth(dataVencimento.getMonth() + 1);
    }
    
    const novoEmprestimo = { 
        id: proximoEmprestimoId++, 
        cliente, 
        fiadores: fiadoresSelecionados, 
        valor, 
        juros, 
        parcelas, 
        parcelasDetalhadas, 
        status: 'A vencer', 
        dataContrato: new Date(),
        entradaVeiculo: veiculos.find(v => v.placa === document.getElementById('veiculoPlacaEntrada').value)
    };
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
    document.getElementById('fiador1Simulacao').selectedIndex = 0;
    document.getElementById('fiador2Simulacao').selectedIndex = 0;
    document.getElementById('veiculoPlacaEntrada').value = '';
    document.getElementById('valorVeiculoEntrada').value = '';
}
