//CREANDO UN POOL SÍNCRONAMENTE
const mysql = require("mysql");

class DAOUsers {
    pool;
    constructor(pool) {
        this.pool = pool;
    }

    //INSERTAR USUARIO
    insertUser(nombre, email, password, tipo, tecnico, num_empleado, imagen, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("INSERT INTO ucm_aw_cau_usu_usuarios(nombre, email, password, tipo_usuario, tecnico, num_empleado, imagen) VALUES(?,?,?,?,?,?,?)", [nombre, email, password, tipo, tecnico, num_empleado, imagen],
                    function(err) {
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

    searchUsersByName(nombre, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE nombre LIKE ? ORDER BY fecha DESC, id DESC", [nombre],
                    function(err, row) {
                        if (err)
                            callback(err)
                        else
                            callback(null, row)
                    })
            }
        })
    }

    isUserDeleted(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE email = ?", [email],
                    function(err, row) {
                        if (err)
                            callback(err)
                        else {
                            callback(null, row)
                        }
                    })
            }
        })
    }

    updateActivateUser(nombre, email, password, tipo, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("UPDATE `ucm_aw_cau_usu_usuarios` SET `nombre`= ?, `password`=?, `tipo_usuario`=?, activo = 1 WHERE email = ?", [nombre, password, tipo, email],
                    function(err) {
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
                connection.query("SELECT * FROM ucm_aw_cau_usu_usuarios ORDER BY fecha DESC, id DESC",
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