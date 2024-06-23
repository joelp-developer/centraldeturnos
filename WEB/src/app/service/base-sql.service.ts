import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BaseSQLService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  getbyUsuario(id: string) {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }

  getMedicos() {
    return this.http.get(`${this.apiUrl}/medicos`);
  }

  getbyturno(id: string) {
    return this.http.get(`${this.apiUrl}/turnos/${id}`);
  }

  postTurno(Turno: FormGroup) {
    return this.http.post(`${this.apiUrl}/turnos`, Turno.value).subscribe((data: any) => {
      console.log(data);},
       (err) => {   console.error(err);});
  }

  postUsuario(Usuario: FormGroup) {

    return this.http.post(`${this.apiUrl}/usuarios`, Usuario.value).subscribe((data: any) => {},
       (err) => {   console.error(err);});
  };

  postMedico(Medico: FormGroup) {
    return this.http.post(`${this.apiUrl}/medicos`, Medico.value).subscribe((data: any) => {},
       (err) => {   console.error(err);});
  }

  getallEspecialidades() {
    return this.http.get(`${this.apiUrl}/especialidades`);
  }

  putUsuariopass(id: string,password:string) {

    return this.http.put(`${this.apiUrl}/usuarios/${id}`, {Contraseña:password}).subscribe((data: any) => {console.log(data);}
    , (err) => {   console.error(err);});
  }


  putTurno(id: string,estado:string) {
    return this.http.put(`${this.apiUrl}/turnos/${id}`, {estado:estado}).subscribe((data: any) => {console.log(data);}
    , (err) => {   console.error(err);});
  }
}
