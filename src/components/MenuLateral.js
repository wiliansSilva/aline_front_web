import '../layouts/MenuLateral.css'
import React, {Component} from 'react';

export default class MenuLateral extends Component{
    render(){
        return(
            <div className="container_menulat">
                <div className="container_menuzinho">
                    <a href="/painel-usuarios">Usuários</a>
                    <a href="">Exercícios</a>
                </div>
            </div>
        );
    }

}
