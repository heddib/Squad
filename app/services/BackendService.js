import { getString, setString } from 'tns-core-modules/application-settings'

const userKey = "user";

export default class BackendService {

    constructor(){
        // this.baseUrl = "https://squad.heddib.fr/";
        // this.baseUrl = "http://127.0.0.1:3000/";
        this.baseUrl = "https://squad-auth.herokuapp.com/";
    }
    
    isLoggedIn() {
        console.log('GETTING USER LOGGED IN: ' + getString(userKey))
        return !!getString(userKey);
    }
    
    get user() {
        console.log('GETTING USER: ' + getString(userKey))
        return getString(userKey);
    }
    
    set user(newUser) {
        console.log('USER SET TO: ' + newUser)
        setString(userKey, newUser);        
    }
    
    validateCode(response) {
        console.log('VALIDATING CODE : ' + response.statusCode);
        
        return new Promise((resolve, reject) => {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log('CODE IS OK')
                resolve(response)
            }

            console.log('Response with code: ' + response.statusCode +
                '\nContent: ' + response.content.toString())
            reject('Response with code: ' + response.statusCode +
                '\nContent: ' + response.content.toString())
        })
    }
    
    getJson(response) {
        return new Promise((resolve, reject) => {
            console.info('Content: ' + response.content.toString())
            resolve(response.content.toJSON())
        })
        .catch(e => {
            console.error('Error parsing JSON response: ' + e)
            throw 'Error parsing JSON response: ' + e
        })
    }
}
