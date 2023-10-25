const Formulario = ({cliente}) => {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="nombre"
                >Nombre:</label>
                <input 
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Usuario"
                    name="nombre"
                    defaultValue={cliente?.nombre}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="usuario"
                >User Name:</label>
                <input 
                    id="Usename"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Username"
                    name="usuario"
                    defaultValue={cliente?.usuario}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="usuario"
                >User Name:</label>
                <input 
                    id="password"
                    type="password"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="password"
                    name="password"
                    defaultValue={cliente?.contreña}
                />
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="email"
                >E-mail:</label>
                <input 
                    id="email"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Email del Cliente"
                    name="email"
                    defaultValue={cliente?.email}
                />
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="telefono"
                >Teléfono:</label>
                <input 
                    id="telefono"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Teléfono del Cliente"
                    name="telefono"
                    defaultValue={cliente?.telefono}
                />
            </div>

            
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="ci"
                >CI:</label>
                <input 
                    id="ci"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="CI del Usuario"
                    name="ci"
                    defaultValue={cliente?.ci}
                />
            </div>
        </>
    )
}

export default Formulario