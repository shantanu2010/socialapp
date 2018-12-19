import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const isAuth = this.authService.getIsAuth();
    if (!isAuth)
      this.router.navigate(['/auth/login']);

    return isAuth;
  }
}
