import { Component } from '@angular/core';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FirebaseService }  from '../service/firebase.service';

import { BaseSQLService } from '../service/base-sql.service';




import { Router } from '@angular/router';

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
export class LoginComponent {

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private baseSQLService: BaseSQLService
  ) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  hide = true;

  login(){
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    if (email !== null && password !== null) {
      this.firebaseService.login(email, password);
    }else{
      console.error('El correo electrónico es null');
    }

  }

  registro(){
      this.router.navigate(['/registro']);
  }

  olvidaste(){
    this.router.navigate(['/forgot']);
  }
}


