import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { initializeApp } from 'firebase/app';

import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword  } from "firebase/auth";
import { BaseSQLService } from './base-sql.service';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    private router: Router,
    private baseSQLService: BaseSQLService,

  ) { }

  firebaseConfig ={
    apiKey: "AIzaSyCra3mUK35JRVyECl278grFK1Wgsz7-qpk",
    authDomain: "centraldeturnos-ab669.firebaseapp.com",
    projectId: "centraldeturnos-ab669",
    storageBucket: "centraldeturnos-ab669.appspot.com",
    messagingSenderId: "622494120201",
    appId: "1:622494120201:web:87f7f420e74c4a82eefbd8"
  }
  app = initializeApp(this.firebaseConfig);
  auth = getAuth(this.app);
  user = this.auth.currentUser;

  login(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.baseSQLService.getbyUsuario(email).subscribe((data: any) => {

          if(data.IdTipoUsuario === 1){
            this.router.navigate(['/homemedico']);
          }else{
            this.router.navigate(['/home']);
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  forgot(email: string){
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        //agregar un alerta y  borrar el email y enviarlo a la pagina dellogin

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  Registro(usuario:FormGroup){
    createUserWithEmailAndPassword(this.auth, usuario.value.Email, usuario.value.Contrasenia)
      .then((userCredential) => {

        const user = userCredential.user;
        //agregar un alerta y enviarlo a la pagina dellogin
        console.log(user);
        console.log(usuario.value);
        this.baseSQLService.postUsuario(usuario);

        if(usuario.value.IdTipoUsuario == 1){
          console.log("es medico");
          this.baseSQLService.postMedico(usuario);
        }

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error" + errorMessage);
        alert("Verificar corre Ya registrado");

      });
  }



  updatePASWORD( newPassword: string){
    if(this.auth.currentUser){
      updatePassword(this.auth.currentUser, newPassword).then((data) => {
        // Update successful.

        if(this.auth.currentUser?.email){
          this.baseSQLService.putUsuariopass(this.auth.currentUser.email,newPassword);
        }
      }).catch((error) => {
        // An error ocurred
        // ...
        console.log(error)
      });
    }
  }
}
