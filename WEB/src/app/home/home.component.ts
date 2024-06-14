import { Component,ChangeDetectionStrategy, OnInit} from '@angular/core';

import { FormControl, FormGroup, FormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

import {MatButtonModule} from '@angular/material/button';


import { BaseSQLService } from '../service/base-sql.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,MatSelectModule,CommonModule,MatDatepickerModule,MatInputModule,
    MatButtonModule,MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  especialidades: any[] = [];
  medicos:any[] = [];
  horarios:any[] = [];
  filteredMedicos: any[] = [];

  selectedDate: Date= new Date();

  turnoseleccionado:FormGroup = new FormGroup({
    Fecha: new FormControl(),
  });

  constructor(
    private sqlService: BaseSQLService
  ) {}

  ngOnInit(): void {
    this.sqlService.getallEspecialidades().subscribe((data: any) => {
      this.especialidades = data;
      console.log(this.especialidades);
    });

    this.sqlService.getMedicos().subscribe((data: any) => {
      this.medicos = data;
      console.log(this.medicos);
    });
  }


  onEspecialidadChange(idEspecialidad: number): void {
    this.filteredMedicos = this.medicos.filter(medico => medico.idEspecialidad === idEspecialidad);
  }

  pedirturno(){
    this.sqlService.postTurno(this.turnoseleccionado)
  }

  onDateChange(event: any): void {
    const date = event;
    const formattedDate = this.formatDate(date);
    this.sqlService.getbyturno(formattedDate).subscribe((data: any) => {
      console.log("seleccionde la fecha: "+formattedDate)
      if(data.length > 0) {
        console.log(data)
      }else{
        console.log("No existen turnos");
        this.generateHorarios();
      }
    })
    console.log('Selected date: ', formattedDate);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  generateHorarios(): void {
    const startHour = 9;
    const endHour = 19;
    this.horarios = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      this.horarios.push(time);
    }
  }


}
