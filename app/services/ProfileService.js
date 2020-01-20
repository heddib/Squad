import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

const encodeGetParams = p => 
    Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

export default class ProfileService extends BackendService {

    getProfile(user) {   
        return http.request({
            url: this.baseUrl + "users/" + user.username + "/profile",
            method: "GET",
            headers: this.getCommonHeaders(),
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.log('User profile data: ' + JSON.stringify(data))
            return data;
        })
    }

    getJobs() {   
        return http.request({
            url: this.baseUrl + "users/profiles/jobs",
            method: "GET",
            headers: this.getCommonHeaders(),
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.log('Jobs data: ' + JSON.stringify(data))
            return data;
        })
    }

    getProfilesByJob(job) {   
        return http.request({
            url: this.baseUrl + "users/profiles/job/" + job,
            method: "GET",
            headers: this.getCommonHeaders(),
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.log('Profiles data: ' + JSON.stringify(data))
            return data;
        })
    }

    updateProfile(user) {
        let params = function () {
            if(user.job)
                return encodeGetParams({
                    birthdate: user.birthdate,
                    bio: user.bio,
                    job: user.job,

                })
        }
        return http.request({
            url: this.baseUrl + "users/" + user.username + "/profile",
            method: "PUT",
            headers: this.getCommonHeaders(),  
            content: params,
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
            console.info('Profile updated: ', data)
        })
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
