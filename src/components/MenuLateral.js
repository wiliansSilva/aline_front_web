import '../layouts/MenuLateral.css';
import React, {Component} from 'react';
import $ from "jquery";

export default class MenuLateral extends Component{
    

    constructor(){
        super();
        this.state={

        }
        this.decide= this.decide.bind(this);
        this.deslogar= this.deslogar.bind(this);
    }



    deslogar(){
        console.log(localStorage.getItem('logado'))
        if(localStorage.getItem('logado') == 1){
            localStorage.setItem('logado', 0);
            window.location.href='/';
        }
    }


        //Função pra deixar sublinhado o Usuários ou Exercicios no menu lateral esquerdo
    decide(){
        if (localStorage.getItem("Controle") === 0){
            console.log("entrou if 1");
            localStorage.setItem('Controle', 1);
            $(".exec").css("text-decoration", "underline");
            $(".user").css("text-decoration", "none");
        }
        else if (localStorage.getItem("Controle") === 1){
            localStorage.setItem('Controle', 0);
            $(".user").css("text-decoration", "underline");
            $(".exec").css("text-decoration", "none");
        }
    }
    
    componentDidMount(){
        if(localStorage.getItem('logado') == 0){
            this.props.history.push("/");
        }
        console.log(localStorage.getItem('Controle'));
    }
    
    render(){
        return(
            <div className="container_menulat">
                <div className="container_menuzinho">
                    <a className="user" onClick={() => this.decide} href="/painel-usuarios">Usuários</a>
                    <a className="exec" onClick={() => this.decide}  href="/painel-exercicios">Exercícios</a>
                    <button className="sair" onClick={()=> this.deslogar()}>Sair</button>
                </div>
            </div>
        );
    }

}
