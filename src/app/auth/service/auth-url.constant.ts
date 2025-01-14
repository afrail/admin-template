import {environment} from '../../../environments/environment';


export class AuthUrlConstant {
    public static OAUTH_ENDPOINT = environment.catering.baseApiEndPoint + 'api/auth/signin';
    public static RESET_PASSWORD_ENDPOINT = environment.catering.baseApiEndPoint;
}
