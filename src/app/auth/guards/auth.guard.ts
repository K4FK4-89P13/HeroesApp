import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, RouterStateSnapshot, Route, UrlSegment, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanMatch {

    private authService = inject(AuthService);
    private route = inject(Router);

    private checkAuthStatus(): MaybeAsync<GuardResult> {
        return this.authService.checkAutentication()
            .pipe(
                tap( isAutenticated => {
                    if( !isAutenticated ) {
                        this.route.navigate(['/auth/login'])
                    }
                } )
            )
    }

    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
        /* console.log('Can Math: ');
        console.log({ route, segments }); */
        return this.checkAuthStatus();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        /* console.log('Can Activated');
        console.log({ route, state }); */
        return this.checkAuthStatus();
    }

}