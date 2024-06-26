import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { BaseSQLService } from '../service/base-sql.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homemedico',
  standalone: true,
  imports: [MatTableModule,MatInputModule,MatFormFieldModule,MatGridListModule
    ,MatCardModule,MatDatepickerModule,FormsModule, ReactiveFormsModule,MatIconModule,
    MatTooltipModule, MatButtonModule,CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './homemedico.component.html',
  styleUrl: './homemedico.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomemedicoComponent implements OnInit {

  selectedDate: Date= new Date()

  displayedColumns: string[] = ['idTurno', 'Fecha', 'Hora', 'IdUsuario', 'idMedico', 'Estado', 'actions'];
  dataSource = new MatTableDataSource<any>();
  showOptions = false;

  constructor(
    private sqlService: BaseSQLService,
    private router : Router
  ){}


  ngOnInit(): void {
    if(localStorage.getItem('idTipoUsuario')==='2'){
      this.router.navigate(['/home']);
    }else{
      const fecha = new Date();
      this.loadData(this.formatDate(fecha))
    }
  }

  onDateChange(event: any): void {
    const fecha = event;
    this.loadData(this.formatDate(fecha))

  }


  loadData(date:string) {
    const emailMedico = localStorage.getItem('email');

    this.sqlService.getbyturno(date).subscribe((turnos: any) => {
      this.sqlService.getUsuarios().subscribe((usuarios: any) => {
        const userMap = new Map(usuarios.map((user: any) => [user.idUsuario, `${user.Nombre} ${user.Apellido}`]));
        turnos.forEach((turno: any) => {
          turno.IdUsuario = userMap.get(turno.IdUsuario) || turno.IdUsuario;
        });
        this.dataSource.data = turnos;
      });

      this.sqlService.getMedicos().subscribe((medicos: any) => {
        const medicoMap = new Map(medicos.map((medico: any) => [medico.idMedico, `${medico.Nombre} ${medico.Apellido}`]));
        const medicoEmailMap = new Map(medicos.map((medico: any) => [medico.Email, medico.idMedico]));

        // Filtra los turnos que coinciden con el médico correspondiente
        const idMedico = medicoEmailMap.get(emailMedico);
        let filteredTurnos = turnos.filter((turno: any) => turno.idMedico === idMedico);

        filteredTurnos.forEach((turno: any) => {
          turno.idMedico = medicoMap.get(turno.idMedico) || turno.idMedico;
        });

        filteredTurnos = filteredTurnos.sort((a: any, b: any) => {
          return a.Hora.localeCompare(b.Hora);
        });
        // Asigna los datos filtrados a this.dataSource.data
        this.dataSource.data = filteredTurnos;
      });
    });
  }

  updateEstado(element: any, estado: string) {
    element.Estado = estado;
    //Aquí puedes agregar una llamada al servicio para actualizar el estado en la base de datos si es necesario.
    this.sqlService.putTurno(element.idTurno, estado)
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDate(date: Date): string {

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
  option1Action() {
    // Acción para la opción 1
    console.log('Opción 1 seleccionada');
  }

  Logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }


}
