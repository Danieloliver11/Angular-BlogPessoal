import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  postagem: Postagem = new Postagem()
  
  tema: Tema = new Tema()
  
  listsTemas : Tema[]


  idTema: number
  listaPostagem: Postagem[]

  user: User= new User()
  idUser  = environment.id


  constructor(
    private router : Router,
    private temaservice: TemaService,
    private postagemservice: PostagemService,
    private auth: AuthService
  ) { }


ngOnInit() {
     if(environment.token == ''){
      this.router.navigate(['/entrar'])
      alert("Você saiu da sua conta!")
    }
    this.getAllTema() 
    this.getTodasPostagem()

  }
getAllTema(){
  return this.temaservice.getAllTema().subscribe((resp :Tema[])=>{
    this.listsTemas = resp
  })
}
findByIdTema(){
  this.temaservice.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
    this.tema = resp
  })
}

getTodasPostagem(){
  this.postagemservice.getAllPostagem().subscribe((resp:Postagem[])=>{
    this.listaPostagem = resp
  })
}
findByIdUser(){
  this.auth.getByIdUser(this.idUser).subscribe((resp:User)=>{
    this.user = resp
  })
}



publicar(){
  this.tema.id = this.idTema
  this.postagem.tema = this.tema
  this.user.id = this.idUser
  this.postagem.usuario = this.user

  this.postagemservice.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
    this.postagem = resp

    alert("Postagem realizada com sucesso!")

    this.postagem = new Postagem()
    this.getTodasPostagem()
  })
}

  
}
