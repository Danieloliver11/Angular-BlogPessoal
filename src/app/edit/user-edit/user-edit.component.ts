import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User =new User()
  confirmarSenha:string
  tipoUsuario:string

  idUser: number
  constructor(private auth:AuthService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
      alert("Você saiu da sua conta!")
    } 

    this.idUser = this.route.snapshot.params['id']
    this.getAllIdUser(this.idUser)
  }
  confirmSenha(event:any){
    this.confirmarSenha = event.target.value

  }

  tipoUser(event:any){
    this.tipoUsuario = event.target.value

  }
  atualizar(event:any){
    if (this.user.senha != this.confirmarSenha) {
      alert("As senhas não são iguais!")
    } else {
      this.auth.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        alert("Usuário cadastrado com sucesso! Loge novamente")
        environment.foto = ''
        environment.id = 0
        environment.nome = ''
        environment.token =''
        this.router.navigate(['/entrar'])

      }) 

    }
  }
getAllIdUser(id:number){
  this.auth.getByIdUser(id).subscribe((resp:User)=>{
    this.user = resp
  })

}

}

