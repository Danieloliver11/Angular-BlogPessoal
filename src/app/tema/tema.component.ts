import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema= new Tema()

  // PARA O GETALL
  listaDetema: Tema[]


  constructor(private router: Router,
    private temaservice: TemaService,
    private alerta: AlertasService
    ) { }

  ngOnInit() {
   if(environment.token == ''){
      this.router.navigate(['/entrar'])
      alert("Você saiu da sua conta!")
    }
    if(environment.tipo != 'adm'){
      this.router.navigate(['/inicio'])
      this.alerta.showAlertInfo("Você não é administrador!")
    }
    this.findAllTemas()// dando conflito? na hora de dar o f5 GET http://localhost:8080/tema 401
  }

//pega todos os nossos temas e joga para listaDetema.
  findAllTemas(){
    this.temaservice.getAllTema().subscribe((resp: Tema[])=>{
      this.listaDetema = resp
    })
  }

  cadastrar(){
    console.log(" o token aqui tem",environment.token)

    this.temaservice.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.findAllTemas()
      alert("Seu tema foi cadastrado com sucesso!")
      this.tema = new Tema()

    })
  }

}
