import '../layouts/Login.css'
import React, {Component} from 'react';
import MenuLateral from '../components/MenuLateral'


export default class Usuarios extends Component{
    render(){
        return(
            <div>
                <MenuLateral/>
                <div className="container_usuarios">
                    <div className="container_cadastro">
                        <h1>Cadastrar Novos Usuários</h1>
                        <p>Email</p>
                        <input type="text"/>
                        <p>Senha</p>
                        <input type="password"/>
                        
                    </div>
                </div>
            </div>
        );
    }
}