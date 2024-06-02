import { Component } from '@angular/core';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';

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

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  hide = true;


  forgot(){
    const email = this.emailFormControl.value;

    if (email !== null ) {
      this.firebaseService.forgot(email);

    }else{
      console.error('El correo electrónico es null');
    }

  }

  volver(){
    this.router.navigate(['/login']);
  }
}
