import { Evento } from "./evento"
import { Palestrante } from "./palestrante"

export interface RedeSocial {
  id: number;
  nome: string;
  url: string;
  eventoId?: number;
  palestranteId?: number;
}
