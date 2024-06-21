import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FirebaseService }  from '../service/firebase.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';





import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule,
             FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
             MatIconModule,MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
  ) { }

  readonly dialog = inject(MatDialog);


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required,Validators.minLength(4)]);

  hide = true;

  async login(){
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    if (email !== null && password !== null) {
      if(!await this.firebaseService.login(email, password)){
        console.log('Credenciales incorrectas');
        this.dialog.open(AlertDialogComponent,{
          data: {title: 'Error', content: 'Credenciales incorrectas'}
        });
        this.emailFormControl.setValue('');
        this.passwordFormControl.setValue('');
      }
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


