import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { traceUntil } from '@angular/fire/performance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioLogin: FormGroup = {} as FormGroup;
  datosCorrectos:boolean = true
  textoError:string = ""

  constructor(private creadorFormulario: FormBuilder, public afAuth: AngularFireAuth, private spinner: NgxSpinnerService){

    }

  ngOnInit(){
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  ingresar(){
    if(this.formularioLogin.valid){
      this.datosCorrectos=true
      this.spinner.show()
      this.afAuth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario) =>{
      console.log(usuario);
      this.spinner.hide()
    })
    .catch((error) =>{
      this.datosCorrectos = false
      this.textoError = error.message
      this.spinner.hide()
      
    })
    }
    else{
      this.datosCorrectos=false
      this.textoError = "Por favor revisa que los datos esten correctos"
    }
  }

}
