import { Postagem } from "./Postagem"

// para criar uma classe 
export class User{
    public id: number // tudo que for numero aqui no typescript é number
    public nome: string
    public usuario: string
    public senha: string
    public foto: string
    public tipo: string 
    public postagem: Postagem[] // import para fazer a ligacao de relacionamento de tabelas.Postagem É um array, já que tera Varias postagens nele!
}