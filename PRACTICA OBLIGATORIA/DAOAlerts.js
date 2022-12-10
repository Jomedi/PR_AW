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
            if (err)
                callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query("SELECT * FROM `ucm_aw_cau_avi_avisos`",
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
}

module.exports = DAOAlerts;