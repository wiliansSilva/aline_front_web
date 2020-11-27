import "../layouts/Esqueceu.css"
import React, {Component} from 'react';
import Ver from "../services/verif"


export default class Esqueceu extends Component{
    
    constructor(){
        super()
        this.state={
            email: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.postVerif = this.postVerif.bind(this);
    }
    
    handleChange = (e) =>{this.setState({value: e.target.value})}
    

    postVerif(aux){
        Ver.ver(aux).then(response => {
            console.log(response.data);
            localStorage.setItem('Email_esquecido', this.state.email);
            this.props.history.push("/Esqueceu-senha2");

        })
    }

    render(){
    return(
        <div className="container_esq_geral">
            <div className="container_esq">
                <p>Digite seu email para recuperar sua senha</p>
                <h1>Email</h1>
                <input type="text" onChange= {(e) => {this.setState({email: e.target.value })}}/>
                <button onClick={()=> this.postVerif(this.state.email)}>Verificar</button>
            </div>
        </div>
    );
    }
}
