import './barraNav.scss'
import React, { useState } from 'react';
import { ImExit } from 'react-icons/im';
import gym from "../../../public/Gym.svg"
import wilson from "../../../public/wilson.svg"
import fin from "../../../public/LogoFin.svg"
import { Link } from 'react-router-dom';

const BarraNav = () => {

 
  return (
    <div className='barraNav'>
      <div >
        <img className='logo' src={fin} alt=""  />
        
      </div>
      <div className='icons'>
        <img src="/search.svg" alt="" className='icon' />
        <img src="/app.svg" alt="" className='icon'/>
        <img src="/expand.svg" alt="" className='icon'/>
        <img src="/settings.svg" alt="" className='icon' />
        <div className="notificacion">
        <img src="/notifications.svg" alt="" className='icon'/>
        <span>1</span>
        </div>
        <div className="usuario">
          <img src="" alt="" />
        </div>
        <div>
       
        <Link to='/'>
        <ImExit size='25px' gap='20px' color='red' />
        </Link>
        
       
      
    </div>
          
    
        
       
      </div>
    </div>
  )
}

export default BarraNav