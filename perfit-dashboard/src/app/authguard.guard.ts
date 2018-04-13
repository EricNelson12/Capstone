import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService, CookieOptions } from 'angular2-cookie/core';


@Injectable()
export class AuthguardGuard implements CanActivate {

	constructor(private cookieService:CookieService){

	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.cookieService.get('loggedin') == "true"){
      return true;
     } if(this.cookieService.get('guest') == "true"){
        return true;
    }else{
    	return false;
    }
  }
}
