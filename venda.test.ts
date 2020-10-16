import { Venda } from './venda';
import { Endereco } from './endereco';
import { Loja } from './loja';

function verificaCampoObrigatorio(mensagemEsperada: string, venda: Venda) {
  try {
    venda.imprimeCupom();
  } catch (e) {
    expect(e.message).toBe(mensagemEsperada);
  }
}

// Todas as variáveis preenchidas
const NOME_LOJA = "Loja 1"
const LOGRADOURO = "Log 1"
const NUMERO = 10
const COMPLEMENTO = "C1"
const BAIRRO = "Bai 1"
const MUNICIPIO = "Mun 1"
const ESTADO = "E1"
const CEP = "11111-111"
const TELEFONE = "(11) 1111-1111"
const OBSERVACAO = "Obs 1"
const CNPJ = "11.111.111/1111-11"
const INSCRICAO_ESTADUAL = "123456789"

const DATAHORA = "17/10/2020 13:00:00"
const CCF = "021784"
const COO = "035804"


const TEXTO_ESPERADO_CUPOM_FISCAL = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
17/10/2020 13:00:00V CCF:021784 COO: 035804`

test('Venda', () => {
  let endereco: Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP);
  let loja: Loja = new Loja(NOME_LOJA,endereco,TELEFONE,OBSERVACAO,CNPJ,INSCRICAO_ESTADUAL);
  let venda = loja.vender(DATAHORA, CCF, COO).imprimeCupom();
  
  expect(venda).toBe(TEXTO_ESPERADO_CUPOM_FISCAL);
});
test('Venda_CCF_vazio', () => {
  let endereco: Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP);
  let loja: Loja = new Loja(NOME_LOJA,endereco,TELEFONE,OBSERVACAO,CNPJ,INSCRICAO_ESTADUAL);
  let venda = loja.vender(DATAHORA, "", COO);
  
  verificaCampoObrigatorio("O campo ccf da venda é obrigatório", venda);
});
test('Venda_COO_vazio', () => {
  let endereco: Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP);
  let loja: Loja = new Loja(NOME_LOJA,endereco,TELEFONE,OBSERVACAO,CNPJ,INSCRICAO_ESTADUAL);
  let venda = loja.vender(DATAHORA, CCF, "");
  
  verificaCampoObrigatorio("O campo coo da venda é obrigatório", venda);
});
test('Venda_DATAHORA_vazio', () => {
  let endereco: Endereco = new Endereco(LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, MUNICIPIO, ESTADO, CEP);
  let loja: Loja = new Loja(NOME_LOJA,endereco,TELEFONE,OBSERVACAO,CNPJ,INSCRICAO_ESTADUAL);
  let venda = loja.vender("", CCF, COO);
  
  verificaCampoObrigatorio("O campo data da venda é obrigatório", venda);
});