import { Evento } from "./evento";
import { RedeSocial } from "./rede-social";

export interface Palestrante {
   id: number;
   nome: string
   miniCurriculo: string
   imageURL: string
   telefone: string
   email: string
   redesSociais: RedeSocial[]
   palestrantesEventos: Evento[]
}
