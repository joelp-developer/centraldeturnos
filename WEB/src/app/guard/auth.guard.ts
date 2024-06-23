import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service'

export const authGuard: CanActivateFn = (route, state) => {

  const ruta = new Router;
  const jwt = new JwtService;


  try{

    if(jwt.decodeToken()){
      return true;
    }else{
      ruta.navigate(['/login']);

      return false;
    }
  }catch{
    return false;
  }

};
