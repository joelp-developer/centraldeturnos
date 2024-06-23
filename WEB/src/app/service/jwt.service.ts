
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  [x: string]: any;

  constructor() { }

  //#region decodeToken
  /**
   * @function decodeToken
   * @descripcion obtine el valor de localstorage el token y valida si ya expiro o no el token
   * retornando true o false
   */
  decodeToken() {
    try {
      const token = localStorage.getItem('token')
      let valido = false;
      if(token){
        const decodedToken = jwtDecode(token);
        const exp = decodedToken.exp;
        if(exp){
          if(new Date() > new Date(exp*1000)){
            valido = false;
          }else{
            valido = true;
          }
        }
      }
      return valido;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  //#endregion
}
