//CREANDO UN POOL SÍNCRONAMENTE
const mysql = require("mysql");

class DAOUsers {
    pool;
    constructor(pool) {
        this.pool = pool;
    }

    //USUARIO Y CONTRASEÑA CORRECTOS
    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM ucm_aw_cau_usu_usuarios WHERE email = ? AND password = ?", [email, password],
                    function(err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err)
                            callback(new Error("Error de acceso a la base de datos"));
                        else {
                            if (rows.length === 0)
                                callback(null, false); //no está el usuario con el password proporcionado
                            else
                                callback(null, true);
                        }
                    }
                );
            }
        });
    }

<<<<<<< HEAD
    //IMAGEN DE PERFIL DE USUARIO
=======
    //INSERTAR USUARIO
    insertUser(nombre, email, password, callback) {
		this.pool.getConnection(function (err, connection) {
			if (err) {
				callback(new Error("Error de conexión a la base de datos"));
			} else {
				connection.query("INSERT INTO ucm_aw_cau_usu_usuarios(nombre, email, password) VALUES(?,?,?)", 
                [nombre, email, password], 
                function (err) {
					connection.release();
					if(err){
						callback(new Error("Error de acceso a la base de datos"));
                    }else{
                        callback(null);
                    }
				});
			}
		});
	}

    //IMAGEN DE PERFIN DE USUARIO
>>>>>>> 46f10061d52176ccd866d50cc6c372635af8bead
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
}

module.exports = DAOUsers;