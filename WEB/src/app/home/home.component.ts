import { Component,ChangeDetectionStrategy, OnInit} from '@angular/core';

import { Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';

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
    MatButtonModule,MatFormFieldModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  especialidades: any[] = [];
  medicos:any[] = [];
  horarios:any[] = [];
  filteredMedicos: any[] = [];
  minFecha: Date =new Date(new Date().setDate(new Date().getDate() + 1));

  selectedDate: Date= new Date();
  selectedHorario: string | undefined;
  turnoseleccionado:FormGroup ;
  selectedMedico: string | undefined;
  constructor(
    private sqlService: BaseSQLService,
    private formBuilder: FormBuilder,
  ) {

    this.turnoseleccionado =this.formBuilder.group({
      Fecha: ['',[Validators.required]],
      Hora: [{value: '', disabled: true},[Validators.required]],
      idUsuario: ['',],
      idMedico: ['',[Validators.required]],
      Estado:['Abierto',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.sqlService.getallEspecialidades().subscribe((data: any) => {
      this.especialidades = data;
    });

    this.sqlService.getMedicos().subscribe((data: any) => {
      this.medicos = data;
    });

    this.turnoseleccionado.get('Fecha')?.valueChanges.subscribe(value => {

      if (value>this.minFecha) {
        this.turnoseleccionado.get('Hora')?.enable();
        this.onDateChange(value);
      } else {
        this.turnoseleccionado.get('Hora')?.disable();
      }
    });

  }


  onEspecialidadChange(idEspecialidad: number): void {
    this.filteredMedicos = this.medicos.filter(medico => medico.idEspecialidad === idEspecialidad);
  }

  pedirturno(){
    const fecha = this.formatDate(this.selectedDate);
    console.log("hora")
    console.log(this.selectedHorario);
    this.turnoseleccionado.setValue({
      Fecha: fecha,
      Hora: this.selectedHorario,
      idUsuario: '1',
      idMedico: this.turnoseleccionado.value.idMedico,
      Estado: 'Abierto',
    })
    console.log(this.turnoseleccionado.value);
    //this.sqlService.postTurno(this.turnoseleccionado)
  }

  onDateChange(event: any): void {
    const date = event;
    const formattedDate = this.formatDate(date);
    this.sqlService.getbyturno(formattedDate).subscribe((data: any) => {

      if(data.length > 0){
        console.log("Existen turnos");
        console.log(data);
        const existingTimes = data.filter((turno: any) => turno.idMedico == this.selectedMedico)
        //.map((turno: any) => turno.hora);
        console.log(existingTimes)
        this.generateHorarios(existingTimes);
      }else{
        console.log("No existen turnos");
        this.generateHorarios([])
      }
    })

    if(formattedDate>=this.formatDate(this.minFecha)){
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
    this.horarios.length=0;
    for (let hour = startHour; hour < endHour; hour++) {
      const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      if (!existingTimes.includes(time)) {
        this.horarios.push(time);
      }
    }
  }
}
