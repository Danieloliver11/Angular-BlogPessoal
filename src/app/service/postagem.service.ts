import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private htpp: HttpClient
  ) { }

  token={
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  getAllPostagem():Observable<Postagem[]>{
    return this.htpp.get<Postagem[]>('http://localhost:8080/postagem',this.token)
  }
  getByIdPostagem(id: number):Observable<Postagem>{
    return this.htpp.get<Postagem>(`http://localhost:8080/postagem/${id}`,this.token)
  }
  getByTituloPostagem(titulo:string):Observable<Postagem[]>{
    return this.htpp.get<Postagem[]>(`http://localhost:8080/postagem/titulo/${titulo}`, this.token)
  }
  postPostagem(postagem:Postagem):Observable<Postagem>{
    return this.htpp.post<Postagem>('http://localhost:8080/postagem', postagem,this.token)
  }
  putPostagem(postagem:Postagem):Observable<Postagem>{
    return this.htpp.put<Postagem>('http://localhost:8080/postagem', postagem , this.token)
  }
  deletePostagem(id:number){
   return this.htpp.delete(`http://localhost:8080/postagem/${id}`, this.token)
  }
  

}
