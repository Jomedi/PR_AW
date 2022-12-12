//CREANDO UN POOL SÍNCRONAMENTE
const mysql = require("mysql");

class DAOUsers {
    pool;
    constructor(pool) {
        this.pool = pool;
    }

    //INSERTAR USUARIO
    insertUser(nombre, email, password, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                console.log(nombre, email, password, tipo)
                connection.query("INSERT INTO ucm_aw_cau_usu_usuarios(nombre, email, password, tipo_usuario) VALUES(?,?,?,?)", [nombre, email, password, tipo],
                    function(err) {
                        console.log("aqui")
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            callback(null);
                        }
                    });
            }
        });
    }

    //USUARIO Y CONTRASEÑA CORRECTOS
    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM ucm_aw_cau_usu_usuarios WHERE email = ? AND password = ? AND activo = 1", [email, password],
                    function(err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err)
                            callback(new Error("Error de acceso a la base de datos"));
                        else {
                            if (rows.length === 0)
                                callback(null, false); //no está el usuario con el password proporcionado
                            else
                                callback(null, rows);
                        }
                    }
                );
            }
        });
    }

    //IMAGEN DE PERFIL DE USUARIO
    //obtiene el nombre de fichero que contiene la imagen de perfil de un usuario cuyo identificador en la base de datos es email.
    getUserImageName(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("SELECT imagen FROM ucm_aw_cau_usu_usuarios WHERE email = ?", [email],
                    function(err, resultado) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (resultado.length <= 0) {
                                callback(null, "No existe el usuario");
                            } else {
                                callback(null, resultado[0].imagen);
                            }
                        }
                    });
            }
        });
    }

    getUsersAdmin(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE tecnico = 1",
                    function(err, rows) {
                        connection.release()
                        if (err)
                            callback(err)
                        else
                            callback(null, rows)
                    })
            }
        })
    }

    getAllUsers(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM ucm_aw_cau_usu_usuarios",
                    function(err, rows) {
                        connection.release()
                        if (err)
                            callback(err)
                        else
                            callback(null, rows)
                    })
            }
        })
    }

    updateEliminateUser(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("UPDATE `ucm_aw_cau_usu_usuarios` SET `activo`=0 WHERE id = ?", [id],
                    function(err, result) {
                        if (err)
                            callback(err)
                        else
                            callback(null, true)
                    })
            }
        })
    }
}

module.exports = DAOUsers;