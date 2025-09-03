// dados.js

// --- DADOS DE CLIENTES E FIADORES ---
let clientes = [
  { id: 1, nome: "JOÃO DA SILVA", cpf: "111.222.333-44", rg: "12.345.678-9", telefone: "(11) 98765-4321", cep: "01001-000", rua: "PRAÇA DA SÉ", numero: "100", bairro: "SÉ", cidade: "SÃO PAULO", estado: "SP", complemento: "APTO 10", profissao: "ENGENHEIRO" },
  { id: 2, nome: "MARIA OLIVEIRA", cpf: "222.333.444-55", rg: "23.456.789-0", telefone: "(21) 91234-5678", cep: "20040-004", rua: "AVENIDA RIO BRANCO", numero: "200", bairro: "CENTRO", cidade: "RIO DE JANEIRO", estado: "RJ", complemento: "", profissao: "ADVOGADA" },
  { id: 3, nome: "PEDRO ALMEIDA", cpf: "333.444.555-66", rg: "34.567.890-1", telefone: "(31) 95555-4444", cep: "30110-008", rua: "AV. DO CONTORNO", numero: "3000", bairro: "SANTA EFIGÊNIA", cidade: "BELO HORIZONTE", estado: "MG", complemento: "SALA 5", profissao: "MÉDICO" },
  { id: 4, nome: "ANA PEREIRA", cpf: "444.555.666-77", rg: "45.678.901-2", telefone: "(41) 96666-7777", cep: "80010-010", rua: "RUA XV DE NOVEMBRO", numero: "400", bairro: "CENTRO", cidade: "CURITIBA", estado: "PR", complemento: "", profissao: "ARQUITETA" },
];
let fiadores = [
  { id: 101, nome: "CARLOS PEREIRA", cpf: "555.666.777-88", rg: "56.789.012-3", telefone: "(11) 98888-7777", cep: "01311-000", rua: "AVENIDA PAULISTA", numero: "1500", bairro: "BELA VISTA", cidade: "SÃO PAULO", estado: "SP", complemento: "CONJUNTO 50" },
  { id: 102, nome: "LUCIA FERREIRA", cpf: "999.888.777-66", rg: "67.890.123-4", telefone: "(21) 97777-8888", cep: "22071-000", rua: "RUA FRANCISCO OTAVIANO", numero: "50", bairro: "COPACABANA", cidade: "RIO DE JANEIRO", estado: "RJ", complemento: "" }
];

// --- DADOS DE EMPRÉSTIMOS PARA SIMULAÇÃO (baseado em 10/07/2025) ---
let emprestimos = [
  // Exemplo 1: Empréstimo "EM DIA"
  {
    id: 1001, cliente: clientes[0], fiador: fiadores[0], valor: 2000, juros: 5.0, parcelas: 6, dataContrato: new Date('2025-04-15'),
    parcelasDetalhadas: [
      { numero: 1, valor: 388.58, vencimento: new Date('2025-05-15'), status: 'Pago', dataPagamento: new Date('2025-05-10') },
      { numero: 2, valor: 388.58, vencimento: new Date('2025-06-15'), status: 'Pago', dataPagamento: new Date('2025-06-13') },
      { numero: 3, valor: 388.58, vencimento: new Date('2025-07-15'), status: 'A vencer', dataPagamento: null }, // Próxima parcela
      { numero: 4, valor: 388.58, vencimento: new Date('2025-08-15'), status: 'A vencer', dataPagamento: null },
      { numero: 5, valor: 388.58, vencimento: new Date('2025-09-15'), status: 'A vencer', dataPagamento: null },
      { numero: 6, valor: 388.58, vencimento: new Date('2025-10-15'), status: 'A vencer', dataPagamento: null },
    ]
  },
  // Exemplo 2: Empréstimo "ATRASADO"
  {
    id: 1002, cliente: clientes[1], fiador: fiadores[1], valor: 1500, juros: 4.5, parcelas: 4, dataContrato: new Date('2025-05-20'),
    parcelasDetalhadas: [
      { numero: 1, valor: 406.91, vencimento: new Date('2025-06-20'), status: 'Atrasado', dataPagamento: null }, // Venceu e não foi paga
      { numero: 2, valor: 406.91, vencimento: new Date('2025-07-20'), status: 'A vencer', dataPagamento: null },
      { numero: 3, valor: 406.91, vencimento: new Date('2025-08-20'), status: 'A vencer', dataPagamento: null },
      { numero: 4, valor: 406.91, vencimento: new Date('2025-09-20'), status: 'A vencer', dataPagamento: null },
    ]
  },
  // Exemplo 3: Empréstimo "A VENCER"
  {
    id: 1003, cliente: clientes[2], fiador: fiadores[0], valor: 8000, juros: 3.0, parcelas: 12, dataContrato: new Date('2025-07-05'),
    parcelasDetalhadas: Array.from({ length: 12 }).map((_, i) => ({
      numero: i + 1, valor: 789.26, vencimento: new Date(2025, 7 + i, 5), status: 'A vencer', dataPagamento: null // Primeira parcela em Agosto/2025
    }))
  },
  // Exemplo 4: Empréstimo "QUITADO"
  {
    id: 1004, cliente: clientes[3], fiador: fiadores[1], valor: 1000, juros: 6.0, parcelas: 3, dataContrato: new Date('2025-02-01'),
    parcelasDetalhadas: [
      { numero: 1, valor: 374.11, vencimento: new Date('2025-03-01'), status: 'Pago', dataPagamento: new Date('2025-02-28') },
      { numero: 2, valor: 374.11, vencimento: new Date('2025-04-01'), status: 'Pago', dataPagamento: new Date('2025-03-30') },
      { numero: 3, valor: 374.11, vencimento: new Date('2025-05-01'), status: 'Pago', dataPagamento: new Date('2025-04-29') },
    ]
  },
];

// Atualiza o status de cada empréstimo na carga inicial
emprestimos.forEach(emp => {
    const hoje = new Date('2025-07-10T00:00:00'); // Data fixa para teste
    const todasPagas = emp.parcelasDetalhadas.every(p => p.status === 'Pago');
    if (todasPagas) {
        emp.status = 'Quitado';
    } else {
        const temAtrasada = emp.parcelasDetalhadas.some(p => p.status !== 'Pago' && p.vencimento < hoje);
        if (temAtrasada) {
            emp.status = 'Atrasado';
        } else {
            const primeiraParcela = emp.parcelasDetalhadas[0];
            if (primeiraParcela.vencimento > hoje) {
                emp.status = 'A vencer';
            } else {
                emp.status = 'Em dia';
            }
        }
    }
});

let proximoClienteId = 5;
let proximoFiadorId = 103;
let proximoEmprestimoId = 1005;