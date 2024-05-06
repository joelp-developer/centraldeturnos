import { Component, OnInit } from '@angular/core';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule,
             FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
             MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  firebaseConfig ={
    apiKey: "AIzaSyCra3mUK35JRVyECl278grFK1Wgsz7-qpk",
    authDomain: "centraldeturnos-ab669.firebaseapp.com",
    projectId: "centraldeturnos-ab669",
    storageBucket: "centraldeturnos-ab669.appspot.com",
    messagingSenderId: "622494120201",
    appId: "1:622494120201:web:87f7f420e74c4a82eefbd8"
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  hide = true;

  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
  }

  login(){
    const auth = getAuth();

    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }else{
      console.error('El correo electrónico es null');
    }

  }
}


