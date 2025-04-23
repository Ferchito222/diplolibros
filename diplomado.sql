-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2025 a las 04:14:48
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `diplomado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `id_autor` int(11) NOT NULL,
  `nombre_autor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autor`
--

INSERT INTO `autor` (`id_autor`, `nombre_autor`) VALUES
(1, 'Fernando Cornejo'),
(2, 'Maria Ortiz'),
(3, 'Carla Escobarr'),
(5, 'Pavblo Uria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre_cliente` text NOT NULL,
  `email` text NOT NULL,
  `celular` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre_cliente`, `email`, `celular`) VALUES
(1, 'Pepe', 'fafawef@gmail.com', 77889962),
(2, 'Gonzalo', 'rewrw@gmail.com', 69854514),
(4, 'Ana', '423423423@lele.com', 224234234),
(5, 'Hana', '24234234@fasdf.vb', 234234);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id_libro` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `nombre_autor_id` int(11) NOT NULL,
  `lote` int(11) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`id_libro`, `titulo`, `nombre_autor_id`, `lote`, `descripcion`) VALUES
(1, 'los cuentos de hoy', 2, 5, 'de ficcion'),
(2, 'el dragon', 3, 2, 'cuento de un dragon'),
(3, 'lampara', 1, 5, 'mesa con lampara'),
(4, 'el auto', 3, 1, 'sobre autos'),
(5, 'viaje en el tiempo', 1, 4, 'de viajes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `nombre_libro_id` int(11) NOT NULL,
  `nombre_cliente_id` int(11) NOT NULL,
  `fecha_prestamo` date NOT NULL,
  `dias_prestamos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id_prestamo`, `nombre_libro_id`, `nombre_cliente_id`, `fecha_prestamo`, `dias_prestamos`) VALUES
(10, 3, 1, '2022-05-20', 1),
(15, 5, 4, '2022-05-20', 1),
(16, 1, 5, '2022-05-20', 1),
(17, 2, 2, '2022-05-20', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_us`
--

CREATE TABLE `tipo_us` (
  `id_tipo_us` int(11) NOT NULL,
  `nombre_tipo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_us`
--

INSERT INTO `tipo_us` (`id_tipo_us`, `nombre_tipo`) VALUES
(1, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_us` varchar(50) NOT NULL,
  `apellidos_us` varchar(50) NOT NULL,
  `edad` date NOT NULL,
  `dni_us` varchar(50) NOT NULL,
  `contrasena_us` varchar(255) NOT NULL,
  `telefono_us` int(15) DEFAULT NULL,
  `residencia_us` varchar(100) DEFAULT NULL,
  `correo_us` varchar(50) DEFAULT NULL,
  `sexo_us` varchar(15) DEFAULT NULL,
  `adicional_us` varchar(500) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `us_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_us`, `apellidos_us`, `edad`, `dni_us`, `contrasena_us`, `telefono_us`, `residencia_us`, `correo_us`, `sexo_us`, `adicional_us`, `avatar`, `us_tipo`) VALUES
(1, 'Oliver', 'Palacios', '1992-10-06', '12345', '12345', 78787845, 'Av. Hernando Siles ', 'oliver@gmail.com', 'Masculino', '', '61087947720b4-camion.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id_libro`),
  ADD KEY `nombre_autor_id` (`nombre_autor_id`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `nombre_libro_id` (`nombre_libro_id`),
  ADD KEY `nombre_cliente_id` (`nombre_cliente_id`);

--
-- Indices de la tabla `tipo_us`
--
ALTER TABLE `tipo_us`
  ADD PRIMARY KEY (`id_tipo_us`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `us_tipo` (`us_tipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `id_autor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tipo_us`
--
ALTER TABLE `tipo_us`
  MODIFY `id_tipo_us` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`nombre_autor_id`) REFERENCES `autor` (`id_autor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`nombre_libro_id`) REFERENCES `libro` (`id_libro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`nombre_cliente_id`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
