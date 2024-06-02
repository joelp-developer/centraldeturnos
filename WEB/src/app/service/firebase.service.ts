import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { initializeApp } from 'firebase/app';

import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword  } from "firebase/auth";
import { BaseSQLService } from './base-sql.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    private router: Router,
    private baseSQLService: BaseSQLService

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

  login(email: string, password: string){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/home']);
        // ...
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

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
