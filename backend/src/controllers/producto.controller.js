const pool = require("../db");

// tabla global a usar
const tabla = "producto";

// get roles
const getProductos = async (req, res) => {
  try {
    const value =
      await pool.query(`select producto.cod,producto.nombre,producto.descripcion,producto.precio,categoria.nombre as categoria,categoria.id as id_categoria
                                        from producto, categoria 
                                        where categoria.id=producto.id_categoria
                                        ORDER BY producto.cod ASC;`);
    res.json(value.rows);
  } catch (error) {
    res.json(error);
  }
};

const getProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const rol = await pool.query(
      `select producto.cod,producto.nombre,producto.descripcion,producto.precio,categoria.nombre as categoria
                                        from producto
                                        join categoria on categoria.id=producto.cod
                                        where producto.cod = $1`,
      [id]
    );

    res.json(rol.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, id_categoria } = req.body;

  try {
    if (!nombre || !descripcion || !precio || !id_categoria) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingProvider = await pool.query(
      `SELECT * FROM ${tabla} WHERE nombre = $1`,
      [nombre]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "El producto ya existe." });
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insertar el proveedor
      const insertResult = await client.query(
        "INSERT INTO producto (nombre, descripcion, precio, id_categoria) VALUES ($1, $2, $3, $4) RETURNING *",
        [nombre, descripcion, precio, id_categoria]
      );

      // Confirmar la transacción
      await client.query("COMMIT");

      // Devolver el resultado
      res.json(insertResult.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    res.json(error);
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, id_categoria } = req.body;

  try {
    if (!nombre || !descripcion || !precio || !id_categoria) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    const existingProvider = await pool.query(
      "SELECT * FROM producto WHERE nombre = $1 AND cod <> $2",
      [nombre, id]
    );

    if (existingProvider.rowCount > 0) {
      return res.status(400).json({ error: "El producto ya existe." });
    }

    const updateResult = await pool.query(
      "UPDATE producto SET nombre=$1, descripcion=$2, precio=$3, id_categoria=$4 where cod=$5 RETURNING *",
      [nombre, descripcion, precio, id_categoria, id]
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json(updateResult.rows[0]);
  } catch (error) {
    res.json(error);
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE cod = $1`,
      [id]
    );

    if (existingRol.rowCount != 0) {
      const valor = await pool.query(`delete from ${tabla} where cod=$1`, [id]);
      res.json({ succes: "Producto desactivado" });
    } else {
      res.status(400).json({ error: "El Producto no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

const activateProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const existingRol = await pool.query(
      `SELECT * FROM ${tabla} WHERE cod = $1`,
      [id]
    );

    if (existingRol.rowCount != 0) {
      // const valor = await pool.query(
      //     `update ${tabla} set activo=true where cod=$1`, [id]
      // );
      res.json({ succes: "Producto activado" });
    } else {
      res.status(400).json({ error: "El Producto no existe." });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  activateProducto,
  getProducto,
};
