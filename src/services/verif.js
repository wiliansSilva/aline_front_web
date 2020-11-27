import {http} from "../services/api" 


export default{
    ver:(email) =>{
        let data= {}
        data.email= email
        return http.post('auth/passwords/resetusuario', data)
    }
}