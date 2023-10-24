import './login.scss'
const Login = () => {
  return (
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
                      <button>Login</button>
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
  )
}

export default Login