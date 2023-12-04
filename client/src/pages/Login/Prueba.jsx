import logo from "../../assets/Borcelle.png"

const Prueba = () => {
   

    const containerStyle = {
        backgroundColor: 'rgba(27, 32, 40, 0.3)', 
        border: '1px solid #64748b', 
        borderRadius: '0.375rem', 
        padding: '5rem', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
        backdropFilter: 'blur(4px)', 
        position: 'relative',
      };
    
    return (
        <div  >
            <div style={containerStyle}>
                <img src={logo} alt="" style={{width:"20rem", height:"auto"}} />
            </div>
        </div>
    )
}

export default Prueba;