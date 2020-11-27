import {http} from "../services/api" 


export default{
    troca:(email, codigo, senha) =>{
        let data= {}
        data.email= email
        data.token= codigo
        data.password= senha
        return http.post('auth/passwords/resetusuario', data)
    }
}