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
                connection.query("SELECT `avi`.*, `avi`.`id` as `id_aviso`, `avus`.`email_tecnico`, `avus`.`comentarioTecn`, `avus`.estado, `usu`.`nombre`, `usu`.`tipo_usuario` FROM `ucm_aw_cau_avi_avisos` AS `avi`, `ucm_aw_cau_avus_avisosusuarios` AS `avus`, `ucm_aw_cau_usu_usuarios` AS `usu`  WHERE `avi`.`id` = `avus`.`id_aviso` AND `usu`.`id` = `avus`.`id_usuario` AND `avus`.`id_usuario` = (SELECT `id` FROM `ucm_aw_cau_usu_usuarios` WHERE `email` = ?) ORDER BY avi.fecha DESC,avi.id DESC", [email],
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

    //OBTENER TODAS LAS ALERTAS
    getAlertById(id, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("SELECT * FROM `ucm_aw_cau_avi_avisos` WHERE id = ?", [id],
                    function(err, rows) {
                        connection.release();
                        if (err)
                            callback(new Error("Error de acceso a la base de datos"));
                        else
                            callback(null, rows);
                    });
            }
        });
    }

    //OBTENER TODAS LAS ALERTAS
    getAllAlerts(callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("SELECT usu.*,avi.*,usu.id as id_usuario,avi.id as id_aviso,avus.estado FROM ucm_aw_cau_avi_avisos as avi, ucm_aw_cau_usu_usuarios AS usu, ucm_aw_cau_avus_avisosusuarios AS avus where avi.id = avus.id_aviso AND avus.id_usuario = usu.id ORDER BY avi.fecha DESC,avi.id DESC",
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
                connection.query("SELECT usu.*,avi.*,usu.id as id_usuario,avi.id as id_aviso,avus.estado,avus.comentarioTecn FROM ucm_aw_cau_avi_avisos AS avi, ucm_aw_cau_usu_usuarios AS usu, ucm_aw_cau_avus_avisosusuarios AS avus WHERE avi.id = avus.id_aviso AND usu.id = avus.id_usuario AND email_tecnico = ? ORDER BY avi.fecha DESC,avi.id DESC", [email],
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

    searchAlertsByUserAndText(text, email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT us.*,avi.*,avus.* FROM `ucm_aw_cau_avi_avisos` AS avi, ucm_aw_cau_avus_avisosusuarios AS avus, ucm_aw_cau_usu_usuarios AS us WHERE avi.id = avus.id_aviso AND avus.id_usuario = us.id AND us.email = ? AND avi.texto LIKE ? ORDER BY avi.fecha DESC,avi.id DESC", [email, text],
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
    searchAlertsByText(text, callback) {
        console.log(text)
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT usu.*,avi.*,usu.id as id_usuario,avi.id as id_aviso,avus.estado FROM ucm_aw_cau_avi_avisos as avi, ucm_aw_cau_usu_usuarios AS usu, ucm_aw_cau_avus_avisosusuarios AS avus where avi.id = avus.id_aviso AND avus.id_usuario = usu.id AND avi.texto LIKE ? ORDER BY avi.fecha DESC,avi.id DESC", [text],
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

    searchAdminAlerts(email, texto, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("SELECT usu.*,avi.*,usu.id as id_usuario,avi.id as id_aviso,avus.estado,avus.comentarioTecn FROM ucm_aw_cau_avi_avisos AS avi, ucm_aw_cau_usu_usuarios AS usu, ucm_aw_cau_avus_avisosusuarios AS avus WHERE avi.id = avus.id_aviso AND usu.id = avus.id_usuario AND email_tecnico = ? AND avi.texto LIKE ? ORDER BY avi.fecha DESC,avi.id DESC", [email, texto],
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

    //AÑADIR NUEVO AVISO
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


    updateAsignAdminAlert(email, id_usuario, id_aviso, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("UPDATE `ucm_aw_cau_avus_avisosusuarios` SET `email_tecnico`= ?, `estado`='asignado' WHERE id_usuario = ? AND id_aviso = ?", [email, id_usuario, id_aviso],
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

    updateTerminateAdminAlert(email, id_usuario, id_aviso, message, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("UPDATE `ucm_aw_cau_avus_avisosusuarios` SET `email_tecnico`= ?, `comentarioTecn`= ?, `estado`='terminado' WHERE id_usuario = ? AND id_aviso = ?", [email, message, id_usuario, id_aviso],
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

    updateEliminateAdminAlert(email, id_usuario, id_aviso, message, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err)
                callback(err)
            else {
                connection.query("UPDATE `ucm_aw_cau_avus_avisosusuarios` SET `comentarioTecn`= ?, `estado`='eliminado' WHERE id_usuario = ? AND id_aviso = ?", [message, id_usuario, id_aviso],
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

}

module.exports = DAOAlerts;