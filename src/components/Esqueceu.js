import "../layouts/Esqueceu.css"
import React, {Component} from 'react';


class Esqueceu extends Component{
    
    constructor(){
        super()
        this.state={
            message
        }
    }
    
    
    render(){
    return(
        <div className="container_esq_geral">
            <div className="container_esq">
                <p>Digite seu email para recuperar sua senha</p>
                <h1>Email</h1>
                <input type="text"/>
            </div>
        </div>
    );
    }
}

export default Esqueceu;