import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../../../service/auth.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    email: string = '';
    password: string = '';
    rememberMe: boolean = false;

    valCheck: string[] = ['remember'];


    constructor(public layoutService: LayoutService, private authService: AuthService,
                private _cookieService: CookieService,
                private activatedRoute: ActivatedRoute,
                private _router: Router) { }

    login() {
            this.authService.login(this.email, this.password).subscribe(res => {

                if (res.data.token) {
                    this._cookieService.set('access_token', res.data.token);
                    const redirectURL =
                        this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                    this._router.navigateByUrl(
                        redirectURL,
                        {
                            state: {
                                passwordHistory: '',
                                passwordPolicy: '',
                                isExpire: '',
                            },
                        },
                    );
                } else {
                }
            });
        }

    ngOnInit(): void {
            const token = this._cookieService.get('access_token');
            if (token) {
                this._router.navigate(['dashboard']);
            }
    }
}
