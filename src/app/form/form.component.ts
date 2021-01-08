import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BancosService } from '../bancos.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  constructor(private bancosService: BancosService, private fb: FormBuilder) { }

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

  onSubmit(){
    console.warn(this.clienteForm);
  }

  validarCpf(c: AbstractControl) : {[key: string] : boolean}{
    let valueInitial : string = c.value;
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
