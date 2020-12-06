import '../layouts/Exercicios.css';
import React, {Component} from 'react';
import MenuLateral from '../components/MenuLateral';
import $ from "jquery";
import buscaEx from '../services/getExercicios';
import getUsuarios from '../services/getUsers';
import execuser from '../services/Exec_us';
import cadEx from '../services/cadEX';
import exclui from '../services/excluiExec';
import Swal from 'sweetalert2'



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
         e_list:[],
         id:[],
         lista: [],
         em_list: ''
        };
        this.getEx= this.getEx.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.list = this.list.bind(this);
        this.cad = this.cad.bind(this);
        this.auto= this.auto.bind(this);
        this.excExec= this.excExec.bind(this);
        this.cadExec= this.cadExec.bind(this);
        this.automat=this.automat.bind(this);
        this.change= this.change.bind(this);
    }
    
    //função pra esperar certo tempo e pesquisar sozinho os exercicios do usuario que o administrador digitar
    auto(evt){
        var email = evt.target.value; // this is the search text
        this.setState({em_list: email});
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
    



    automat(email){
        console.log("entrou no automat")
            var aux;
            for(aux=0; aux<this.state.emails.length; aux++){
                if(this.state.emails[aux][0] === email){
                    execuser.list(this.state.emails[aux][1]).then(response => {
                        this.setState({lista: response.data});
                        console.log(this.state.lista)
                    })
                }
            }
    }

  


    handleChange = (e) =>{this.setState({value: e.target.value})}
    
    getEx(exerc){
        buscaEx.list(exerc).then(response =>{
            this.setState({exercicios: response.data});
        })
    }

    cadExec(user){

        if(this.state.dif == "" || this.state.descr == "" || this.state.titulo == ""|| this.state.link == ""){
            Swal.fire({title: 'Por favor preencha todos os campos!!!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            }
        else{

        for(var i=0; i< this.state.emails.length; i++){
            if(this.state.emails[i][0] === user){
                cadEx.conta(this.state.dif, this.state.descr, this.state.titulo, this.state.link, this.state.emails[i][1]).then(response =>{
                    console.log(response.data);
                    Swal.fire({title: 'Exercício Cadastrado!!!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                        }).then(() => {
                    window.location.reload()
                  })
                })
            }
        }
        }
        
    }

    excExec(id){
        exclui.deleta(id).then(response =>{
            Swal.fire({title: 'Exercício excluído com sucesso!!!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                        }).then(() => {
                    window.location.reload()
                  })
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

    change(){
        var teste= localStorage.getItem('vermais_control');
        if(teste == 1){
            localStorage.setItem('vermais_control', 0);
            this.list();
            teste=localStorage.getItem('vermais_email');
            $("#autobus").val(teste);
            this.automat(teste);
        }
    }

    componentDidMount(){
        if(localStorage.getItem('logado') == 0){
            this.props.history.push("/");
            
        }
        
        $(".lis_but").css("border", "none");
        
        getUsuarios.lista().then(response =>{
            this.setState({users: response.data});
            console.log(response.data)
            console.log(this.state.users.length)
            var user;
            for(user=0; user < this.state.users.length; user++){
                console.log(this.state.users[user].email);
                var x = document.getElementById("selec_em");
                var option = document.createElement("option");
                option.text = this.state.users[user].email;
                x.add(option);
                this.state.emails.push([this.state.users[user].email, this.state.users[user].id]);
            }
            console.log(this.state.emails);
            
            this.change();
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
                        <select onChange={(e) => {this.setState({usuario: e.target.value })}} id="selec_em">
                            <option hidden unselectable selected>Escolha o usuário</option>
                        </select>
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
                        <div>    
                            <input type="text"  id="autobus" className="autobus" placeholder="Email do usuário" onChange={evt => this.auto(evt)}/>
                            <button className="pesq" onclick={() => this.automat(this.state.em_list)}>Pesquisar</button>
                        </div>
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