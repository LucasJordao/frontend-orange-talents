import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BancosService } from '../bancos.service';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  constructor(private bancosService: BancosService, private fb: FormBuilder, private clientesService: ClientesService) { }

  errors: Array<any> = new Array();

  success = null;
  
  erroForm = null;
  cliente = {
    nome: null,
    email: null,
    cpf: null,
    nascimento: null,
    banco: null,
  };
  bancos: Array<any> = new Array();

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
  
  public cpf = [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/, "-",/\d/,/\d/];

  clienteForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(80)]],
    cpf: ['', [Validators.required, this.validarCpf]],
    nascimento: ['', Validators.required],
    banco: ['', Validators.required],
  })

  formatDate(date: string){
      let preDate = date == null ? null : date.split('-');
      let dia = preDate == null ? null : preDate[2].split("T")[0];
      return preDate == null ? null : dia+ "/"+preDate[1]+"/"+preDate[0];
  }

  onSubmit(){
    
    if(this.clienteForm.valid){
      this.erroForm = null;
      this.clienteForm.value["nascimento"] = this.formatDate(this.clienteForm.value["nascimento"]); 
      this.clienteForm.value["cpf"] = this.clienteForm.value["cpf"].replace(/([^\d])+/gim, '');

      this.clientesService.cadastrarClientes(this.clienteForm.value).subscribe(cliente =>{
        this.errors = null;
        this.success = true;
        this.clienteForm.reset();
        this.clientesService.addCliente(cliente);
      }, err => {
        this.erroForm =true;
  
        if(err.error){
          err.error.lista.forEach(erro => {
            this.errors.push(erro);
          });
        }

        console.log(this.errors);
      });

    }else{
      this.erroForm = true;
    }
  }

  validarCpf(c: AbstractControl) : {[key: string] : boolean}{
    let valueInitial : string = c.value;
    if(valueInitial != null){
    let value = valueInitial.replace(/([^\d])+/gim, '');
      var Soma;
      var Resto;
      var regex = /^(\d)(\d)\1\2{8}/;
      Soma = 0;
    if (regex.test(value)) return {"cpfValid": true};
  
    for (var i=1; i<=9; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
  
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(value.substring(9, 10)) ) return {"cpfValid": true};
  
    Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
  
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(value.substring(10, 11) ) ) return {"cpfValid": true};

    }
    
  
    return null;
    
  }

  aplicaCssErro(campo: string){
    return {
      'has-error': this.verificaValidToutched(campo),
      'has-feedback': this.verificaValidToutched(campo),
    }
  }

  verificaValidToutched(campo: string){
    return !this.clienteForm.get(campo).valid && this.clienteForm.get(campo).touched;
  }

  verificarError(campo: string, erro: string){
    let obj = this.clienteForm.get(campo);

    if(obj.errors){
      return obj.errors[erro] && obj.touched;
    }
  }


  verificarRequiredErroInvalido(campo:string, erro:string){
    let email = this.clienteForm.get(campo);

    if(email.errors && email.errors['required'] == null){
      return email.errors[erro] && email.touched
    }
  }
}
