// script-fiador.js
function abrirModalGerenciarFiadores() {
    popularTabelaFiadores();
    abrirModal('modalGerenciarFiadores');
}

function popularTabelaFiadores() {
    const tbody = document.getElementById('tabelaGerenciarFiadores');
    tbody.innerHTML = '';
    if (fiadores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum fiador cadastrado.</td></tr>';
        return;
    }
    [...fiadores].sort((a,b) => a.nome.localeCompare(b.nome)).forEach(fiador => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${fiador.nome}</td><td>${fiador.cpf}</td><td>${fiador.telefone}</td>
            <td><div class="botoes-acao">
                <button onclick="abrirModalParaEditarFiador(${fiador.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirFiador(${fiador.id})">Excluir</button>
            </div></td>`;
        tbody.appendChild(tr);
    });
}

function abrirModalParaNovoFiador(origemSimulacao = false) {
    document.getElementById('tituloModalFiador').textContent = 'Cadastro de Fiador';
    document.getElementById('idFiadorEditar').value = '';
    limparCamposCadastroFiador();
    const modal = document.getElementById('modalCadastroFiador');
    if (origemSimulacao) modal.style.zIndex = '1101';
    else modal.style.zIndex = '1100';
    abrirModal('modalCadastroFiador');
}

function abrirModalParaEditarFiador(fiadorId) {
    const fiador = fiadores.find(f => f.id === fiadorId);
    if (!fiador) return;
    document.getElementById('modalCadastroFiador').style.zIndex = '1101';
    document.getElementById('tituloModalFiador').textContent = 'Editar Fiador';
    document.getElementById('idFiadorEditar').value = fiador.id;
    document.getElementById('nomeFiador').value = fiador.nome;
    document.getElementById('cpfFiador').value = fiador.cpf;
    document.getElementById('rgFiador').value = fiador.rg;
    document.getElementById('telefoneFiador').value = fiador.telefone;
    document.getElementById('cepFiador').value = fiador.endereco.cep;
    document.getElementById('ruaFiador').value = fiador.endereco.rua;
    document.getElementById('numeroFiador').value = fiador.endereco.numero;
    document.getElementById('bairroFiador').value = fiador.endereco.bairro;
    document.getElementById('cidadeFiador').value = fiador.endereco.cidade;
    document.getElementById('estadoFiador').value = fiador.endereco.estado;
    document.getElementById('complementoFiador').value = fiador.endereco.complemento;
    if(fiador.conjuge) {
        document.getElementById('nomeConjugeFiador').value = fiador.conjuge.nome;
        document.getElementById('cpfConjugeFiador').value = fiador.conjuge.cpf;
    }
    abrirModal('modalCadastroFiador');
}

function salvarFiador() {
  if (!validarFormulario('modalCadastroFiador')) {
      mostrarNotificacao('Por favor, corrija os campos inválidos.', 'erro');
      return;
  }
  const idFiador = document.getElementById('idFiadorEditar').value;
  if (idFiador) editarFiador(parseInt(idFiador));
  else cadastrarNovoFiador();
}

function cadastrarNovoFiador() {
  const cpf = document.getElementById('cpfFiador').value.trim();
  if (fiadores.some(f => f.cpf === cpf)) {
    mostrarNotificacao('CPF do fiador já cadastrado.', 'erro');
    return;
  }
  const novoFiador = {
    id: proximoFiadorId++,
    nome: document.getElementById('nomeFiador').value.trim(),
    cpf,
    rg: document.getElementById('rgFiador').value.trim(),
    telefone: document.getElementById('telefoneFiador').value.trim(),
    conjuge: {
      nome: document.getElementById('nomeConjugeFiador').value.trim(),
      cpf: document.getElementById('cpfConjugeFiador').value.trim()
    },
    endereco: {
      cep: document.getElementById('cepFiador').value.trim(),
      rua: document.getElementById('ruaFiador').value.trim(),
      numero: document.getElementById('numeroFiador').value.trim(),
      bairro: document.getElementById('bairroFiador').value.trim(),
      cidade: document.getElementById('cidadeFiador').value.trim(),
      estado: document.getElementById('estadoFiador').value.trim(),
      complemento: document.getElementById('complementoFiador').value.trim()
    }
  };
  fiadores.push(novoFiador);
  mostrarNotificacao('Fiador cadastrado com sucesso!', 'sucesso');
  atualizarSelectFiadores();
  if (document.getElementById('modalGerenciarFiadores').style.display === 'flex') {
      popularTabelaFiadores();
  }
  fecharModal('modalCadastroFiador');
}

function editarFiador(fiadorId) {
    const fiadorIndex = fiadores.findIndex(f => f.id === fiadorId);
    if (fiadorIndex === -1) return;
    const fiadorAtualizado = {
        id: fiadorId,
        nome: document.getElementById('nomeFiador').value.trim(),
        cpf: document.getElementById('cpfFiador').value.trim(),
        telefone: document.getElementById('telefoneFiador').value.trim(),
        conjuge: {
            nome: document.getElementById('nomeConjugeFiador').value.trim(),
            cpf: document.getElementById('cpfConjugeFiador').value.trim()
        },
        endereco: {
            cep: document.getElementById('cepFiador').value.trim(),
            rua: document.getElementById('ruaFiador').value.trim(),
            numero: document.getElementById('numeroFiador').value.trim(),
            bairro: document.getElementById('bairroFiador').value.trim(),
            cidade: document.getElementById('cidadeFiador').value.trim(),
            estado: document.getElementById('estadoFiador').value.trim(),
            complemento: document.getElementById('complementoFiador').value.trim()
        }
    };
    fiadores[fiadorIndex] = fiadorAtualizado;
    emprestimos.forEach(emp => {
        if(emp.fiadores.some(f => f.id === fiadorId)) {
            const index = emp.fiadores.findIndex(f => f.id === fiadorId);
            emp.fiadores[index] = fiadorAtualizado;
        }
    });
    mostrarNotificacao('Fiador atualizado com sucesso!', 'sucesso');
    atualizarSelectFiadores();
    popularTabelaFiadores();
    fecharModal('modalCadastroFiador');
}

function excluirFiador(fiadorId) {
    const fiador = fiadores.find(f => f.id === fiadorId);
    if (!fiador) return;
    const fiadorEmUso = emprestimos.some(emp => emp.fiadores.some(f => f.id === fiadorId));
    if (fiadorEmUso) {
        mostrarNotificacao('Não é possível excluir. Este fiador está vinculado a um empréstimo.', 'erro');
        return;
    }
    if (confirm(`Tem certeza que deseja excluir o fiador "${fiador.nome}"?`)) {
        fiadores = fiadores.filter(f => f.id !== fiadorId);
        mostrarNotificacao('Fiador excluído com sucesso.', 'sucesso');
        atualizarSelectFiadores();
        popularTabelaFiadores();
    }
}

function limparCamposCadastroFiador() {
    const form = document.getElementById('modalCadastroFiador');
    form.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.classList.remove('campo-valido', 'campo-invalido');
    });
    form.querySelectorAll('.mensagem-erro').forEach(div => div.textContent = '');

    const cepFiador = document.getElementById('cepFiador');
    cepFiador.addEventListener('blur', () => buscarEnderecoPorCep(cepFiador.value, 'fiador'), { once: true });
}
