import React from 'react';
import LoginPage from './LoginPage';
import loginImage from '../../assets/fondo.jpg';
import Prueba from './Prueba';

const Login = () => {
  const containerStyle = {
    color: 'white',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${loginImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    
    <div style={containerStyle}>
     
      <div className=' hidden lg:flex '>
           <Prueba/>
          
      </div>
      <div >
           <LoginPage/>
      </div>
        
    </div>
  );
};

export default Login;
