// script.js (O Maestro da Página Autônoma) - VERSÃO CORRIGIDA

document.addEventListener('DOMContentLoaded', () => {

    if (!document.getElementById('tabelaEmprestimos')) {
        return;
    }

    let filtroStatusAtivo = 'todos';
    
    // --- FUNÇÕES GLOBAIS ---
    window.mostrarNotificacao = (texto, tipo = 'sucesso') => {
        Toastify({ text: texto, duration: 3000, close: true, gravity: "top", position: "right", style: { background: tipo === 'sucesso' ? 'linear-gradient(to right, #00b09b, #96c93d)' : 'linear-gradient(to right, #ff5f6d, #ffc371)' } }).showToast();
    };
    window.abrirModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'flex';
    };
    window.fecharModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
            modal.style.zIndex = '1100';
        }
    };
    window.aplicarMascara = (input, tipo) => {
        let valor = input.value.replace(/\D/g, '');
        if (tipo === 'cpf') {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else if (tipo === 'telefone') {
            if (valor.length > 10) valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            else valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (tipo === 'cep') {
            valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
        } else if (tipo === 'rg') {
            valor = valor.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1})$/, '$1-$2');
        }
        input.value = valor;
    };
    
    // --- LÓGICA DE ATUALIZAÇÃO ---
    window.atualizarInterfaceCompleta = () => {
        const termoPesquisa = document.getElementById('pesquisaCliente').value.trim().toLowerCase();
        
        emprestimos.forEach(emp => emp.status = calcularStatusEmprestimo(emp));
        
        const emprestimosFiltrados = emprestimos.filter(emp => {
            const matchNome = emp.cliente.nome.toLowerCase().includes(termoPesquisa);
            const statusFormatado = emp.status.toLowerCase().replace(/\s+/g, '-');
            const matchStatus = filtroStatusAtivo === 'todos' || statusFormatado === filtroStatusAtivo;
            return matchNome && matchStatus;
        });
        
        atualizarCards(emprestimosFiltrados);
        atualizarTabela(emprestimosFiltrados);
        atualizarGraficos(emprestimosFiltrados, filtroStatusAtivo);
        
        atualizarSelectClientes();
        atualizarSelectFiadores();
    };

    // --- CONEXÃO DE EVENTOS ---
    document.getElementById('btn-abrir-cadastro-cliente').addEventListener('click', abrirModalParaNovoCliente);
    document.getElementById('btn-gerenciar-fiadores').addEventListener('click', abrirModalGerenciarFiadores);
    document.getElementById('btn-abrir-simulacao').addEventListener('click', () => abrirModal('modalSimulacao'));
    document.getElementById('btn-salvar-cliente').addEventListener('click', salvarCliente);
    document.getElementById('btn-abrir-cadastro-fiador-simulacao').addEventListener('click', () => abrirModalParaNovoFiador(true));
    document.getElementById('btn-salvar-fiador').addEventListener('click', salvarFiador);
    document.getElementById('btn-simular').addEventListener('click', simularEmprestimo);
    document.getElementById('btn-realizar-emprestimo').addEventListener('click', realizarEmprestimo);
    document.getElementById('btn-imprimir-contrato').addEventListener('click', imprimirContrato);
    
    document.querySelectorAll('.close').forEach(btn => btn.addEventListener('click', () => fecharModal(btn.dataset.modalId)));
    
    window.addEventListener('click', (event) => { if (event.target.classList.contains('modal')) fecharModal(event.target.id); });
    
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelector('.filtro-btn.ativo').classList.remove('ativo');
            e.currentTarget.classList.add('ativo');
            filtroStatusAtivo = e.currentTarget.dataset.filtro;
            atualizarInterfaceCompleta();
        });
    });
    
    document.getElementById('pesquisaCliente').addEventListener('input', atualizarInterfaceCompleta);
    document.querySelectorAll('input[data-mascara]').forEach(input => input.addEventListener('input', () => aplicarMascara(input, input.dataset.mascara)));
    document.querySelectorAll('#modalCadastroCliente input[placeholder], #modalCadastroFiador input[placeholder]').forEach(input => {
        if(input.placeholder) input.addEventListener('blur', () => validarCampo(input));
    });

    // --- INICIALIZAÇÃO DA PÁGINA ---
    atualizarInterfaceCompleta();
});