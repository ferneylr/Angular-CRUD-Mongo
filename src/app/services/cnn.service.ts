import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const url = "https://localhost:44388/api/";

@Injectable({
  providedIn: 'root'
})
export class CnnService {

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get(url + 'Persona');
  }

  create( persona)
  {
    console.log(persona);
    return this.http.post(url + 'Persona/', persona);
  }

  delete( id)
  {
   return  this.http.delete(url + 'Persona/' + id);
  }

  editar(id, persona){

    return this.http.put(url + 'Persona/' + id, persona);
  }

}
