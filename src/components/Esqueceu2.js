import "../layouts/Esqueceu2.css"
import React, {Component} from 'react';
import Troca from "../services/esqueceu"


export default class Esqueceu2 extends Component{
    
    constructor(){
        super()
        this.state={
            codigo: '',
            senha_nova: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    Verifica(){
        Troca.troca(this.state.email, this.state.codigo, this.state.senha_nova).then( response => {
            console.log(response.data)
            this.props.history.push("/");
        })
    }
    
    handleChange = (e) =>{this.setState({value: e.target.value})}
 
    
    componentDidMount(){
        this.setState({email: localStorage.getItem("Email_esquecido")})
    }
    
    render(){
        return(
            <div className="container_cod_geral">
                <div className="container_cod">
                    <h1>Digite o código de segurança enviado para o seu email</h1>
                    <div className = "infos">
                        <p>Código de Segurança</p>
                        <input type="text" onChange= {(e) => {this.setState({codigo: e.target.value })}}/>
                        <p>Nova Senha</p>
                        <input type="password" onChange= {(e) => {this.setState({senha_nova: e.target.value })}}/>
                    </div>
                    <button onClick= {()=> this.Verifica()}>Confirmar</button>
                </div>
            </div>
        )
    }
}