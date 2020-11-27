import {http} from "../services/api" 


export default{
    deleta:(id) =>{

        return http.delete('excluiexercicio/'+id)
    }
}