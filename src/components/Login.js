import '../layouts/Login.css'
import React, {Component} from 'react';
import postLog from '../services/loginADM'
import Swal from 'sweetalert2'



export default class Login extends Component{
    constructor(){
        super();
        
        this.state = {
          email: "",
          password:""
        };
        this.postLogin = this.postLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    


    handleChange = (e) =>{this.setState({value: e.target.value})}


    async postLogin(e){
        await postLog.conta(this.state.email, this.state.password).then( response =>{
            console.log(response.data)
            if(response.data.admin){
                this.props.history.push("/painel-usuarios");
            }
            else{
                console.log("entrei aqui no 1")
                Swal.fire({title: 'Erro!',
                    text: 'Email ou senha incorretos, verifique suas informações e tente novamente!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            }
        })
      }



    render(){
    return(
        <div className="container_geral">
            <div className="container_login">
                <h1>Email</h1>
                <input type="text" onChange={(e) => {this.setState({email: e.target.value })}}/>
                <h1>Senha</h1>
                <input type="password" onChange={(e) => {this.setState({password: e.target.value })}}/>
                <a href="/esqueceu-senha">Esqueceu sua senha? Clique aqui!</a>
                <button className="entrar" onClick={this.postLogin}>Entrar</button>
            </div>
        </div>
    );
    }
}