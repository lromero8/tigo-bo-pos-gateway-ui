import { Injectable } from '@angular/core';
import { environment } from 'environments/environment'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

     /*   let roles = route.data["breadcrumb"];
        console.log("canActivate")
        console.log(roles)
        
*/
if(!environment.production)
return true

//console.log(state.url);
        if (localStorage.getItem('token')) {
            
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}