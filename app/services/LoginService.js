import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

const encodeGetParams = p => 
    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

export default class LoginService extends BackendService {

    login(user) {
        console.log('LOGIN BEING HERE')
        console.log('URL : ' + this.baseUrl + "users/authenticate")
        console.log('Headers : ' + JSON.stringify(this.getCommonHeaders()))
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
            super.user = JSON.stringify(data.authdata)
            
        })
    }

    register(user) {
        console.log(user.type);
        
        return http.request({
            url: this.baseUrl + "users/register",
            method: "POST",
            headers: this.getCommonHeaders(),  
            content: encodeGetParams({
                username: user.username,
                email: user.email,
                password: user.password,
                password_confirmation: user.confirmPassword,
                firstname: user.firstname,
                lastname: user.lastname,
                type: user.type
            }),
        })
        .then(this.validateCode)
        .then(this.getJson)
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

    getUser(username) {
        return http.request({
            url: this.baseUrl + "users/" + username + "/",
            method: "GET",
            headers: this.getCommonHeaders(),
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.log('User data: ' + JSON.stringify(data))
            return data;
        })
    }

    async isFreshAccount() {
        let fresh = false;
        await this.getUser(JSON.parse(super.user).username).then(acc => {
            if (acc) {
              fresh = acc.fresh;
            }
          });
        return fresh;
    }

    getCommonHeaders() {
        // return authorization header with basic auth credentials
        //console.log(super.user)
        //let user = JSON.parse(super.user);

        if(this.isLoggedIn()) {
            let user = JSON.parse(super.user);
            console.log('TOKEN : ' + user.token);
            
            if (user) {
                return { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + user.token
                };
            }
        } else {
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
