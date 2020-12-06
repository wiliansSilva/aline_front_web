import '../layouts/Usuarios.css'
import React, {Component} from 'react';
import MenuLateral from '../components/MenuLateral'
import getUsuarios from '../services/getUsers'
import delUsuario from '../services/deletUser'
import cadUsuario from '../services/cad_user'
import Swal from 'sweetalert2'
import $ from 'jquery';

export default class Usuarios extends Component{
    
    constructor(){
        super();
        
        this.state = {
         users: [],
         email: '',
         password: '',
         name: ''
        };
        this.deletaUser = this.deletaUser.bind(this);
        this.cadUser = this.cadUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.redireciona = this.redireciona.bind(this);
    }
    
    handleChange = (e) =>{this.setState({value: e.target.value})}
    

    

    redireciona(email){
        localStorage.setItem('vermais_email', email);
        localStorage.setItem('vermais_control', 1);
        this.props.history.push("/painel-exercicios");
    }

    cadUser(){
        cadUsuario.conta(this.state.name, this.state.email, this.state.password).then( response => {
            console.log("entra no reload");
            Swal.fire({title: 'Usuário Cadastrado!!!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    window.location.reload()
                  })
        })
    }

    deletaUser(aux){
        delUsuario.deleta(aux).then(response =>{
            console.log(response.data);
            window.location.reload();
        })
    }

    

    
    componentDidMount(){
        if(localStorage.getItem('logado') == 0){
            this.props.history.push("/");
        }
        console.log("aqui")
        console.log(localStorage.getItem('logado'));
        getUsuarios.lista().then(response =>{
            console.log(response.data);
            this.setState({users: response.data});
        })
      }
    render(){
        return(
            <div>
                <MenuLateral/>
            <div className="container_painel_us">
                <div className="container_usuarios">
                    <div className="container_cadastro">
                        <h1>Cadastrar Novos Usuários</h1>
                        <p>Nome</p>
                        <input type="text" onChange={(e) => {this.setState({name: e.target.value })}}/>
                        <p>Email</p>
                        <input type="text" onChange={(e) => {this.setState({email: e.target.value })}}/>
                        <p>Senha</p>
                        <input type="password" onChange={(e) => {this.setState({password: e.target.value })}}/>
                        <button onClick={() => this.cadUser()}>Cadastrar</button>
                    </div>
                    <div className="cadastrados">
                        {this.state.users.map( data =>
                        <div className="linha">
                            <p className="nome">{data.name}</p>
                            <p className="email">{data.email}</p>
                            <div className="user_botoes">
                                <button onClick={() => this.redireciona(data.email)}>Ver Mais</button>
                                <button onClick={() => this.deletaUser(data.id)}>Deletar</button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


