import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';

import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';
import { BaseSQLService } from '../service/base-sql.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registroMedico',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatFormFieldModule,
            MatIconModule,MatDividerModule,MatCardModule,MatButtonModule,
            MatProgressBarModule,MatInputModule,MatSelectModule,MatOptionModule,CommonModule
          ],
  templateUrl: './registromedico.component.html',
  styleUrl: './registromedico.component.css'
})
export class RegistromedicoComponent {

  RegistroForm: FormGroup;
  especialidades: any[] = [];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private sqlService: BaseSQLService
  ) {

    this.RegistroForm = this.formBuilder.group({
      Email : ['', [Validators.required, Validators.email]],
      Contrasenia : ['', [Validators.required, Validators.minLength(4)]],
      passwordb : ['', [Validators.required, Validators.minLength(4)]],
      Nombre : ['', [Validators.required]],
      Apellido : ['', [Validators.required]],
      Telefono : ['', [Validators.required]],
      IdTipoUsuario : ['1', [Validators.required]],
      idEspecialidad : ['', [Validators.required]]
    })

    this.sqlService.getallEspecialidades().subscribe((data: any) => {
      this.especialidades = data;
    });
   }

   readonly dialog = inject(MatDialog);

  hide1 = true;
  hide2 = true;

  async registro(){

    if (this.RegistroForm.value.Contrasenia != this.RegistroForm.value.passwordb) {
      console.log("dististas claves")
      alert("Las claves no coinciden");
      this.RegistroForm.setValue({Email: this.RegistroForm.value.Email, Contrasenia: '', passwordb: '',
                                  Nombre: this.RegistroForm.value.Nombre, Apellido: this.RegistroForm.value.Apellido,
                                  Telefono: this.RegistroForm.value.Telefono, IdTipoUsuario: this.RegistroForm.value.IdTipoUsuario});
    }
    else{
      if (this.RegistroForm.value.email !== null && this.RegistroForm.value.password !== null) {
        if(!await this.firebaseService.Registro(this.RegistroForm)){

          this.dialog.open(AlertDialogComponent,{
            data: {title: 'Error', content: 'Usuario ya registrado'}
          });
        };

      }else{
        console.error('El correo electrónico es null');
      }
    }

  }

  volver(){
    this.router.navigate(['/login']);
  }
}


