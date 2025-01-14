import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AlertComponent} from '../../pages/extra-components/alert/alert.component';


@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  alert: { type: AlertComponent, message: string } = {
    type: 'success',
    message: '',
  };

  user: any = {
    email: '',
    password: '',
  };
  rememberMe: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  private _cookieService: CookieService;
  private _router: Router;
  private _authService: AuthService;
  private _activatedRoute: ActivatedRoute;

  ngOnInit(): void {
    this.checkAlreadyLogin();
  }

  constructor(private router: Router, cookieService: CookieService, authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this._cookieService = cookieService,
      this._router = router,
      this._authService = authService,
      this._activatedRoute = activatedRoute;
  }

  onLogin(): void {
    this.submitted = true;
    this.errorMessage = '';
    this._authService.login(this.user.email, this.user.password).subscribe(res => {

      if (res.data.token) {
        this._cookieService.set('access_token', res.data.token);
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
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
        this.alert = {
          type: 'error',
          message: res.message,
        };
      }
    });
  }

  checkAlreadyLogin(): void {
    const token = this._cookieService.get('access_token');
    // console.log('token : ' + token);
    if (token) {
      this._router.navigate(['dashboard']);
    }
  }


}








