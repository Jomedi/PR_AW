"use strict";

const config = require("./config");
const mysql = require("mysql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const DAOUsers = require("./DAOUsers");
const fs = require("fs");

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOUsers
const daoU = new DAOUsers(pool);

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
    response.render("login", { errorMsg: null, errorPass: null});
});
app.get("/sign-in", function(request, response) {
    response.status(200);
    response.render("signin", { errorMsg: null, errorPass: null});
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
    if (!request.session.currentUser) {
        response.redirect("login");
    } else {
        response.locals.userEmail = request.session.currentUser;
        next();
    }
}

//-------------------------------------------------------------------------------------manejador para index.ejs y indexAdmin.ejs

app.get("/index", function(request, response) {
    daoU.getUserImageName(request.session.currentUser, function(err, result) { // sustituir por un get avisos
        if (err)
            console.log("Se ha producido un error al cargar la imagen del usuario");
        else {
            console.log("Se ha leído la imagen del usuario con éxito", result);
            response.render("index", { image: result, email: request.session.currentUser });
        }
    });
}); //{result: es la imagen que le pasas a image de la base de datos}

app.get("/indexAdmin", function(request, response) {
    daoU.getUserImageName(request.session.currentUser, function(err, result) { // sustituir por un get avisos
        if (err)
            console.log("Se ha producido un error al cargar la imagen del usuario");
        else {
            console.log("Se ha leído la imagen del usuario con éxito", result);
            response.render("indexAdmin", { image: result, email: request.session.currentUser });
        }
    });
}); //{result: es la imagen que le pasas a image de la base de datos}

app.post("/sign-in", function(request, response) {
    console.log(request.body.nombre, request.body.email, request.body.password, request.body.tipo);
    if (request.body.password != request.body.passwordConfirm) {
        response.render("signin", {errorPass: "Las contraseñas no coinciden"});
        console.log("Contraseñas diferentes");
    } else {
        daoU.insertUser(request.body.nombre, request.body.email, request.body.password, request.body.tipo, function(err, ok) {
            if (err) {
                console.log("Se ha producido un error al insertar el usuario");
            } else {
                console.log("Se ha insertado el usuario con exito");
                response.redirect("sigin");

            }
        });
    }

});


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