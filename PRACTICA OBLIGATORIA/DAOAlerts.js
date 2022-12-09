//CREANDO UN POOL SÍNCRONAMENTE
const mysql = require("mysql");

class DAOAlerts {
    pool;
    constructor(pool) {
        this.pool = pool;
    }

    //USUARIO Y CONTRASEÑA CORRECTOS
    getAllAlerts(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("SELECT `aw_tareas_user_tareas`.`idTarea` as `id`, `aw_tareas_tareas`.`texto` as `text`, `aw_tareas_user_tareas`.`hecho` as `done`, `aw_tareas_etiquetas`.`texto` as `tags` FROM `aw_tareas_usuarios` LEFT JOIN `aw_tareas_user_tareas` ON `aw_tareas_user_tareas`.`idUser` = `aw_tareas_usuarios`.`idUser` LEFT JOIN `aw_tareas_tareas` ON `aw_tareas_user_tareas`.`idTarea` = `aw_tareas_tareas`.`idTarea` LEFT JOIN `aw_tareas_tareas_etiquetas` ON `aw_tareas_tareas`.`idTarea` = `aw_tareas_tareas_etiquetas`.`idTarea` LEFT JOIN `aw_tareas_etiquetas` ON `aw_tareas_tareas_etiquetas`.`idEtiqueta` = `aw_tareas_etiquetas`.`idEtiqueta` WHERE `aw_tareas_usuarios`.`email` = ?", [email],
                    function(err, resultado) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            let array = [];
                            let tags = [];
                            let i = resultado[0].id;
                            let j = 0;

                            resultado.forEach(element => {
                                if (i != element.id) {
                                    array.push({
                                        "id": resultado[j - 1].id,
                                        "text": resultado[j - 1].text,
                                        "done": resultado[j - 1].done,
                                        "tags": tags,
                                    });
                                    tags = [];
                                    i = element.id;
                                }
                                tags.push(element.tags);
                                j++;
                            });

                            array.push({
                                "id": resultado[j - 1].id,
                                "text": resultado[j - 1].text,
                                "done": resultado[j - 1].done,
                                "tags": tags,
                            });

                            resultado = array;

                            callback(null, resultado);
                        }
                    });
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
                connection.query("SELECT img FROM aw_tareas_usuarios WHERE email = ?", [email],
                    function(err, resultado) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (resultado.length <= 0) {
                                callback(null, "No existe el usuario");
                            } else {
                                callback(null, resultado[0].img);
                            }
                        }
                    });
            }
        });
    }
}

module.exports = DAOAlerts;