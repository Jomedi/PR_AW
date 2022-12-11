//CREANDO UN POOL SÍNCRONAMENTE
const mysql = require("mysql");

class DAOAlerts {
    pool;
    constructor(pool) {
        this.pool = pool;
    }

    //OBTENER TODAS LAS ALERTAS DE UN USUARIO
    getAlertsFromUser(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query("SELECT `avi`.*, `avus`.`email_tecnico` FROM `ucm_aw_cau_avi_avisos` AS `avi`, `ucm_aw_cau_avus_avisosusuarios` AS `avus` WHERE `avi`.`id` = `avus`.`id_aviso` AND `avus`.`id_usuario` = (SELECT `id` FROM `ucm_aw_cau_usu_usuarios` WHERE `email` = ?)", [email],
                    function(err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else
                            callback(null, rows);
                    });
            }
        });
    }

    getAlertsByUserAndText(text, email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM `ucm_aw_cau_avi_avisos` AS avi, ucm_aw_cau_avus_avisosusuarios AS avus, ucm_aw_cau_usu_usuarios AS us WHERE avi.id = avus.id_aviso AND avus.id_usuario = us.id AND us.email = ? AND avi.texto LIKE ? ", [email, text],
                    function(err, rows) {
                        if (err)
                            callback("Error en SELECT * FROM `ucm_aw_cau_avi_avisos`")
                        else {
                            callback(null, rows)
                        }

                    }
                )
            }
        })
    }

    //OBTENER ALERTAS QUE CONTIENEN "TEXT" DENTRO DEL TEXTO
    getAlertsByText(text, callback) {
        console.log(text)
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM `ucm_aw_cau_avi_avisos` AS avi WHERE avi.texto LIKE ? ", [text],
                    function(err, rows) {
                        if (err)
                            callback("Error en SELECT * FROM `ucm_aw_cau_avi_avisos`")
                        else {
                            callback(null, rows)
                        }
                    }
                )
            }
        })
    }

    //OBTENER TODAS LAS ALERTAS
    getAllAlerts(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("SELECT * FROM `ucm_aw_cau_avi_avisos`",
                    function(err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));

                        } else {
                            callback(null, rows);
                        }
                    });
            }
        });
    }

    getAdminAlerts(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT * FROM ucm_aw_cau_avus_avisosusuarios WHERE email_tecnico = ?", [email],
                    function(err, rows) {
                        connection.release()
                        if (err)
                            callback(err)
                        else {
                            callback(null, rows)
                        }
                    })
            }
        })
    }

    addNewAlert(email, aviso, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query("INSERT INTO `ucm_aw_cau_avi_avisos`(`tipo`, `subtipo`, `texto`) VALUES (?,?,?) ", [aviso.tipo, aviso.subtipo, aviso.texto],
                    function(err, idAviso) {
                        connection.release()
                        if (err)
                            callback(new Error("Error en INSERT de `ucm_aw_cau_avi_avisos`"))
                        else {
                            connection.query("SELECT `id` FROM `ucm_aw_cau_usu_usuarios` WHERE `email` = ?", [email],
                                function(err2, idUser) {
                                    if (err2)
                                        callback(new Error("Error en SELECT de `ucm_aw_cau_usu_usuarios`"))
                                    else {
                                        connection.query("INSERT INTO `ucm_aw_cau_avus_avisosusuarios`(`id_usuario`, `id_aviso`) VALUES (?,?)", [idUser[0].id, idAviso.insertId],
                                            function(err3, row) {
                                                if (err3)
                                                    callback(new Error("Error en INSERT de `ucm_aw_cau_avus_avisosusuarios`"))
                                                else {
                                                    callback(null, true)
                                                }
                                            })
                                    }
                                })

                        }

                    })
            }
        })
    }

    insertTask(email, task, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("INSERT INTO aw_tareas_tareas(texto) VALUES(?)", [task.text],
                    function(err, resultado) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error en tarea"));
                        } else {
                            let resultado2 = [];
                            task.tags.forEach(tag => {
                                connection.query("INSERT INTO aw_tareas_etiquetas (texto) VALUES (?)", [tag],
                                    function(err, res) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            resultado2.push(res.insertId);
                                            connection.query("INSERT INTO aw_tareas_tareas_etiquetas (idTarea, idEtiqueta) VALUES (?,?)", [resultado.insertId, res.insertId],
                                                function(err, res2) {
                                                    if (err) {
                                                        callback(err)
                                                    }
                                                });
                                        }
                                    });
                            });
                            connection.query("SELECT idUser FROM aw_tareas_usuarios WHERE email = ?", [email],
                                function(err, resultado4) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        connection.query("INSERT INTO aw_tareas_user_tareas (idUser, idTarea, hecho) VALUES (?,?,?)", [resultado4[0].idUser, resultado.insertId, 0],
                                            function(err, resultado5) {
                                                if (err) {
                                                    callback(err);
                                                } else {
                                                    callback(null);
                                                }
                                            });
                                    }
                                });
                        }
                    });
            }
        });
    }

}

module.exports = DAOAlerts;