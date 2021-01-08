import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Array<any> = new Array();

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.listarCientes();
    this.clientesService.emitirClienteCriado.subscribe(
      () => {
        console.log("Listandoo")
        this.listarCientes();
      }
    );
  }

  listarCientes(){
    this.clientesService.listarClientes().subscribe(clientes => {
      var obj = this.converterDados(clientes);
      this.clientes = obj;
    }, err => {
      console.log('Erro: '+ err)
    });
  }
  
  converterDados(obj){
    
    obj.forEach(function(value){
      let preDate = value["nascimento"] == null ? null : value["nascimento"].split('-');
      let dia = preDate == null ? null : preDate[2].split("T")[0];
      value["cpf"] = value["cpf"].replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      value["nascimento"] = preDate == null ? null : dia+ "/"+preDate[1]+"/"+preDate[0];
    })
    

    return obj;
  }

}
