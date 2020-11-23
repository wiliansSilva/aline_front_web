import {http} from "../services/api" 



export default{
    lista:() =>{

        return http.get('listagem')
    }
}
