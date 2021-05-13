import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  foto = environment.foto
  nome = environment.nome

  id = environment.id
  constructor(private router: Router,
    public auth: AuthService
    ) { }

  ngOnInit() {
  }

  sair(){
    this.router.navigate(["/entrar"])
    environment.foto = ''
    environment.id = 0
    environment.nome = ''
    environment.token =''
    alert("Você saiu da sua conta!")
  }

}
