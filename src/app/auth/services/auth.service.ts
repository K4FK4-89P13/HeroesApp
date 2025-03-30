import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { User } from "../interfaces/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";


@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    //Usuario simulado (en lugar de peticiones HTTP)
    private users: User[] = [
        { id:1, user: "Test User", email: "test@example.com" }
    ];

    private http = inject(HttpClient);

    get currentUser(): User|undefined {
        console.log("User:", this.user);
        
        if( !this.user ) return undefined;
        return structuredClone( this.user );
    }

    login (email: string, password: string): Observable<User> {
        /* return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe( 
                tap(user => this.user = user),
                tap( user => localStorage.setItem('token', user.id.toString()))
            ) */

        const user  = this.users[0];
        this.user = user;
        localStorage.setItem('token', user.id.toString());
        return of(user);
    }

    checkAutentication(): Observable<boolean> {
        if( !localStorage.getItem('token') ) return of(false);

        const token = localStorage.getItem('token');

        /* return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user ),
                map( user => !!user ),
                catchError(err => of(false))
            ) */
        const user = this.users[0];
        if(user) return of(true);
        else return of(false);
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }
}