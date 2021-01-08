import { Component, OnInit } from '@angular/core';
import { BancosService } from '../bancos.service';


@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {

  bancos: Array<any> = new Array();

  constructor(private bancosService: BancosService) { }

  ngOnInit(): void {
    this.listarBancos();
  }

  listarBancos(){
    this.bancosService.listarBancos().subscribe(bancos => {
      this.bancos = bancos;
    }, err => {
      console.log("Erro: "+ err)
    })
  }

}
