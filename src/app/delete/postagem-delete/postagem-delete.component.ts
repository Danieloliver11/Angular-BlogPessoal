import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {
  nomeUserLogado = environment.nome
  fotoUserLogado = environment.foto

  postagem: Postagem = new Postagem()
  tema:Tema = new Tema()
  
  idPost: number

  constructor( private router: Router,
    private route: ActivatedRoute, 
    private postagemService:PostagemService  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
      alert("Você saiu da sua conta!")
    }

    this.idPost = this.route.snapshot.params['id']
    console.log(this.idPost) // teste para ver o id que esta sendo passado pela rota. que estava dando erro

    this.findByIdPostagem(this.idPost)  
  }
  
  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
    alert('postagem apagada com sucesso!')
    this.router.navigate(['/inicio'])
    })
  }
  

}
