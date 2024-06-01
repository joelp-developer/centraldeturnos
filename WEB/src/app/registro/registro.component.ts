import { Component,OnInit } from '@angular/core';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatFormFieldModule,
            MatIconModule,MatDividerModule,MatCardModule,MatButtonModule,
            MatProgressBarModule,MatInputModule
          ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  firebaseConfig ={
    apiKey: "AIzaSyCra3mUK35JRVyECl278grFK1Wgsz7-qpk",
    authDomain: "centraldeturnos-ab669.firebaseapp.com",
    projectId: "centraldeturnos-ab669",
    storageBucket: "centraldeturnos-ab669.appspot.com",
    messagingSenderId: "622494120201",
    appId: "1:622494120201:web:87f7f420e74c4a82eefbd8"
  }

  constructor(private router: Router) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  hide = true;

  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
  }

  registro(){
    const auth = getAuth();

    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    if (email !== null && password !== null) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        //agregar un alerta y enviarlo a la pagina dellogin
        console.log(user);

        this.router.navigate(['/login']);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }else{
      console.error('El correo electrónico es null');
    }

  }

  volver(){
    this.router.navigate(['/login']);
  }
}


