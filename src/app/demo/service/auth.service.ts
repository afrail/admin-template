import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthUrlConstant} from './auth-url.constant';
import {AuthUtils} from "../components/auth/auth.utils";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private cookieService: CookieService,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors

  get accessToken(): string {
    return this.cookieService.get('access_token') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  set accessToken(token: string) {
    // this.cookieService.set('access_token', token);
  }

  checkAcessToken(): boolean {
    return this.cookieService.check('access_token');
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(passwordHistory): Observable<any> {
    // return this._httpClient.post('api/auth/reset-password', password);
    return this._httpClient.post(AuthUrlConstant.RESET_PASSWORD_ENDPOINT, passwordHistory).pipe(
      switchMap((response: any) => {
        return of(response);
      }),
    );
  }

  public login(username: any, password: any): Observable<any> {

    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
    };

    const LoginRequest = {username: username, password: password};
    return this._httpClient.post(AuthUrlConstant.OAUTH_ENDPOINT, LoginRequest, header).pipe(
      switchMap((response: any) => {
        if (response.status) {

          /*Store the access token in the local storage*/
          this.accessToken = response.data.token;

          /*Set the authenticated flag to true*/
          this._authenticated = true;

          /*Store the user on the user service*/
          const user = {
            id: null,
            name: username,
            email: username,
            avatar: null,
            status: 'online',
          };
        }
        return of(response);
      }),
    );

  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient.post('api/auth/refresh-access-token', {
      access_token: this.accessToken,
    }).pipe(
      catchError(() => {

        // Return false
        return of(false);
      }),
      switchMap((response: any) => {
        this.accessToken = response.access_token;
        this._authenticated = true;
        return of(true);
      }),
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    this.cookieService.delete('access_token', '/');
    this._authenticated = false;
    return of(true);
  }


  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.checkAcessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
