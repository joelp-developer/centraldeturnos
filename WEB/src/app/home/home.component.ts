import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';

import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BaseSQLService } from '../service/base-sql.service';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  especialidades: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];
  filteredMedicos: any[] = [];
  minFecha: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  selectedDate: Date = new Date();
  selectedHorario: string | undefined;
  turnoseleccionado: FormGroup;
  selectedMedico: string | undefined;

  showOptions = false;
  constructor(
    private sqlService: BaseSQLService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.turnoseleccionado = this.formBuilder.group({
      Fecha: ['', [Validators.required]],
      Hora: [{ disabled: true }, [Validators.required]],
      idUsuario: [''],
      idMedico: ['', [Validators.required]],
      Estado: ['Abierto', [Validators.required]],
    });
  }

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    if (localStorage.getItem('idTipoUsuario') === '1') {
      this.router.navigate(['/homemedico']);
    } else {
      this.sqlService.getallEspecialidades().subscribe((data: any) => {
        this.especialidades = data;
      });

      this.sqlService.getMedicos().subscribe((data: any) => {
        this.medicos = data;
      });

      this.turnoseleccionado.get('Hora')?.disable();

      this.turnoseleccionado
        .get('idMedico')
        ?.valueChanges.subscribe((value) => {
          if (value) {
            this.turnoseleccionado.get('Fecha')?.enable();
          } else {
            this.turnoseleccionado.get('Fecha')?.disable();
          }
        });
    }
  }

  onEspecialidadChange(idEspecialidad: number): void {
    this.filteredMedicos = this.medicos.filter(
      (medico) => medico.idEspecialidad === idEspecialidad
    );
  }

  pedirturno() {
    const fecha = this.formatDate(this.selectedDate);
    this.turnoseleccionado.setValue({
      Fecha: fecha,
      Hora: this.selectedHorario,
      idUsuario: localStorage.getItem('idUsuario') ?? '1',
      idMedico: this.turnoseleccionado.value.idMedico,
      Estado: 'Abierto',
    });
    if (this.sqlService.postTurno(this.turnoseleccionado)) {
      console.log('si');
      this.dialog
        .open(AlertDialogComponent, {
          data: {
            title: 'Solicitud de Turno',
            content: 'Su Turno ya fue Cargado',
          },
        })
        .afterClosed()
        .subscribe((result) => {
          location.reload();
        });
    } else {
      console.log('no');
    }
    this.turnoseleccionado.get('Hora')?.disable();
  }

  onDateChange(event: any): void {
    const date = event;
    const formattedDate = this.formatDate(date);
    this.sqlService.getbyturno(formattedDate).subscribe((data: any) => {
      if (data.length > 0) {
        const existingTimes = data
          .filter((turno: any) => turno.idMedico == this.selectedMedico)
          .map((turno: any) => turno.Hora);
        this.generateHorarios(existingTimes);
      } else {
        console.log('No existen turnos');
        this.generateHorarios([]);
      }
    });

    if (formattedDate >= this.formatDate(this.minFecha)) {
      this.turnoseleccionado.get('Hora')?.enable();
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  generateHorarios(existingTimes: string[]): void {
    const startHour = 9;
    const endHour = 19;
    this.horarios.length = 0;
    for (let hour = startHour; hour < endHour; hour++) {
      const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      if (!existingTimes.includes(time)) {
        this.horarios.push(time);
      }
    }
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
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
