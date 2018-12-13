import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {map, catchError} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
  if (localStorage.getItem('userToken') != null)
      return true;
      this.router.navigate(['/sign-in']);
      return false;
  }
   
}

