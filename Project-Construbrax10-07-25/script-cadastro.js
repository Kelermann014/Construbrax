// script-cadastro.js
function abrirModalParaNovoCliente() {
    document.getElementById('tituloModalCliente').textContent = 'Cadastro de Cliente';
    document.getElementById('idClienteEditar').value = '';
    limparCamposCadastroCliente();
    abrirModal('modalCadastroCliente');
}

function abrirModalParaEditarCliente(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    document.getElementById('tituloModalCliente').textContent = 'Editar Cliente';
    document.getElementById('idClienteEditar').value = cliente.id;
    document.getElementById('nomeCliente').value = cliente.nome;
    document.getElementById('cpfCliente').value = cliente.cpf;
    document.getElementById('rgCliente').value = cliente.rg;
    document.getElementById('telefoneCliente').value = cliente.telefone;
    document.getElementById('profissaoCliente').value = cliente.profissao;
    document.getElementById('cepCliente').value = cliente.cep;
    document.getElementById('ruaCliente').value = cliente.rua;
    document.getElementById('numeroCliente').value = cliente.numero;
    document.getElementById('bairroCliente').value = cliente.bairro;
    document.getElementById('cidadeCliente').value = cliente.cidade;
    document.getElementById('estadoCliente').value = cliente.estado;
    document.getElementById('complementoCliente').value = cliente.complemento;
    abrirModal('modalCadastroCliente');
}

function salvarCliente() {
    if (!validarFormulario('modalCadastroCliente')) {
        mostrarNotificacao('Por favor, corrija os campos inválidos.', 'erro');
        return;
    }
    const idCliente = document.getElementById('idClienteEditar').value;
    if (idCliente) editarCliente(parseInt(idCliente));
    else cadastrarNovoCliente();
}

function cadastrarNovoCliente() {
    const cpf = document.getElementById('cpfCliente').value.trim();
    if (clientes.some(c => c.cpf === cpf)) {
        mostrarNotificacao('CPF já cadastrado.', 'erro');
        return;
    }
    const novoCliente = {
        id: proximoClienteId++,
        nome: document.getElementById('nomeCliente').value.trim(),
        cpf: cpf,
        rg: document.getElementById('rgCliente').value.trim(),
        telefone: document.getElementById('telefoneCliente').value.trim(),
        profissao: document.getElementById('profissaoCliente').value.trim(),
        cep: document.getElementById('cepCliente').value.trim(),
        rua: document.getElementById('ruaCliente').value.trim(),
        numero: document.getElementById('numeroCliente').value.trim(),
        bairro: document.getElementById('bairroCliente').value.trim(),
        cidade: document.getElementById('cidadeCliente').value.trim(),
        estado: document.getElementById('estadoCliente').value.trim(),
        complemento: document.getElementById('complementoCliente').value.trim()
    };
    clientes.push(novoCliente);
    mostrarNotificacao('Cliente cadastrado com sucesso!', 'sucesso');
    fecharModal('modalCadastroCliente');
    atualizarInterfaceCompleta();
}

function editarCliente(idCliente) {
    const clienteIndex = clientes.findIndex(c => c.id === idCliente);
    if (clienteIndex === -1) return;
    const clienteAtualizado = {
        id: idCliente,
        nome: document.getElementById('nomeCliente').value.trim(),
        cpf: document.getElementById('cpfCliente').value.trim(),
        rg: document.getElementById('rgCliente').value.trim(),
        telefone: document.getElementById('telefoneCliente').value.trim(),
        profissao: document.getElementById('profissaoCliente').value.trim(),
        cep: document.getElementById('cepCliente').value.trim(),
        rua: document.getElementById('ruaCliente').value.trim(),
        numero: document.getElementById('numeroCliente').value.trim(),
        bairro: document.getElementById('bairroCliente').value.trim(),
        cidade: document.getElementById('cidadeCliente').value.trim(),
        estado: document.getElementById('estadoCliente').value.trim(),
        complemento: document.getElementById('complementoCliente').value.trim()
    };
    clientes[clienteIndex] = clienteAtualizado;
    emprestimos.forEach(emp => { if (emp.cliente.id === idCliente) emp.cliente = clienteAtualizado; });
    mostrarNotificacao('Cliente atualizado com sucesso!', 'sucesso');
    fecharModal('modalCadastroCliente');
    atualizarInterfaceCompleta();
}

function excluirCliente(clienteId) {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;
    if (confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"? Todos os empréstimos associados a ele também serão removidos.`)) {
        clientes = clientes.filter(c => c.id !== clienteId);
        emprestimos = emprestimos.filter(emp => emp.cliente.id !== clienteId);
        mostrarNotificacao('Cliente e seus empréstimos foram excluídos.', 'sucesso');
        atualizarInterfaceCompleta();
    }
}

function limparCamposCadastroCliente() {
    const form = document.getElementById('modalCadastroCliente');
    form.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.classList.remove('campo-valido', 'campo-invalido');
    });
    form.querySelectorAll('.mensagem-erro').forEach(div => div.textContent = '');

    const cepCliente = document.getElementById('cepCliente');
    cepCliente.addEventListener('blur', () => buscarEnderecoPorCep(cepCliente.value, 'cliente'), { once: true });
}