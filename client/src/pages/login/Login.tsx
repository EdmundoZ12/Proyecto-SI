import "./login.scss";
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
//import { createBrowserRouter, RouterProvider } from "react-router-dom";

const url='http://localhost:3001/usuarios'
const cookies =new Cookies();
class Login extends Component{
    state={
        form:{
            username:'',
            password:''
        }
    }
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
        console.log(this.state.form)
    }

    iniciarsecion=async()=>{
        /*await axios.get(url, {params:{username:this.state.form.username, password:this.state.form.password}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0]
                cookies.set('id', respuesta.id, {path:'/'});
                cookies.set('apellido_paterno', respuesta.apellidop_aterno, {path:'/'});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path:'/'});
                cookies.set('nombre', respuesta.nombre, {path:'/'});
                cookies.set('username', respuesta.username, {path:'/'});
                //alert(`Bienvenido ${respuesta.nombre}`);
                window.location.href='./App';

            }else{
                alert('el usuario o la contraseña no son correctos')
            }
        })
        .catch(error=>{
            console.log(error);
        })*/
        window.location.href='/a';
    }
    componentDidMount(){
        if(cookies.get('username')){
            //window.location.href='./menu'
        }
    }


    render(){
        return(
          <div className='login'>
          <div className='card-box'>

              <div className='figure'>
                  <div className='title'>
                      <h2>Login</h2>
                  </div>
              </div>
              <div className='form'>
                  <div className='data'>
                      <label>Username<input placeholder='Username' /></label>
                      <label>Password<input type='password' placeholder='Password' /></label>
                  </div>
                  <div className='recover'>
                      <div className='remember'>
                          <input type='checkbox' />
                          <span>Remember me</span>
                      </div>
                      <div>
                          <a href=''>Forgot Password?</a>
                      </div>
                  </div>
                  <div className='button'>
                      <button onClick={this.iniciarsecion}>Login</button>
                  </div>
                  <div className='register'>
                      <span>Don´t have a account?</span> <a href=''>Sign up</a>
                  </div>

                  <div className='social-media'>
                      <a><i className="bi bi-instagram"></i></a>
                      <a><i className="bi bi-facebook"></i></a>
                      
                  </div>
                  <span>Page</span>
              </div>
          </div>
      </div>
        );
    }
    
}

export default Login