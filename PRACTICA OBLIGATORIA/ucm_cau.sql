-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2022 a las 16:48:19
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

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('X1q9rdcH6Q5u7gt0BS1DvkulOwvZF7Fu', 1670780566, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"PAS-TECNICO@ucm.es\",\"tecnico\":1}'),
('j8TB5TD6BU68t2xtZncqahcXyZwRjszc', 1670857455, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"PAS-TECNICO@ucm.es\",\"tecnico\":1}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avi_avisos`
--

CREATE TABLE `ucm_aw_cau_avi_avisos` (
  `id` int(100) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(100) NOT NULL,
  `subtipo` varchar(100) NOT NULL,
  `texto` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avi_avisos`
--

INSERT INTO `ucm_aw_cau_avi_avisos` (`id`, `fecha`, `tipo`, `subtipo`, `texto`) VALUES
(1, '2022-12-10', 'tipo prueba', 'subtipo prueba', 'Aviso de prueba'),
(2, '2022-12-10', 'tipo prueba 2', 'subtipo prueba 2', 'Aviso de prueba 2'),
(3, '2022-12-10', 'tipo prueba 3', 'subtipo prueba 3', 'Aviso de prueba 3'),
(4, '2022-12-10', 'tipo prueba 4', 'subtipo prueba 4', 'Aviso de prueba 4'),
(5, '2022-12-10', 'tipo prueba 5', 'subtipo prueba 5', 'Aviso de prueba 5'),
(34, '2022-12-11', 'incidencia', 'correo electrónico', 'tipo prueba 0'),
(35, '2022-12-11', 'felicitacion', 'registro electrónico', 'Texto de prueba 0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avus_avisosusuarios`
--

CREATE TABLE `ucm_aw_cau_avus_avisosusuarios` (
  `id_usuario` int(100) NOT NULL,
  `id_aviso` int(100) NOT NULL,
  `email_tecnico` varchar(100) DEFAULT NULL,
  `comentarioTecn` varchar(1000) DEFAULT NULL,
  `estado` varchar(100) NOT NULL DEFAULT 'por asignar'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avus_avisosusuarios`
--

INSERT INTO `ucm_aw_cau_avus_avisosusuarios` (`id_usuario`, `id_aviso`, `email_tecnico`, `comentarioTecn`, `estado`) VALUES
(1, 1, NULL, NULL, ''),
(1, 3, 'PAS-TECNICO@ucm.es', NULL, ''),
(7, 3, NULL, NULL, ''),
(7, 5, 'PAS-TECNICO@ucm.es', NULL, ''),
(7, 34, NULL, NULL, 'por asignar'),
(7, 35, NULL, NULL, 'por asignar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_usu_usuarios`
--

CREATE TABLE `ucm_aw_cau_usu_usuarios` (
  `id` int(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `tecnico` tinyint(1) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `num_empleado` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `tecnico`, `imagen`, `num_empleado`) VALUES
(1, 'alumno', 'alumno@ucm.es', 'alumno', 'alumno', 0, 'alumno.jpg', NULL),
(3, 'PASnoTECNICO', 'PASnoTECNICO@ucm.es', 'PASnoTECNICO', 'pas', 0, 'pas.jpg', NULL),
(4, 'PAS-TECNICO', 'PAS-TECNICO@ucm.es', 'PASTECNICO', 'pas', 1, 'PAS-TECNICO.jpg', 246),
(5, 'pdi', 'pdi@ucm.es', 'pdi', 'pdi', 0, 'pdi.jpg', NULL),
(6, 'antiguoAlumno', 'antiguoAlumno@ucm.es', 'antiguoAlumno', 'antiguoalumno', 0, 'antiguoalumno.jpg', NULL),
(7, 'Prueba', 'prueba@ucm.es', 'prueba', 'alumno', 0, 'prueba.png', 12342);

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
