import { Lote } from "./lote";
import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede-social";

export interface Evento {
  id: number;
  local: string;
  dataEvento?: Date;
  tema: string;
  qtdPessoa: number;
  imagemURL: string;
  statusEvento: string;
  telefone: string ;
  email: string;
  lotes: Lote[];
  redeSociais: RedeSocial[];
  palestrantesEventos: Palestrante[];
}
