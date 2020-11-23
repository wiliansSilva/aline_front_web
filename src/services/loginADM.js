import {http} from "../services/api" 


/*Post de quando a área do professor a ser pesquisado é escolhida*/
/*liberando assim a matéria do terceiro select que era dependente disso*/

export default{
    conta:(email, password) =>{
        let data= {}
        data.email= email
        data.password= password
        return http.post('loginadmin', data)
    }
}
