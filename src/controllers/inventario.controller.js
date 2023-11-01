const pool = require("../db");



// get roles
const getInventarios = async(req, res) => {
    try {
        const value = await pool.query(`SELECT cod,nombre,precio,cantidad
                                        FROM producto
                                        JOIN inventario ON inventario.id_producto = producto.cod`);
        res.json(value.rows);
    } catch (error) {
        res.json(error);
    }
};

const getInventario = async(req, res) => {
    const { id } = req.params;

    try {

        const rol = await pool.query(`SELECT cod,nombre,descripcion,precio,cantidad
                                    FROM producto
                                    JOIN inventario ON inventario.id_producto = producto.cod
                                    where cod=$1`, [id]);

        res.json(rol.rows);
    } catch (error) {
        res.json(error);
    }
};




module.exports = {
    getInventarios,
    getInventario
};