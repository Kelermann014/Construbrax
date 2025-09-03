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
    
    // Coniuge
    if (cliente.conjuge) {
        document.getElementById('nomeConjugeCliente').value = cliente.conjuge.nome;
        document.getElementById('cpfConjugeCliente').value = cliente.conjuge.cpf;
    }

    // Endereco moradia
    if (cliente.enderecoMoradia) {
        document.getElementById('cepMoradiaCliente').value = cliente.enderecoMoradia.cep;
        document.getElementById('ruaMoradiaCliente').value = cliente.enderecoMoradia.rua;
        document.getElementById('numeroMoradiaCliente').value = cliente.enderecoMoradia.numero;
        document.getElementById('bairroMoradiaCliente').value = cliente.enderecoMoradia.bairro;
        document.getElementById('cidadeMoradiaCliente').value = cliente.enderecoMoradia.cidade;
        document.getElementById('estadoMoradiaCliente').value = cliente.enderecoMoradia.estado;
        document.getElementById('complementoMoradiaCliente').value = cliente.enderecoMoradia.complemento;
    }

    // Endereco imovel
    if (cliente.enderecoImovel) {
        document.getElementById('cepImovelCliente').value = cliente.enderecoImovel.cep;
        document.getElementById('ruaImovelCliente').value = cliente.enderecoImovel.rua;
        document.getElementById('numeroImovelCliente').value = cliente.enderecoImovel.numero;
        document.getElementById('bairroImovelCliente').value = cliente.enderecoImovel.bairro;
        document.getElementById('cidadeImovelCliente').value = cliente.enderecoImovel.cidade;
        document.getElementById('estadoImovelCliente').value = cliente.enderecoImovel.estado;
        document.getElementById('complementoImovelCliente').value = cliente.enderecoImovel.complemento;
    }
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
        conjuge: {
            nome: document.getElementById('nomeConjugeCliente').value.trim(),
            cpf: document.getElementById('cpfConjugeCliente').value.trim()
        },
        enderecoMoradia: {
            cep: document.getElementById('cepMoradiaCliente').value.trim(),
            rua: document.getElementById('ruaMoradiaCliente').value.trim(),
            numero: document.getElementById('numeroMoradiaCliente').value.trim(),
            bairro: document.getElementById('bairroMoradiaCliente').value.trim(),
            cidade: document.getElementById('cidadeMoradiaCliente').value.trim(),
            estado: document.getElementById('estadoMoradiaCliente').value.trim(),
            complemento: document.getElementById('complementoMoradiaCliente').value.trim()
        },
        enderecoImovel: {
            cep: document.getElementById('cepImovelCliente').value.trim(),
            rua: document.getElementById('ruaImovelCliente').value.trim(),
            numero: document.getElementById('numeroImovelCliente').value.trim(),
            bairro: document.getElementById('bairroImovelCliente').value.trim(),
            cidade: document.getElementById('cidadeImovelCliente').value.trim(),
            estado: document.getElementById('estadoImovelCliente').value.trim(),
            complemento: document.getElementById('complementoImovelCliente').value.trim()
        }
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
        conjuge: {
            nome: document.getElementById('nomeConjugeCliente').value.trim(),
            cpf: document.getElementById('cpfConjugeCliente').value.trim()
        },
        enderecoMoradia: {
            cep: document.getElementById('cepMoradiaCliente').value.trim(),
            rua: document.getElementById('ruaMoradiaCliente').value.trim(),
            numero: document.getElementById('numeroMoradiaCliente').value.trim(),
            bairro: document.getElementById('bairroMoradiaCliente').value.trim(),
            cidade: document.getElementById('cidadeMoradiaCliente').value.trim(),
            estado: document.getElementById('estadoMoradiaCliente').value.trim(),
            complemento: document.getElementById('complementoMoradiaCliente').value.trim()
        },
        enderecoImovel: {
            cep: document.getElementById('cepImovelCliente').value.trim(),
            rua: document.getElementById('ruaImovelCliente').value.trim(),
            numero: document.getElementById('numeroImovelCliente').value.trim(),
            bairro: document.getElementById('bairroImovelCliente').value.trim(),
            cidade: document.getElementById('cidadeImovelCliente').value.trim(),
            estado: document.getElementById('estadoImovelCliente').value.trim(),
            complemento: document.getElementById('complementoImovelCliente').value.trim()
        }
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

    const cepMoradiaCliente = document.getElementById('cepMoradiaCliente');
    cepMoradiaCliente.addEventListener('blur', () => buscarEnderecoPorCep(cepMoradiaCliente.value, 'cliente-moradia'), { once: true });
    
    const cepImovelCliente = document.getElementById('cepImovelCliente');
    cepImovelCliente.addEventListener('blur', () => buscarEnderecoPorCep(cepImovelCliente.value, 'cliente-imovel'), { once: true });
}
