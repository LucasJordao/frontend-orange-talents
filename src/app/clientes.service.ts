import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  emitirClienteCriado = new EventEmitter();

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<any>{
    return this.http.get("https://orange-talents.herokuapp.com/clientes");
  }

  addCliente(cliente){
    this.emitirClienteCriado.emit(cliente);
  }


  cadastrarClientes(cliente): Observable<any>{
      return this.http.post("https://orange-talents.herokuapp.com/clientes", cliente);
  }
}
