// script-validacao.js

// Adiciona a funcionalidade de busca de CEP
function buscarEnderecoPorCep(cep, tipo) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
        return;
    }

    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                if (tipo === 'cliente') {
                    document.getElementById('ruaCliente').value = data.logradouro;
                    document.getElementById('bairroCliente').value = data.bairro;
                    document.getElementById('cidadeCliente').value = data.localidade;
                    document.getElementById('estadoCliente').value = data.uf;
                } else if (tipo === 'fiador') {
                    document.getElementById('ruaFiador').value = data.logradouro;
                    document.getElementById('bairroFiador').value = data.bairro;
                    document.getElementById('cidadeFiador').value = data.localidade;
                    document.getElementById('estadoFiador').value = data.uf;
                }
            } else {
                mostrarNotificacao('CEP não encontrado.', 'erro');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            mostrarNotificacao('Erro ao buscar CEP. Verifique a conexão.', 'erro');
        });
}

function validarCampo(inputElement) {
    inputElement.classList.remove('campo-valido', 'campo-invalido');
    const erroDiv = document.getElementById(`erro-${inputElement.id}`);
    if(erroDiv) erroDiv.textContent = '';
    
    let ehValido = false;
    let mensagem = '';

    switch (inputElement.id) {
        case 'nomeCliente':
        case 'nomeFiador':
            if (inputElement.value.trim().length < 3) mensagem = 'O nome deve ter pelo menos 3 caracteres.';
            else ehValido = true;
            break;
        case 'cpfCliente':
        case 'cpfFiador':
            if (!validaCPF(inputElement.value)) mensagem = 'CPF inválido.';
            else ehValido = true;
            break;
        case 'telefoneCliente':
        case 'telefoneFiador':
            if (inputElement.value.length < 14) mensagem = 'Telefone incompleto.';
            else ehValido = true;
            break;
        case 'cepCliente':
        case 'cepFiador':
            if (inputElement.value.length < 9) mensagem = 'CEP incompleto.';
            else ehValido = true;
            break;
        case 'ruaCliente':
        case 'ruaFiador':
        case 'bairroCliente':
        case 'bairroFiador':
        case 'cidadeCliente':
        case 'cidadeFiador':
        case 'estadoCliente':
        case 'estadoFiador':
        case 'numeroCliente':
        case 'numeroFiador':
            if (inputElement.value.trim() === '') mensagem = 'Este campo é obrigatório.';
            else ehValido = true;
            break;
        default:
            ehValido = true;
            break;
    }

    if (inputElement.value.trim() !== '') {
        if (ehValido) {
            inputElement.classList.add('campo-valido');
        } else {
            inputElement.classList.add('campo-invalido');
            if(erroDiv) erroDiv.textContent = mensagem;
        }
    }
    return ehValido;
}

function validaCPF(cpfString) {
    const cpfLimpo = cpfString.replace(/\D/g, '');
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto >= 10) ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpfLimpo.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    let digitoVerificador2 = (resto >= 10) ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpfLimpo.charAt(10))) return false;
    return true;
}

function validarFormulario(formContainerId) {
    const form = document.getElementById(formContainerId);
    if(!form) return false;
    const inputs = form.querySelectorAll('input[placeholder]');
    let todosCamposValidos = true;
    inputs.forEach(input => {
        if (!validarCampo(input)) {
            todosCamposValidos = false;
        }
    });
    return todosCamposValidos;
}