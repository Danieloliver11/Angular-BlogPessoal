import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public descricao: string
    public postagem:Postagem[] //Postagem É um array, já que tera Varias postagens nele! varias psotagem para UM TEMA
}