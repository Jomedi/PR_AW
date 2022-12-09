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
    }
    else {
    console.log('Servidor arrancado en el puerto ' + config.port);
    }
});

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
app.get("/", function(request, response){
    response.status(200);
    response.redirect("/login");
});

//------------------------------------------------------------------------------------para ejs
// Configurar ejs como motor de plantillas
app.set("view engine", "ejs");
// Definir el directorio de plantillas, reconocer el directorio de views
app.set("views", path.join(__dirname, "views"));

//-------------------------------------------------------------------------------------manejador para login y logout
app.get("/login", function (request, response) {
    response.status(200);
    response.render("login", { errorMsg: null });
  });
  
app.post("/login", function (request, response) {
  daoU.isUserCorrect(request.body.email, request.body.password, function (err, ok) {
    if (err) {
      response.status(500);
      response.render("login", {errorMsg: "Se ha producido un error de acceso a la base de datos",
      });
    } else if (ok) {
      request.session.currentUser = request.body.email;
      response.redirect("login");
    } else {
      response.status(200);
      response.render("login", {errorMsg: "Dirección de correo y/o contraseña no válidos",
      });
    }
  });
});


/*
  PRUEBA de commit versión 2 DANIELA


  otra pruebaaaaaaaaaaaaaaaaaaaaaaaaaa


  commit prueba no definitivo

*/

//-------------------------------------------------------------------------------------manejador para index.ejs y indexAdmin.ejs

app.get("/index", function(request, response){
  response.status(200);
  response.redirect("index");
});

  
//   app.get("/logout", function (request, response) {
//     response.status(200);
//     request.session.destroy();
//     response.redirect("login");
//   });