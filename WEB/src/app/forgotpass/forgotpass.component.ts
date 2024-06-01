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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatFormFieldModule,
            MatIconModule,MatDividerModule,MatCardModule,MatButtonModule,
            MatProgressBarModule,MatInputModule
          ],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
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

  forgot(){
    const auth = getAuth();

    const email = this.emailFormControl.value;

    if (email !== null ) {
      sendPasswordResetEmail(auth, email)
      .then(() => {
        //agregar un alerta y  borrar el email y enviarlo a la pagina dellogin

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
