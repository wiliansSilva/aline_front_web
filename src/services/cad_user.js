import {http} from "../services/api" 


export default{
    conta:(name, email, password) =>{
        let data= {}
        data.name= name
        data.email= email
        data.password= password
        return http.post('signupusuario', data)
    }
}
