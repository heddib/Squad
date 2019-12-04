import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

const encodeGetParams = p => 
    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

export default class LoginService extends BackendService {

    login(user) {
        console.log('LOGIN BEING HERE')
        console.log('Headers : ' +JSON.stringify(this.getCommonHeaders()))
        console.log(encodeGetParams({
            username: user.username,
            password: user.password
        }));
        
        return http.request({
            url: this.baseUrl + "users/authenticate",
            method: "POST",
            headers: JSON.stringify(this.getCommonHeaders()),
            content: encodeGetParams({
                username: user.username,
                password: user.password
            }),
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.log('User logged in with token: ' + data.authdata.username)
            super.user =JSON.stringify(data.authdata)
        })
    }

    register(user) {
        return http.request({
            url: this.baseUrl + "users/register",
            method: "POST",
            headers: this.getCommonHeaders(),
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password
            }),
        })
        .then(this.validateCode())
        .then(this.getJson())
        .then(data => {
            console.info('User registered: ', data)
        })
    }

    resetPassword(email) {
        return http.request({
            url: this.baseUrl + "users/reset-password",
            method: "POST",
            headers: this.getCommonHeaders(),
            content: JSON.stringify({
                email: user.email
            }),
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.info('Reset password for email: ' + data.Result.Result)
        })
    }

    logout() {
        // LOGOUT
        super.user = ""
    }

    getCommonHeaders() {
        // return authorization header with basic auth credentials
        //console.log(super.user)
        //let user = JSON.parse(super.user);

        console.log('IS LOGGED IN ? : ' + this.isLoggedIn())

        if(this.isLoggedIn()) {
            console.log('CO')
            console.log(super.user)
            let user = JSON.parse(super.user);
            if (user && user.authdata) {
                return { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + user.authdata
                };
            }
        } else {
            console.log('PAS CO')
            return {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }

        /* if (user && user.authdata) {
            return { 
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + user.authdata
            };
        } else {
            return {
                'Content-Type': 'application/json',
            };
        } */
    }
}
