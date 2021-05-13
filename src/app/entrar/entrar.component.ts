import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor( private auth: AuthService,
  private router:Router) { }

  ngOnInit() {
    console.log(" aqui no inicio token",environment.token)

    window.scroll(0,0)
  }
   entrar(){
     this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
       this.userLogin = resp
       
       // agora para saber informacoes  do user colocamos em variaveis SÓ QUE ESSAS VARIAVEIS TEM QUE SER GLOBAL! ENTAO USAMOS no angular environment para variaveis globais. onfiguradas no arquivo (environment.prod.ts) .
       environment.id = this.userLogin.id 
       environment.token = this.userLogin.token 
       environment.nome = this.userLogin.nome 
       environment.foto = this.userLogin.foto 
       environment.tipo = this.userLogin.tipo
       
       console.log(environment.token) //aula 13
       console.log(environment.nome) //aula 13


       this.router.navigate(['/inicio'])
     },errinho =>{
       if(errinho.status == 500){
         alert('Usuario e senha estão incorretos')
       }
     })
   }

}
/*
, err =>{
       if(err.status == 500){
         alert('Erro no cadastro ')
       }
     }
     */ 