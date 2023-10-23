import "./login.scss";
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
//import { createBrowserRouter, RouterProvider } from "react-router-dom";

const url=''
//const cookies =new Cookies();
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
        fetch(url,{
            method:'POST',
            headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
            body:JSON.stringify(this.state.form)
        })
        .then(response=>response.json())
        .then(response=>{
            if(response.length>0){
                console.log(response)
                

            }else{
                alert('el usuario o la contraseña no son correctos')
            }
        })
        .catch(error=>{
            console.log(error);
        })
        window.location.href='/home';
    }
    /*componentDidMount(){
        if(cookies.get('username')){
            //window.location.href='./menu'
        }
    }*/


    render(){
        return(
          <div className='login'>
          <div className='card-box'>

              <div className='figure'>
                  <div className='title'>
                      <h2>Iniciar Sesion</h2>
                  </div>
              </div>
              <div className='form'>
                  <div className='data'>
                      <label>Usuario<input placeholder='Username' /></label>
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