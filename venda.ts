import {Loja} from './loja';

export class Venda {
  constructor(private loja: Loja,private datahora: string, private ccf: string,private coo: string){}

  public isNullOrEmpty(s: String): boolean {
    return s == null || s.length == 0;
  }

  public validar_campos_obrigatorios(): void{
    if (this.isNullOrEmpty(this.ccf)) {
        throw new Error(`O campo ccf da venda é obrigatório`);
    }
    
    if (this.isNullOrEmpty(this.coo)) {
        throw new Error(`O campo coo da venda é obrigatório`);
    }

    if (this.isNullOrEmpty(this.datahora)) {
        throw new Error(`O campo data da venda é obrigatório`);
    }
  }

  public dadosVenda(): String
  {
    this.validar_campos_obrigatorios();
    return `${this.datahora}V CCF:${this.ccf} COO: ${this.coo}`;
  }

  public imprimeCupom(): string{
    let dadosLoja = this.loja.dados_loja();
    let dadosVenda = this.dadosVenda();
    return `${dadosLoja}------------------------------\n${dadosVenda}`;
  }
}