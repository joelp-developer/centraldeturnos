import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BaseSQLService {

  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    console.log(this.http.get(`${this.apiUrl}/usuarios`));
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  postUsuario(Usuario: FormGroup) {

    console.log(Usuario.value);

    return this.http.post(`${this.apiUrl}/usuarios`, Usuario.value).subscribe((data: any) => {
      console.log(data);},
       (err) => {   console.error(err);});
  };

  postMedico(Medico: FormGroup) {
    return this.http.post(`${this.apiUrl}/medicos`, Medico.value).subscribe((data: any) => {
      console.log(data);},
       (err) => {   console.error(err);});
  }

  getallEspecialidades() {
    return this.http.get(`${this.apiUrl}/especialidades`);
  }
}
