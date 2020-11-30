import '../layouts/Exercicios.css';
import React, {Component} from 'react';
import MenuLateral from '../components/MenuLateral';
import $ from "jquery";
import buscaEx from '../services/getExercicios';
import getUsuarios from '../services/getUsers';
import execuser from '../services/Exec_us';
import cadEx from '../services/cadEX';
import exclui from '../services/excluiExec';


export default class Exercicios extends Component{
    
    constructor(){
        super();

        this.timeout =  0;


        this.state = {
         email: '',
         usuario: '',
         link: '',
         dif: '',
         titulo: '',
         descr: '',
         exercicios: [],
         users: [],
         emails: [],
         id:[],
         lista: []
        };
        this.getEx= this.getEx.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.list = this.list.bind(this);
        this.cad = this.cad.bind(this);
        this.auto= this.auto.bind(this);
        this.excExec= this.excExec.bind(this);
        this.cadExec= this.cadExec.bind(this);
    }
    
    //função pra esperar certo tempo e pesquisar sozinho os exercicios do usuario que o administrador digitar
    auto(evt){
        var email = evt.target.value; // this is the search text
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          //search function
            var aux;
            for(aux=0; aux<this.state.emails.length; aux++){
                if(this.state.emails[aux][0] === email){
                    execuser.list(this.state.emails[aux][1]).then(response => {
                        this.setState({lista: response.data});
                        console.log(this.state.lista)
                    })
                }
            }
        

        }, 300);
      }


    handleChange = (e) =>{this.setState({value: e.target.value})}
    
    getEx(exerc){
        buscaEx.list(exerc).then(response =>{
            this.setState({exercicios: response.data});
        })
    }

    cadExec(user){
        for(var i=0; i< this.state.emails.length; i++){
            if(this.state.emails[i][0] === user){
                cadEx.conta(this.state.dif, this.state.descr, this.state.titulo, this.state.link, this.state.emails[i][1]).then(response =>{
                    console.log(response.data);
                    this.props.history.push("/painel-exercicios");
                })
            }
        }
        
    }

    excExec(id){
        exclui.deleta(id).then(response =>{
            console.log(response.data)
            this.props.history.push("/painel-exercicios");
        })

    }


    list(){
        $(".cad_but").css("border-bottom", "none");
        $(".lis_but").css("border-bottom", "1px solid #4282FF");
        $(".container_cadastro_exec").hide();
        $(".container_listagem_exec").show();
        $(".container_listagem_exec").css("display", "flex");
        $(".container_listagem_exec").css("flex-direction", "column");
    }


    cad(){
        $(".lis_but").css("border", "none");
        $(".cad_but").css("border-bottom", "1px solid #4282FF");
        $(".container_listagem_exec").hide();
        $(".container_cadastro_exec").show();
        $(".container_cadastro_exec").css("display", "flex");
        $(".container_cadastro_exec").css("flex-direction", "column");
    }

    componentDidMount(){
        $(".lis_but").css("border", "none");
        getUsuarios.lista().then(response =>{
            this.setState({users: response.data});
            console.log(response.data)
            console.log(this.state.users.length)
            var user;
            for(user=0; user < this.state.users.length; user++){
                this.state.emails.push([this.state.users[user].email, this.state.users[user].id]);
            }
            console.log(this.state.emails)
        })
        
          
    }

    render(){
        return(
            <div>
                <MenuLateral/>
                <div className="container_exercicios_geral">
                    <div className="container_exercicios_opcoes">
                        <button className="cad_but" onClick={this.cad}>Cadastro</button>
                        <button className="lis_but" onClick={this.list}>Listagem</button>
                    </div>
                    <div className="container_cadastro_exec">
                        <h1>Cadastrar Novos Exercícios</h1>
                        <p>Para o usuário:</p>
                        <input type="text"　onChange={(e) => {this.setState({usuario: e.target.value })}}/>
                        <p>Link do exercício:</p>
                        <input type="text" onChange={(e) => {this.setState({link: e.target.value })}}/>
                        <p>Dificuldade:</p>
                        <input type="number" onChange={(e) => {this.setState({dif: e.target.value })}}/>
                        <p>Título:</p>
                        <input type="text" onChange={(e) => {this.setState({titulo: e.target.value })}}/>
                        <p>Descrição do exercício:</p>
                        <input className="description" type="text" placeholder="Digite algo aqui..." onChange={(e) => {this.setState({descr: e.target.value })}}/>
                        <button onClick={() => this.cadExec(this.state.usuario)}>Cadastrar</button>
                    </div>
                    <div className="container_listagem_exec">
                        <h1>Usuário</h1>
                        <input type="text"  className="autobus" placeholder="Email do usuário" onChange={evt => this.auto(evt)}/>
                        <h1>Exercícios</h1>
                        {this.state.lista.map( data =>
                            <div className="cartao">
                                <div className="cartao_cabecalho">
                                    <p>-Título:</p>
                                    <button onClick={() => this.excExec(data.id)}>X</button>
                                </div>
                                <p className="resposta">{data.titulo}</p>
                                <p>-Dificuldade:</p>
                                <p className="resposta">{data.dificuldade}</p>
                                <p>-Descrição do exercício:</p>
                                <p className="resposta">{data.descricão}</p>
                            </div> 
                            )}
                    </div>
                </div>
            </div>
        )
    }
}