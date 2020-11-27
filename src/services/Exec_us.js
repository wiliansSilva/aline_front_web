
import {http} from "../services/api" 



export default{
    list:(e) =>{

        return http.get('listagemusuario/'+e)
    }
}