import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/model/user";
import { EndPoint } from "src/utils/end-points";

@Injectable({
    providedIn: "root"
})
export class LoginService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user: User) {
        return this.http.post((environment.apiUrl+ EndPoint.LOGIN), user )
        .pipe(map(user => {
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));

                this.currentUserSubject.next(user);
                    
                this.router.navigate(['/dashboard']);
            }
        }));
    }
}