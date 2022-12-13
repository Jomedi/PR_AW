-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2022 a las 00:43:41
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ucm_cau`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avi_avisos`
--

CREATE TABLE `ucm_aw_cau_avi_avisos` (
  `id` int(100) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(100) NOT NULL,
  `subtipo` varchar(100) NOT NULL,
  `texto` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avi_avisos`
--

INSERT INTO `ucm_aw_cau_avi_avisos` (`id`, `fecha`, `tipo`, `subtipo`, `texto`) VALUES
(53, '2022-12-13 16:05:12', 'Sugerencia', 'Aula Virtual', 'Deberían de arreglar la conexión de acceso al aula virtual porque casi siempre se cae el servidor y nos deja a a todxs muchas veces tiradxs, incluso ha pasado a veces cuando estamos haciendo un examen y es una verguenza que una universidad tenga tan mala conexión y más la facultad de informática. Gracias y un saludo.'),
(54, '2022-12-13 16:52:09', 'Incidencia', 'Google Meet', 'No puedo acceder a las reuniones con mi usuario de google meet de la universidad. Cuando intento acceder me sale un mensaje diciendo que no pertenezco a la universidad y no puede ser porque en el gea si estoy dada de alta. Gracias.'),
(55, '2022-12-13 17:42:37', 'Felicitación', 'Servicio de Cafeteria', 'Quiero felicitar a los trabajadores de la cafetería de la facultad por el buen servicio que nos dan. Su amabilidad, paciencia y eficiencia son inmejorables!!!!!'),
(56, '2022-12-13 17:45:19', 'Felicitación', 'Biblioteca', 'Gracias por arreglar la calefacción en la biblioteca :)))'),
(57, '2022-12-13 17:48:02', 'Sugerencia', 'Registro electrónico', 'Buenas tardes, me pongo en contacto porque hemos recogido una queja en la clase de 2ºE sobre tener que renovar los datos que YA ENVIAMOS en 1º cuando nos matriculamos. Es un proceso bastante tedioso que consideramos no hace falta volver a realizar. Gracias, un saludo.'),
(58, '2022-12-13 17:49:19', 'Incidencia', 'Cuenta de Alumno', 'Por favor, arregladme la cuenta para poder ingresar a todos los portales adheridos a la universidad. Lo necesito con urgencia. Gracias.'),
(59, '2022-12-13 18:33:04', 'Sugerencia', 'Aula Virtual', 'Hola hola mensaje de prueba'),
(63, '2022-12-14 00:26:21', 'Sugerencia', 'Cuenta genérica', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(64, '2022-12-14 00:26:36', 'Sugerencia', 'VPN Acceso remoto', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n'),
(65, '2022-12-14 00:26:43', 'Incidencia', 'Cuenta de personal', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\n'),
(66, '2022-12-14 00:26:49', 'Felicitación', 'Asesoría Jurídica', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n'),
(67, '2022-12-14 00:27:09', 'Incidencia', 'Cuenta genérica', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n'),
(68, '2022-12-14 00:30:27', 'Sugerencia', 'Certificado digital de persona física', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(69, '2022-12-14 00:30:33', 'Felicitación', 'Oficina de Gestión de Infraestructuras y Mantenimiento', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(70, '2022-12-14 00:30:58', 'Incidencia', 'Portafirmas', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(71, '2022-12-14 00:31:14', 'Incidencia', 'VPN Acceso remoto', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(72, '2022-12-14 00:31:25', 'Incidencia', 'Moodle: Aula global', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(73, '2022-12-14 00:33:57', 'Incidencia', 'Registro electrónico', 'Este es un mensaje para el técnico Ambrosio Pérez, por favor que lo vea solo él:\r\n\r\nAmbrosio el mensaje que me has eliminado era de prueba. \r\n\r\nPerdona las molestias.'),
(74, '2022-12-14 00:34:27', 'Felicitación', 'Asesoría Jurídica', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!'),
(75, '2022-12-14 00:34:41', 'Felicitación', 'Biblioteca', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n'),
(76, '2022-12-14 00:34:49', 'Incidencia', 'Cuenta de Alumno', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n'),
(77, '2022-12-14 00:34:56', 'Incidencia', 'Sede electrónica', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n'),
(78, '2022-12-14 00:35:04', 'Sugerencia', 'Plataforma de cursos online Privados', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avus_avisosusuarios`
--

CREATE TABLE `ucm_aw_cau_avus_avisosusuarios` (
  `id_usuario` int(100) NOT NULL,
  `id_aviso` int(100) NOT NULL,
  `email_tecnico` varchar(100) DEFAULT NULL,
  `comentarioTecn` varchar(1000) DEFAULT NULL,
  `estado` varchar(100) DEFAULT 'por asignar'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avus_avisosusuarios`
--

INSERT INTO `ucm_aw_cau_avus_avisosusuarios` (`id_usuario`, `id_aviso`, `email_tecnico`, `comentarioTecn`, `estado`) VALUES
(1, 53, 'eumont@ucm.es', 'Este aviso ha sido eliminado por el técnico Eugenia Montijo debido a: \n\nBuenos días María, sentimos tu malestar con este servicio y te pedimos disculpas.\r\nNos encantaría poder dar una solución inmediata a este suceso pero desgraciadamente no es tan fácil. Ya se nos ha avisado de esto con anterioridad y seguimos en el proceso de arreglarlo.\r\nSeguiremos trabajando en ello para que esté listo lo antes posible. Muchas gracias por tu comentario.', 'eliminado'),
(1, 54, 'eumont@ucm.es', 'Hola de nuevo María. Ya está solucionado, ha sido fallo de la base de datos. Muchas gracias por avisar, un saludo.', 'terminado'),
(1, 55, 'usinfot@ucm.es', 'Este aviso ha sido eliminado por el técnico Usuario sin foto debido a: \n\nMuchas gracias Maria, se lo comentaremos a nuestros compañeros. Estoy segurx que les hará mucha ilusión. :)', 'eliminado'),
(1, 56, NULL, NULL, 'por asignar'),
(1, 57, 'eumont@ucm.es', NULL, 'asignado'),
(1, 58, 'ambrope@ucm.es', 'Maria necesitamos que nos digas exactamente los portales, muchas gracias.', 'terminado'),
(3, 63, NULL, NULL, 'por asignar'),
(3, 64, 'usinfot@ucm.es', NULL, 'asignado'),
(3, 65, NULL, NULL, 'por asignar'),
(3, 66, NULL, NULL, 'por asignar'),
(3, 67, 'usinfot@ucm.es', 'Este aviso ha sido eliminado por el técnico Usuario sin foto debido a: \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!', 'eliminado'),
(4, 59, NULL, 'Este aviso ha sido eliminado por el técnico Ambrosio Pérez debido a: \n\nNo tiene que ver con CAU.', 'eliminado'),
(4, 73, 'ambrope@ucm.es', NULL, 'asignado'),
(4, 74, NULL, NULL, 'por asignar'),
(4, 75, NULL, NULL, 'por asignar'),
(4, 76, 'ambrope@ucm.es', 'Este aviso ha sido eliminado por el técnico Ambrosio Pérez debido a: \n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dicta illum quaerat, voluptatem quasi accusantium dolorem eaque itaque? Debitis nemo aperiam aut, adipisci voluptate iusto ratione praesentium! Laudantium, est earum!\r\n', 'eliminado'),
(4, 77, NULL, NULL, 'por asignar'),
(4, 78, NULL, NULL, 'por asignar'),
(5, 68, 'ambrope@ucm.es', NULL, 'asignado'),
(5, 69, NULL, NULL, 'por asignar'),
(5, 70, NULL, NULL, 'por asignar'),
(5, 71, NULL, NULL, 'por asignar'),
(5, 72, NULL, NULL, 'por asignar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_usu_usuarios`
--

CREATE TABLE `ucm_aw_cau_usu_usuarios` (
  `id` int(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tipo_usuario` varchar(100) NOT NULL,
  `tecnico` tinyint(1) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `num_empleado` varchar(100) DEFAULT NULL,
  `activo` int(11) NOT NULL DEFAULT 1,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`id`, `nombre`, `email`, `password`, `tipo_usuario`, `tecnico`, `imagen`, `num_empleado`, `activo`, `fecha`) VALUES
(1, 'Maria', 'mria@ucm.es', 'Maria1234!', 'Alumno', 0, 'maria.jpg', NULL, 1, '2022-12-01'),
(2, 'Eugenia Montijo', 'eumont@ucm.es', 'Eugenia1234!', 'PAS', 1, 'eugenia.jpg', '1234-edm', 1, '2022-11-08'),
(3, 'Rodolfo Mero', 'romer@ucm.es', 'Rodolfo1234!', 'PDI', 0, 'rodolfo.jpg', NULL, 1, '2022-10-29'),
(4, 'Héctor', 'hector@ucm.es', 'Hector1234!', 'Alumno', 0, 'hector.jpg', NULL, 1, '2022-12-13'),
(5, 'Richard', 'rich@ucm.es', 'Richard1234!', 'PAS', 0, 'richard.jpg', NULL, 1, '2022-05-18'),
(6, 'Ambrosio Pérez', 'ambrope@ucm.es', 'Ambrosio1234!', 'PAS', 1, 'ambrosio.jpg', '1465-amp', 1, '2022-01-19'),
(20, 'Usuario sin foto', 'usinfot@ucm.es', 'Sinfoto123!', 'PAS', 1, NULL, '1752-usf', 1, '2022-07-24');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ucm_aw_cau_avus_avisosusuarios`
--
ALTER TABLE `ucm_aw_cau_avus_avisosusuarios`
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_aviso`),
  ADD KEY `id_aviso` (`id_aviso`);

--
-- Indices de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ucm_aw_cau_avus_avisosusuarios`
--
ALTER TABLE `ucm_aw_cau_avus_avisosusuarios`
  ADD CONSTRAINT `ucm_aw_cau_avus_avisosusuarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `ucm_aw_cau_usu_usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ucm_aw_cau_avus_avisosusuarios_ibfk_2` FOREIGN KEY (`id_aviso`) REFERENCES `ucm_aw_cau_avi_avisos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
