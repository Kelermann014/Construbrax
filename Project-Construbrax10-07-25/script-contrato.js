// script-contrato.js
function imprimirContrato() {
  const clienteId = document.getElementById('btn-imprimir-contrato').dataset.clienteId;
  const emprestimosDoCliente = emprestimos.filter(e => e.cliente.id === parseInt(clienteId));
  const cliente = clientes.find(c => c.id === parseInt(clienteId));

  if (emprestimosDoCliente.length === 0 || !cliente) {
    mostrarNotificacao('Nenhum empréstimo selecionado para imprimir.', 'erro');
    return;
  }

  let conteudoContrato = '';
  emprestimosDoCliente.forEach(emp => {
    let parcelasHtml = '';
    emp.parcelasDetalhadas.forEach(p => {
      parcelasHtml += `<tr><td>${p.numero}</td><td>R$ ${p.valor.toFixed(2).replace('.', ',')}</td><td>${p.vencimento.toLocaleDateString('pt-BR')}</td><td>${p.status}</td></tr>`;
    });

    const fiadoresHtml = emp.fiadores.map(f => `
      <p><b>Nome do Fiador:</b> ${f.nome}</p>
      <p><b>CPF:</b> ${f.cpf}</p>
      <p><b>Endereço:</b> ${f.endereco.rua}, ${f.endereco.numero}, ${f.endereco.bairro}, ${f.endereco.cidade} - ${f.endereco.estado}</p>
      ${f.conjuge ? `<p><b>Cônjuge do Fiador:</b> ${f.conjuge.nome} (CPF: ${f.conjuge.cpf})</p>` : ''}
      <br><p style="text-align: center;">_________________________________________</p>
      <p style="text-align: center;">Assinatura do Fiador: ${f.nome}</p>
      <br><br>
    `).join('');

    const entradaVeiculoHtml = emp.entradaVeiculo ? `
      <h4>Entrada com Veículo</h4>
      <p><b>Placa:</b> ${emp.entradaVeiculo.placa}</p>
      <p><b>Marca/Modelo:</b> ${emp.entradaVeiculo.marca}/${emp.entradaVeiculo.modelo}</p>
      <p><b>Ano:</b> ${emp.entradaVeiculo.ano}</p>
      <p><b>Documentos:</b> ${emp.entradaVeiculo.documentos}</p>
    ` : '';
    
    conteudoContrato += `
      <h2>Contrato de Mútuo de Dinheiro</h2>
      <p>Pelo presente instrumento particular, de um lado, **[NOME DA SUA EMPRESA]**, doravante denominada **CREDORA**, e de outro, **${cliente.nome}**, portador(a) do CPF **${cliente.cpf}**, residente e domiciliado(a) em **${cliente.enderecoMoradia.rua}, ${cliente.enderecoMoradia.numero}, ${cliente.enderecoMoradia.bairro}, ${cliente.enderecoMoradia.cidade} - ${cliente.enderecoMoradia.estado}**, doravante denominado(a) **DEVEDOR(A)**, fica justo e contratado o presente empréstimo, que se regerá pelas cláusulas e condições descritas neste contrato:</p>
      
      <h3>Detalhes do Cliente</h3>
      <p><b>Endereço do Imóvel:</b> ${cliente.enderecoImovel.rua}, ${cliente.enderecoImovel.numero}, ${cliente.enderecoImovel.bairro}, ${cliente.enderecoImovel.cidade} - ${cliente.enderecoImovel.estado}</p>
      ${cliente.conjuge ? `<p><b>Cônjuge:</b> ${cliente.conjuge.nome} (CPF: ${cliente.conjuge.cpf})</p>` : ''}

      <h3>Detalhes do Empréstimo #${emp.id}</h3>
      <p><b>Valor Total do Empréstimo:</b> R$ ${emp.valor.toFixed(2).replace('.', ',')}</p>
      <p><b>Juros:</b> ${emp.juros}% ao mês</p>
      <p><b>Número de Parcelas:</b> ${emp.parcelas}</p>

      ${entradaVeiculoHtml}

      <h3>Fiador(es)</h3>
      ${fiadoresHtml}
      
      <div class="tabela-parcelas">
        <table>
          <thead>
            <tr><th>Parcela</th><th>Valor</th><th>Vencimento</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${parcelasHtml}
          </tbody>
        </table>
      </div>
      <br><br>
      <p style="text-align: center;">_________________________________________</p>
      <p style="text-align: center;">Assinatura do Cliente: ${cliente.nome}</p>
      <br><br>
    `;
  });

  const contratoHtml = `
  <html><head><title>Contrato de Empréstimo</title><style>
    body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
    h2 { text-align: center; margin-bottom: 20px; }
    h3, h4 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px; }
    .tabela-parcelas table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10pt; }
    .tabela-parcelas th, .tabela-parcelas td { border: 1px solid #000; padding: 6px; text-align: left; }
    .tabela-parcelas th { background-color: #f2f2f2; }
    p b { font-weight: bold; }
    .assinatura { text-align: center; margin-top: 50px; }
  </style></head><body>${conteudoContrato}</body></html>`;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(contratoHtml);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
