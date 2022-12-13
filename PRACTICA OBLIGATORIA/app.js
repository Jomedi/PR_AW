"use strict";

const config = require("./config");
const mysql = require("mysql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const DAOUsers = require("./DAOUsers");
const DAOAlerts = require("./DAOAlerts");
const dateFormater = require("./dateFormater");
const multer = require("multer");
const fs = require("fs");

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de dateFormater
const dateFormat = new dateFormater();

// Crear una instancia de DAOUsers
const daoU = new DAOUsers(pool);

// Crea una instancia de DAOAlerts
const daoA = new DAOAlerts(pool);
app.use(express.urlencoded({ extended: true }));
// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    } else {
        console.log('Servidor arrancado en el puerto ' + config.port);
    }
});



//------------------------------------------------------------------------------------para ejs
// Configurar ejs como motor de plantillas
app.set("view engine", "ejs");
// Definir el directorio de plantillas, reconocer el directorio de views
app.set("views", path.join(__dirname, "views"));

//------------------------------------------------------------------------------------para body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//--------------------------------------------------------------------Middleware express-session y express-mysql-session
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "UCM_CAU",
});

const middlewareSession = session({
    saveUninitialized: false,
    secret: "prueba",
    resave: false,
    store: sessionStore,
});

app.use(middlewareSession);

//------------------------------------------------------------------------------------middleware static
app.use(express.static(path.join(__dirname, "public"))); //reconocer el directorio public

//para poder acceder con la ruta: /
app.get("/", function(request, response) {
    response.status(200);
    response.redirect("/login");
});

//-------------------------------------------------------------------------------------manejador para login y logout
app.get("/login", function(request, response) {
    response.status(200);
    response.render("login", { errorMsg: null });
});

app.post("/login", function(request, response) {
    daoU.isUserCorrect(request.body.email, request.body.password, function(err, row) {
        if (err) {
            response.status(500);
            response.render("login", {
                errorMsg: "Se ha producido un error de acceso a la base de datos",
            });
        } else if (row) {
            request.session.currentUser = row[0].email
            request.session.tecnico = row[0].tecnico
            request.session.currentName = row[0].nombre
            request.session.perfilUniversitario = row[0].tipo_usuario
            request.session.pass = row[0].password
            request.session.date = row[0].fecha.toString().substring(4, 15)
            // request.session.pass.array.forEach(p => {
            //     p ="*"
            // });
            if (request.session.tecnico === 0) {
                response.redirect("index")
            } else {
                response.redirect("indexAdmin")
            }

        } else {
            response.status(200);
            response.render("login", {
                errorMsg: "Dirección de correo y/o contraseña no válidos",
            });
        }
    });
});

app.get("/logout", function(request, response) {
    response.status(200);
    request.session.destroy();
    response.redirect("login");
});

//método para que nav.ejs coja el usuario actual en el nav
const viewLogin = function(request, response, next) {
    if (!request.session.currentName) {
        response.redirect("login");
    } else {
        response.locals.userNombre = request.session.currentName;
        next();
    }
}

//-------------------------------------------------------------------------------------manejador para index.ejs y indexAdmin.ejs

app.get("/index", function(request, response) {
    daoA.getAlertsFromUser(request.session.currentUser, function(err, result) { // sustituir por un get avisos
        if (err)
            console.log("Se ha producido un error al leer las alertas del usuario");
        else {
            result = dateFormat.changeDateFormat(result)
            response.render("index", {
                nombre: request.session.currentName,
                email: request.session.currentUser,
                pass: request.session.pass,
                alerts: result,
                tecnico: request.session.tecnico,
                perfilUniv: request.session.perfilUniversitario,
                fecha: request.session.date
            });
        }
    })
}); //{result: es la imagen que le pasas a image de la base de datos}



app.get("/indexAdmin", function(request, response) {
    daoA.getAllAlerts(function(err, result) { // sustituir por un get avisos
        if (err)
            console.log("Se ha producido un error al leer las alertas del usuario");
        else {
            daoA.getAdminAlerts(request.session.currentUser, function(err2, result2) {
                if (err2)
                    console.log(err2)
                else {
                    daoU.getUsersAdmin(function(err3, result3) {
                        if (err3)
                            console.log(err3)
                        else {
                            daoU.getAllUsers(function(err4, result4) {
                                if (err4)
                                    console.log(err4)
                                else {

                                    console.log("Obtención de técnicos, Mis Avisos, Avisos Entrantes correcta")
                                    result = dateFormat.changeDateFormat(result)
                                    result2 = dateFormat.changeDateFormat(result2)
                                    result4 = dateFormat.changeDateFormat(result4)
                                    request.session.allAlerts = result
                                    request.session.alerts = result2
                                    request.session.tecnicos = result3
                                    request.session.users = result4
                                    response.render("indexAdmin", {
                                        nombre: request.session.currentName,
                                        pass: request.session.pass,
                                        email: request.session.currentUser,
                                        allAlerts: result,
                                        alerts: result2,
                                        tecnicos: result3,
                                        users: result4,
                                        perfilUniv: request.session.perfilUniversitario,
                                        fecha: request.session.date,
                                        tecnico: request.session.tecnico
                                    });
                                }
                            })
                        }
                    })


                }
            })

        }
    });
}); //{result: es la imagen que le pasas a image de la base de datos}


//-------------------------------------------------------------------------------------manejador para sign-in
app.get("/sign-in", function(request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname, "views", "signin.ejs"));
    response.render("signin", { errorPass: null });

});




app.post("/insertAlert", function(request, response) {
    let subtipo;
    if (request.body.tipo == "Felicitación")
        subtipo = request.body.subtipoSubtipoFel
    else
        subtipo = request.body.subtipoSubtipo

    let aviso = {
        "tipo": request.body.tipo,
        "subtipo": subtipo,
        "texto": request.body.texto
    }
    console.log(aviso)
    let email = request.session.currentUser

    daoA.addNewAlert(email, aviso, function(err, ok) {
        if (err)
            console.log(err)
        else {
            console.log("Se ha insertado el aviso con éxito")
            response.redirect("/index")
        }
    })
})

app.post("/searchAdmin", function(request, response) {
    let text = request.body.search
    if (text == "")
        response.redirect("/indexAdmin")
    else if (request.body.userCheck == "on") {
        text = '%' + text + '%'
        daoU.searchUsersByName(text, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Búsqueda correcta")
                result = dateFormat.changeDateFormat(result)
                response.render("indexAdmin", {
                    nombre: request.session.currentName,
                    pass: request.session.pass,
                    email: request.session.currentUser,
                    allAlerts: request.session.allAlerts,
                    alerts: request.session.alerts,
                    tecnicos: request.session.tecnicos,
                    users: result,
                    perfilUniv: request.session.perfilUniversitario,
                    fecha: request.session.date,
                    tecnico: request.session.tecnico
                })
            }
        })
    } else {
        text = '%' + text + '%'
        daoA.searchAlertsByText(text, function(err, result) {
            if (err)
                console.log(err)
            else {
                daoA.searchAdminAlerts(request.session.currentUser, text, function(err2, result2) {
                    if (err2)
                        console.log(err2)
                    else {
                        console.log("Búsqueda de Mis Avisos, Avisos Entrantes correcta")
                        result = dateFormat.changeDateFormat(result)
                        result2 = dateFormat.changeDateFormat(result2)
                        response.render("indexAdmin", {
                            nombre: request.session.currentName,
                            pass: request.session.pass,
                            email: request.session.currentUser,
                            allAlerts: result,
                            alerts: result2,
                            tecnicos: request.session.tecnicos,
                            users: request.session.users,
                            perfilUniv: request.session.perfilUniversitario,
                            fecha: request.session.date,
                            tecnico: request.session.tecnico
                        });
                    }
                })

            }
        })
    }
})

app.post("/searchAlerts", function(request, response) {
    let email = request.session.currentUser
    let text = request.body.search
    if (text == "")
        response.redirect("/index")
    else {
        text = '%' + text + '%'
        daoA.searchAlertsByUserAndText(text, email, function(err, result) {
            if (err)
                console.log(err)
            else {
                console.log("Búsqueda correcta")
                result = dateFormat.changeDateFormat(result)
                response.render("index", {
                    nombre: request.session.currentName,
                    email:email,
                    pass: request.session.pass,
                    alerts: result,
                    tecnico: request.session.tecnico,
                    perfilUniv: request.session.perfilUniversitario,
                    fecha: request.session.date,
                    tecnico: request.session.tecnico
                });
            }
        })
    }
})

//------------------------------------------------------------------------------------multer para almacén de imágenes
var almacen = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'img'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const multerFactory = multer({ storage: almacen });

app.post("/sign-in", multerFactory.single('imagen'), function(request, response) {
    //DECLARACIÓN REGEX
    var number = /[0-9]/
    var alphaNumeric = /^[a-z0-9]+$/i
    var upper = /[A-Z]/
    var lower = /[a-z]/
    var letter = /^[A-Z]+$/i
    var onlyNumbers = /^([0-9])*$/
        //DECLARACIÓN DE ERRORES
    var errorPassword = ""
    var errorNumeroEmpleado = ""
    var errorEmail = ""
        //DECLARACIÓN DE VARIABLES DE TÉCNICO
    let tecnico = 0
    let num_empleado = null


    //OBTENCIÓN DE IMAGEN A TRAVÉS DE MULTER
    let nombreFichero = null;
    if (request.file.filename) // Si se ha subido un fichero
        nombreFichero = request.file.originalname;

    //COMPROBACIÓN EMAIL
    let sufix = "@ucm.es"
    if (request.body.email.length <= sufix.length || request.body.email.substring(request.body.email.length - sufix.length, request.body.email.length) != sufix) {
        console.log("El email no pertenece al dominio @ucm.es")
        errorEmail = "El email no pertenece al dominio @ucm.es"
    }

    //COMPROBACIÓN NUM_EMPLEADO
    if (request.body.ticTec == "on") {
        tecnico = 1
        num_empleado = request.body.numEmpl
        console.log("Número de empleado: ", num_empleado)
        console.log(num_empleado.length, num_empleado[4], num_empleado.substring(0, 4), num_empleado.substring(5, 8))
        if (num_empleado.length != 8 || num_empleado[4] != '-') {
            console.log("Número no válido")
            errorNumeroEmpleado = "Formato del número de empleado incorrecto: dddd-lll -> Ejemplo: 1234-abc"
        } else if (onlyNumbers.test(num_empleado.substring(0, 4)) && letter.test(num_empleado.substring(5, 8)))
            console.log("Número válido")
        else {
            console.log("Número no válido")
            errorNumeroEmpleado = "Formato del número de empleado incorrecto: dddd-lll -> Ejemplo: 1234-abc"
        }
    }

    //COMPROBACIÓN CONTRASEÑA
    if (request.body.password.length < 8 || request.body.password.length > 16)
        errorPassword = "La contraseña debe tener entre 8 y 16 carácteres"
    else if (!number.test(request.body.password))
        errorPassword = "La contraseña debe tener al menos un dígito"
    else if (!upper.test(request.body.password))
        errorPassword = "La contraseña debe tener al menos una letra mayúscula"
    else if (!lower.test(request.body.password))
        errorPassword = "La contraseña debe tener al menos una letra minúscula"
    else if (alphaNumeric.test(request.body.password))
        errorPassword = "La contraseña debe contener al menos un carácter no alfanumérico"
    else if (request.body.password != request.body.passwordConfirm)
        errorPassword = "Las contraseñas no coinciden"

    //ALTA DE USUARIO
    if (errorPassword == "" && errorNumeroEmpleado == "" && errorEmail == "") {
        daoU.getUserByEmail(request.body.email, function(err, row) {
            if (err)
                console.log("Error al comprobar si el usuario está dado de baja")
            else {
                if (row.length == 0) {
                    daoU.insertUser(request.body.nombre, request.body.email, request.body.password, request.body.tipo, tecnico, num_empleado, nombreFichero,
                        function(err, ok) {
                            if (err) {
                                console.log("Se ha producido un error al insertar el usuario");
                            } else {
                                console.log("Se ha insertado el usuario con éxito");
                                response.redirect("/login");
                            }
                        });
                } else {
                    if (row[0].activo == 1) {
                        console.log("Ya existe un usuario con ese mail");
                        response.render("signin", { errorPass: "Ya existe un usuario con ese mail" });
                    } else {
                        var dateUpdate = dateFormat.obtainCurrentDate()
                        daoU.updateActivateUser(request.body.nombre, request.body.email, request.body.password, request.body.tipo, dateUpdate, function(err, ok) {
                            if (err)
                                console.log(err)
                            else {
                                console.log("Usuario dado de alta")
                                response.redirect("/login")
                            }
                        })
                    }
                }
            }
        })
    } else //ENVÍO DE ERRORES
        response.render("signin", { errorPass: errorPassword, errorNumEmpleado: errorNumeroEmpleado, errorEmail: errorEmail });
});


//-------------------------------------------------------------------------------------manejador para la imagen del usuario

app.get("/imagenUsuario", viewLogin, function(request, response) {
    let urlImg;
    daoU.getUserImageName(request.session.currentUser, function(err, result) {
        if (err) {
            console.log("Error al obtener la imagen de usuario");
        } else if (!result || result === "") {
            urlImg = path.join(__dirname, "public/img/", "NoPerfil.jpg");
            response.sendFile(urlImg);
        } else {
            urlImg = path.join(__dirname, "public/img/", result);
            response.sendFile(urlImg);
        }
    });
});

app.post("/updateAsignAdmin", function(request, response) {
    daoA.updateAsignAdminAlert(request.body.tecnico, request.body.idUsuario, request.body.idAviso, function(err, result) {
        if (err)
            console.log(err)
        else {
            console.log("Se ha asignado el aviso correctamente al técnico " + request.body.tecnico)
            response.redirect("/indexAdmin")
        }

    })
})

app.post("/updateTerminateAdmin", function(request, response) {
    daoA.updateTerminateAdminAlert(request.session.currentUser, request.body.idUsuario, request.body.idAviso, request.body.comentarioTecn, function(err, result) {
        if (err)
            console.log(err)
        else {
            console.log("Se ha terminado el aviso correctamente")
            response.redirect("/indexAdmin")
        }
    })
})

app.post("/updateEliminateAdmin", function(request, response) {
    let comentarioTecn = "Este aviso ha sido eliminado por el técnico " + request.session.currentName + " debido a: \n\n" + request.body.comentarioTecn;
    daoA.updateEliminateAdminAlert(request.session.currentUser, request.body.idUsuario, request.body.idAviso, comentarioTecn, function(err, result) {
        if (err)
            console.log(err)
        else {
            console.log("Se ha eliminado el aviso correctamente")
            response.redirect("/indexAdmin")
        }
    })
})

app.post("/updateEliminateUser", function(request, response) {
    daoU.updateEliminateUser(request.body.idUsuario, function(err, result) {
        if (err)
            console.log(err)
        else {
            console.log("Se ha eliminado el usuario correctamente")
            response.redirect("/indexAdmin")
        }
    })
})