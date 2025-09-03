// dados.js

// --- DADOS DE CLIENTES E FIADORES ---
let clientes = [
  { 
    id: 1, 
    nome: "JOÃO DA SILVA", 
    cpf: "111.222.333-44", 
    rg: "12.345.678-9", 
    telefone: "(11) 98765-4321", 
    profissao: "ENGENHEIRO",
    conjuge: { nome: "MARIA DA SILVA", cpf: "111.222.333-45" },
    enderecoMoradia: { cep: "01001-000", rua: "PRAÇA DA SÉ", numero: "100", bairro: "SÉ", cidade: "SÃO PAULO", estado: "SP", complemento: "APTO 10" },
    enderecoImovel: { cep: "04547-000", rua: "R. GOMES DE CARVALHO", numero: "888", bairro: "VILA OLÍMPIA", cidade: "SÃO PAULO", estado: "SP", complemento: "BLOCO B, APTO 50" }
  },
  { 
    id: 2, 
    nome: "MARIA OLIVEIRA", 
    cpf: "222.333.444-55", 
    rg: "23.456.789-0", 
    telefone: "(21) 91234-5678", 
    profissao: "ADVOGADA",
    conjuge: null,
    enderecoMoradia: { cep: "20040-004", rua: "AVENIDA RIO BRANCO", numero: "200", bairro: "CENTRO", cidade: "RIO DE JANEIRO", estado: "RJ", complemento: "" },
    enderecoImovel: { cep: "22050-000", rua: "RUA BARATA RIBEIRO", numero: "50", bairro: "COPACABANA", cidade: "RIO DE JANEIRO", estado: "RJ", complemento: "" }
  },
  { 
    id: 3, 
    nome: "PEDRO ALMEIDA", 
    cpf: "333.444.555-66", 
    rg: "34.567.890-1", 
    telefone: "(31) 95555-4444", 
    profissao: "MÉDICO",
    conjuge: null,
    enderecoMoradia: { cep: "30110-008", rua: "AV. DO CONTORNO", numero: "3000", bairro: "SANTA EFIGÊNIA", cidade: "BELO HORIZONTE", estado: "MG", complemento: "SALA 5" },
    enderecoImovel: { cep: "30130-140", rua: "RUA PARAÍBA", numero: "1000", bairro: "FUNCIONÁRIOS", cidade: "BELO HORIZONTE", estado: "MG", complemento: "APTO 101" }
  }
];
let fiadores = [
  { 
    id: 101, 
    nome: "CARLOS PEREIRA", 
    cpf: "555.666.777-88", 
    rg: "56.789.012-3", 
    telefone: "(11) 98888-7777", 
    conjuge: { nome: "JOANA PEREIRA", cpf: "555.666.777-89" },
    endereco: { cep: "01311-000", rua: "AVENIDA PAULISTA", numero: "1500", bairro: "BELA VISTA", cidade: "SÃO PAULO", estado: "SP", complemento: "CONJUNTO 50" }
  },
  { 
    id: 102, 
    nome: "LUCIA FERREIRA", 
    cpf: "999.888.777-66", 
    rg: "67.890.123-4", 
    telefone: "(21) 97777-8888", 
    conjuge: null,
    endereco: { cep: "22071-000", rua: "RUA FRANCISCO OTAVIANO", numero: "50", bairro: "COPACABANA", cidade: "RIO DE JANEIRO", estado: "RJ", complemento: "" }
  }
];
let veiculos = [
    { id: 1, placa: "ABC1234", marca: "FORD", modelo: "KA", ano: "2019", documentos: "IPVA e Licenciamento 2024 ok." },
    { id: 2, placa: "XYZ5678", marca: "VOLKSWAGEN", modelo: "GOL", ano: "2020", documentos: "IPVA e Licenciamento 2024 ok." }
];

// --- DADOS DE EMPRÉSTIMOS PARA SIMULAÇÃO (baseado em 10/07/2025) ---
let emprestimos = [
  // Exemplo 1: Empréstimo "EM DIA"
  {
    id: 1001, cliente: clientes[0], fiadores: [fiadores[0], fiadores[1]], valor: 2000, juros: 5.0, parcelas: 6, dataContrato: new Date('2025-04-15'),
    entradaVeiculo: veiculos[0],
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
    id: 1002, cliente: clientes[1], fiadores: [fiadores[1]], valor: 1500, juros: 4.5, parcelas: 4, dataContrato: new Date('2025-05-20'),
    entradaVeiculo: null,
    parcelasDetalhadas: [
      { numero: 1, valor: 406.91, vencimento: new Date('2025-06-20'), status: 'Atrasado', dataPagamento: null }, // Venceu e não foi paga
      { numero: 2, valor: 406.91, vencimento: new Date('2025-07-20'), status: 'A vencer', dataPagamento: null },
      { numero: 3, valor: 406.91, vencimento: new Date('2025-08-20'), status: 'A vencer', dataPagamento: null },
      { numero: 4, valor: 406.91, vencimento: new Date('2025-09-20'), status: 'A vencer', dataPagamento: null },
    ]
  },
  // Exemplo 3: Empréstimo "A VENCER"
  {
    id: 1003, cliente: clientes[2], fiadores: [fiadores[0]], valor: 8000, juros: 3.0, parcelas: 12, dataContrato: new Date('2025-07-05'),
    entradaVeiculo: null,
    parcelasDetalhadas: Array.from({ length: 12 }).map((_, i) => ({
      numero: i + 1, valor: 789.26, vencimento: new Date(2025, 7 + i, 5), status: 'A vencer', dataPagamento: null // Primeira parcela em Agosto/2025
    }))
  },
];

// IDs para novos cadastros
let proximoClienteId = 4;
let proximoFiadorId = 103;
let proximoEmprestimoId = 1004;
let proximoVeiculoId = 3;
