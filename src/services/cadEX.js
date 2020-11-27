import {http} from "../services/api" 


export default{
    conta:(dificuldade, descricão, titulo, video, usuario_id) =>{
        let data= {}
        data.dificuldade= dificuldade 
        data.descricão= descricão
        data.titulo= titulo
        data.video= video
        data.usuario_id= usuario_id
        return http.post('cadastraexercicio', data)
    }
}
