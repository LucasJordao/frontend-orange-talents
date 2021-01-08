import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  constructor(private http: HttpClient) { }

  listarBancos(): Observable<any>{
    return this.http.get("https://orange-talents.herokuapp.com/bancos");
  }
}
