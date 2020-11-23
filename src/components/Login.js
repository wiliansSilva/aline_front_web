import '../layouts/Login.css'
import React, {Component} from 'react';



class Login extends Component{
    
    render(){
    return(
        <div className="container_geral">
            <div className="container_login">
                <h1>Email</h1>
                <input type="text"/>
                <h1>Senha</h1>
                <input type="password"/>
                <a href="/esqueceu-senha">Esqueceu sua senha? Clique aqui!</a>
                <button className="entrar">Entrar</button>
            </div>
        </div>
    );
    }
}

export default Login;