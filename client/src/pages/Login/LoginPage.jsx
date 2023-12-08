import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function LoginPage() {

    const {register,handleSubmit,formState:{errors}}=useForm();
    const {signin,errors:signinErrors,isAuthenticated}=useAuth();
    const navigate=useNavigate();

    const onSubmit=handleSubmit(async(values)=>{
        signin(values);
    });
    useEffect(()=>{
        if (isAuthenticated) {
            navigate("/home")
        }
    },[isAuthenticated])

    const containerStyle = {
        backgroundColor: 'rgba(27, 32, 40, 0.3)', 
        border: '1px solid #64748b', 
        borderRadius: '0.375rem', 
        padding: '5rem', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
        backdropFilter: 'blur(4px)', 
        position: 'relative',
      };
      const inputStyle = {
        width: '18rem', 
        padding: '0.575rem 0', 
        fontSize: '0.875rem', 
        color: 'white', 
        backgroundColor: 'transparent', 
        border: 'none', 
        borderBottom: '2px solid #d1d5db', 
        appearance: 'none', 
        outline: 'none', 
        focus: {
          borderColor: '#3b82f6', 
          outline: 'none',
          ring: '0', 
          color: 'white', 
          borderColor: '#2563eb', 
        },
    };
    const buttonStyle = {
        width: '100%', 
        marginBottom: '2rem', 
        marginTop: '2.5rem', 
        fontSize: '1.125rem', 
        borderRadius: '9999px', 
        backgroundColor: '#047857', 
        color: 'white', 
        hover: {
          backgroundColor: '#047857', 
          color: 'white', 
        },
        padding: '0.5rem 1rem', 
        transition: 'background-color 0.3s, color 0.3s', 
        border: 'none', 
      };

    return (
        <div  >
            <div style={containerStyle}>
            {
                signinErrors.map((error,i)=>(
                    <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', color: 'white', textAlign: 'center' }} key={i}>
                        {error}
                    </div>
                ))
            }
                <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h1>
            <form onSubmit={onSubmit}>
                <div className="relative my-4">
                <input type="text" 
                {...register("username",{required:true})}
                placeholder="Email"
                style={inputStyle}
                />
                
                </div>
                
                {errors.username && (<p className="text-red-500">Username is required</p>)}
                <div className="relative my-4">
                <input type="password" 
                    {...register("password",{required:true})}
                    style={inputStyle}
                    placeholder="Password"

                />
                </div>
               
                {errors.password && (<p className="text-red-500">Password is required</p>)}

                <button style={buttonStyle} type="submit">Login</button>


            </form>
            </div>
        </div>
    )
}

export default LoginPage;
