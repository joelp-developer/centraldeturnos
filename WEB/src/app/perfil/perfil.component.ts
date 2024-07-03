import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseSQLService } from '../service/base-sql.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatIconModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  showOptions!: boolean;
  constructor(
    private sqlService: BaseSQLService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  dataTurno!: any;
  ngOnInit(): void {
    this.syncAllTurnos();

    if (localStorage.getItem('idTipoUsuario') === '1') {
      this.router.navigate(['/homemedico']);
    }
  }

  syncAllTurnos() {
    const idUser = localStorage.getItem('idUsuario') || '';
    this.sqlService.getAllByIdTurnos(idUser).subscribe(
      (data) => {
        this.dataTurno = data;
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
    this.router.navigate(['/home']);
  }
  option1Action() {
    // Acción para la opción 1
    this.router.navigate(['/perfil']);
    console.log('Opción 1 seleccionada');
  }

  Logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
