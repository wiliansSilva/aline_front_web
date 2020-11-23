import {http} from "../services/api" 


export default{
    conta:(email, password) =>{
        let data= {}
        data.email= email
        data.password= password
        return http.post('loginadmin', data)
    }
}
