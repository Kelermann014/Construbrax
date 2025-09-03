// script-dashboard.js

// LÓGICA DE STATUS REFINADA E CENTRALIZADA
function calcularStatusEmprestimo(emprestimo) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const todasPagas = emprestimo.parcelasDetalhadas.every(p => p.status === 'Pago');
    if (todasPagas) {
        return 'Quitado';
    }

    const temAtrasada = emprestimo.parcelasDetalhadas.some(p => p.status !== 'Pago' && p.vencimento < hoje);
    if (temAtrasada) {
        return 'Atrasado';
    }
    
    // Verifica se a primeira parcela ainda não venceu para ser "A vencer"
    const primeiraParcelaNaoPaga = emprestimo.parcelasDetalhadas.find(p => p.status !== 'Pago');
    if (primeiraParcelaNaoPaga && primeiraParcelaNaoPaga.vencimento > hoje) {
        // Para ser 'A vencer', o contrato inteiro precisa ser futuro. Verificamos a data do contrato.
        const dataContrato = emprestimo.dataContrato;
        const primeiraVencimento = emprestimo.parcelasDetalhadas[0].vencimento;
        if(primeiraVencimento > hoje) {
            return 'A vencer';
        }
    }

    return 'Em dia';
}

function atualizarCards(listaEmprestimos) {
    const clientesIds = new Set(listaEmprestimos.map(e => e.cliente.id));
    document.getElementById('totalClientes').textContent = clientesIds.size;
    const cidades = new Set(listaEmprestimos.map(e => e.cliente.cidade).filter(c => c));
    document.getElementById('totalCidades').textContent = cidades.size;
    document.getElementById('totalEmprestimos').textContent = listaEmprestimos.length;
    let totalReceber = 0;
    listaEmprestimos.forEach(emp => {
        emp.parcelasDetalhadas.forEach(p => { if (p.status !== 'Pago') totalReceber += p.valor; });
    });
    document.getElementById('totalReceber').textContent = `R$ ${totalReceber.toFixed(2).replace('.', ',')}`;
}

function atualizarTabela(listaEmprestimos) {
    const tbody = document.getElementById('tabelaEmprestimos');
    tbody.innerHTML = '';
    
    if (listaEmprestimos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhum empréstimo encontrado para os filtros selecionados.</td></tr>';
        return;
    }

    const clientesAgrupados = listaEmprestimos.reduce((acc, emp) => {
        if (!acc[emp.cliente.id]) {
            acc[emp.cliente.id] = { cliente: emp.cliente, totalValor: 0, totalParcelas: 0, statusGeral: 'Quitado' };
        }
        acc[emp.cliente.id].totalValor += emp.valor;
        acc[emp.cliente.id].totalParcelas += emp.parcelas;
        const prioridadeStatus = { 'Atrasado': 3, 'A vencer': 2, 'Em dia': 1, 'Quitado': 0 };
        if (prioridadeStatus[emp.status] > (prioridadeStatus[acc[emp.cliente.id].statusGeral] || 0) ) {
            acc[emp.cliente.id].statusGeral = emp.status;
        }
        return acc;
    }, {});
    
    Object.values(clientesAgrupados).sort((a,b) => a.cliente.nome.localeCompare(b.cliente.nome)).forEach(dados => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Cliente">${dados.cliente.nome}</td>
            <td data-label="Valor Total">R$ ${dados.totalValor.toFixed(2).replace('.', ',')}</td>
            <td data-label="Parcelas">${dados.totalParcelas}</td>
            <td data-label="Status">${dados.statusGeral}</td>
            <td data-label="Ações"><div class="botoes-acao">
                <button onclick="mostrarDetalhesEmprestimo(${dados.cliente.id})">Detalhes</button>
                <button onclick="abrirModalParaEditarCliente(${dados.cliente.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirCliente(${dados.cliente.id})">Excluir</button>
            </div></td>`;
        tbody.appendChild(tr);
    });
}

function atualizarGraficos(listaEmprestimos) {
    // --- Gráfico de Rosca (Doughnut) ---
    const statusCounts = { 'Em dia': 0, 'Atrasado': 0, 'A vencer': 0 };
    listaEmprestimos.filter(emp => emp.status !== 'Quitado').forEach(emp => {
        statusCounts[emp.status]++;
    });

    const ctxStatus = document.getElementById('graficoStatus').getContext('2d');
    if (window.graficoStatusChart) window.graficoStatusChart.destroy();
    window.graficoStatusChart = new Chart(ctxStatus, {
        type: 'doughnut', data: { labels: Object.keys(statusCounts), datasets: [{ data: Object.values(statusCounts), backgroundColor: ['#28a745', '#dc3545', '#ffc107'], borderColor: '#fff', borderWidth: 3 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Status dos Contratos Ativos', font: { size: 16, weight: 'bold' }, padding: { top: 0, bottom: 10 } }, legend: { position: 'top', labels: { boxWidth: 12, padding: 15 } } } }
    });

    // --- Gráfico de Barras (Recebimentos Mensais) ---
    const recebimentosMensais = {};
    const mesesLabels = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    for (let i = 5; i >= 0; i--) {
        const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const mesAno = d.toLocaleString('pt-BR', { month: 'short', year: '2-digit' }).replace('. de ', '/');
        mesesLabels.push(mesAno);
        recebimentosMensais[mesAno] = { recebido: 0, atrasado: 0, aVencer: 0 };
    }
    listaEmprestimos.forEach(emp => {
        emp.parcelasDetalhadas.forEach(p => {
            const mesAnoParcela = p.vencimento.toLocaleString('pt-BR', { month: 'short', year: '2-digit' }).replace('. de ', '/');
            if (recebimentosMensais[mesAnoParcela]) {
                if (p.status === 'Pago') recebimentosMensais[mesAnoParcela].recebido += p.valor;
                else if (p.vencimento < hoje) recebimentosMensais[mesAnoParcela].atrasado += p.valor;
                else recebimentosMensais[mesAnoParcela].aVencer += p.valor;
            }
        });
    });
    const dataRecebido = mesesLabels.map(mes => recebimentosMensais[mes].recebido);
    const dataAtrasado = mesesLabels.map(mes => recebimentosMensais[mes].atrasado);
    const dataAVencer = mesesLabels.map(mes => recebimentosMensais[mes].aVencer);
    const ctxMensal = document.getElementById('graficoMensal').getContext('2d');
    if (window.graficoMensalChart) window.graficoMensalChart.destroy();
    window.graficoMensalChart = new Chart(ctxMensal, {
        type: 'bar',
        data: {
            labels: mesesLabels,
            datasets: [
                { label: 'Recebido', data: dataRecebido, backgroundColor: '#28a745' },
                { label: 'Atrasado', data: dataAtrasado, backgroundColor: '#dc3545' },
                { label: 'A Vencer', data: dataAVencer, backgroundColor: '#ffc107' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true, ticks: { callback: value => `R$ ${Math.round(value/1000)}k` } } }, plugins: { title: { display: true, text: 'Fluxo de Caixa Mensal', font: { size: 16, weight: 'bold' } }, legend: { position: 'top' } } }
    });
}

function mostrarDetalhesEmprestimo(clienteId) {
    const emprestimosDoCliente = emprestimos.filter(emp => emp.cliente.id === clienteId);
    if (emprestimosDoCliente.length === 0) { mostrarNotificacao('Este cliente não possui empréstimos.', 'erro'); return; }
    const cliente = emprestimosDoCliente[0].cliente;
    const div = document.getElementById('detalhesEmprestimoConteudo');
    let conteudoHtml = `<div class="details-grid"><div class="details-grid-item"><strong>Cliente</strong><span id="detalhes-cliente-nome">${cliente.nome}</span></div><div class="details-grid-item"><strong>CPF</strong><span id="detalhes-cliente-cpf">${cliente.cpf}</span></div><div class="details-grid-item"><strong>Telefone</strong><span>${cliente.telefone}</span></div></div>`;
    
    div.innerHTML = conteudoHtml;

    emprestimosDoCliente.forEach((emprestimo, index) => {
        emprestimo.status = calcularStatusEmprestimo(emprestimo);
        let parcelasHtml = '';
        emprestimo.parcelasDetalhadas.forEach(p => {
            let acaoBotao = '';
            if (p.status === 'Pago') {
                acaoBotao = `<button class="btn-desfazer" onclick="desfazerPagamento(${emprestimo.id}, ${p.numero}, ${clienteId})">Desfazer</button>`;
            } else {
                acaoBotao = `<button class="btn-pagar" onclick="confirmarPagamento(${emprestimo.id}, ${p.numero}, ${p.valor}, ${clienteId})">Pagar</button>`;
            }
            const statusClass = p.status === 'Pago' ? 'status-pago' : (new Date() > p.vencimento ? 'status-atrasado' : 'status-a-vencer');
            const statusDisplay = p.status === 'Pago' ? 'Pago' : (new Date() > p.vencimento ? 'Atrasado' : 'A vencer');
            parcelasHtml += `<tr><td>${p.numero}</td><td>R$ ${p.valor.toFixed(2).replace('.', ',')}</td><td>${p.vencimento.toLocaleDateString('pt-BR')}</td><td><span class="${statusClass}">${statusDisplay}</span></td><td>${p.dataPagamento ? p.dataPagamento.toLocaleDateString('pt-BR') : '-'}</td><td>${acaoBotao}</td></tr>`;
        });

        conteudoHtml += `<h4 style="margin-top: ${index > 0 ? '30px' : '10px'};">Empréstimo #${emprestimo.id} - Status: ${emprestimo.status}</h4><div class="tabela-rolavel"><table><thead><tr><th>Parcela</th><th>Valor</th><th>Vencimento</th><th>Status</th><th>Pagamento</th><th>Ação</th></tr></thead><tbody>${parcelasHtml}</tbody></table></div>`;
    });
    div.innerHTML = conteudoHtml;

    document.getElementById('btn-imprimir-contrato').setAttribute('data-cliente-id', clienteId);
    abrirModal('modalDetalhesEmprestimo');
}


function registrarPagamento(emprestimoId, parcelaNumero, clienteId) {
    const emprestimo = emprestimos.find(e => e.id === emprestimoId);
    if (emprestimo) {
        const parcela = emprestimo.parcelasDetalhadas.find(p => p.numero === parcelaNumero);
        if (parcela && parcela.status !== 'Pago') {
            parcela.status = 'Pago';
            parcela.dataPagamento = new Date();
            mostrarNotificacao(`Parcela ${parcelaNumero} paga com sucesso!`, 'sucesso');
            atualizarInterfaceCompleta(); 
            mostrarDetalhesEmprestimo(clienteId);
        }
    }
}

function desfazerPagamento(emprestimoId, parcelaNumero, clienteId) {
    const emprestimo = emprestimos.find(e => e.id === emprestimoId);
    if (emprestimo) {
        const parcela = emprestimo.parcelasDetalhadas.find(p => p.numero === parcelaNumero);
        if (parcela && parcela.status === 'Pago') {
            parcela.status = 'A vencer';
            parcela.dataPagamento = null;
            mostrarNotificacao(`Pagamento da parcela ${parcelaNumero} desfeito.`, 'sucesso');
            atualizarInterfaceCompleta(); 
            mostrarDetalhesEmprestimo(clienteId);
        }
    }
}

function confirmarPagamento(emprestimoId, parcelaNumero, valorParcela, clienteId) {
    document.getElementById('parcelaConfirmacao').textContent = parcelaNumero;
    document.getElementById('valorConfirmacao').textContent = `R$ ${valorParcela.toFixed(2).replace('.', ',')}`;
    
    document.getElementById('btn-confirmar-pagamento').onclick = () => {
        fecharModal('modalConfirmarPagamento');
        registrarPagamento(emprestimoId, parcelaNumero, clienteId);
    };

    abrirModal('modalConfirmarPagamento');
}

function atualizarSelectClientes() {
    const select = document.getElementById('clienteSimulacao');
    if(!select) return;
    const valorAtual = select.value;
    select.innerHTML = '<option value="">Selecione um cliente</option>';
    [...clientes].sort((a, b) => a.nome.localeCompare(b.nome)).forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.nome} (CPF: ${cliente.cpf})`;
        select.appendChild(option);
    });
    select.value = valorAtual;
}

function atualizarSelectFiadores() {
    const select = document.getElementById('fiadorSimulacao');
    if(!select) return;
    const valorAtual = select.value;
    select.innerHTML = '<option value="">Selecione um fiador</option>';
    [...fiadores].sort((a, b) => a.nome.localeCompare(b.nome)).forEach(fiador => {
        const option = document.createElement('option');
        option.value = fiador.id;
        option.textContent = `${fiador.nome} (CPF: ${fiador.cpf})`;
        select.appendChild(option);
    });
    select.value = valorAtual;
}