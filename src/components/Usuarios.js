import '../layouts/Usuarios.css'
import React, {Component} from 'react';
import MenuLateral from '../components/MenuLateral'
import getUsuarios from '../services/getUsers'


export default class Usuarios extends Component{
    
    constructor(){
        super();
        
        this.state = {
         users: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (e) =>{this.setState({value: e.target.value})}
    

    


    componentDidMount(){
        getUsuarios.lista().then(response =>{
            console.log(response.data);
            this.setState({users: response.data});
        })
      
      }

    render(){
        return(
            <div className="container_painel_us">
                <MenuLateral/>
                <div className="container_usuarios">
                    <div className="container_cadastro">
                        <h1>Cadastrar Novos Usuários</h1>
                        <p>Email</p>
                        <input type="text"/>
                        <p>Senha</p>
                        <input type="password"/>
                        <button>Cadastrar</button>
                    </div>
                    <div className="cadastrados">
                        {this.state.users.map( data =>
                        <div className="linha">
                            <p>{data.name}</p>
                            <div className="user_botoes">
                                <button>Ver Mais</button>
                                <button>Deletar</button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}