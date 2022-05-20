<?php
include_once '../modelo/usuario.php';
session_start();
$user = $_POST['user'];
$pass = $_POST['pass'];
$usuario = new Usuario();
$usuario->logearse($user, $pass);
if (!empty($_SESSION['us_tipo'])) {
    switch ($_SESSION['us_tipo']) {
        case 1:
            header('Location: ../vista/vista_autor.php');
            break;

        case 2:
            header('Location: ../vista/vista_autor.php');
            break;
        case 3:
            header('Location: ../vista/vista_autor.php');
            break;
				case 4:
					header('Location: ../vista/vista_autor.php');
					break;
				case 5:
					header('Location: ../vista/vista_autor.php');
					break;
				case 6:
					header('Location: ../vista/vista_autor.php');
					break;
				case 7:
					header('Location: ../vista/vista_autor.php');
					break;
    }
} else {
    // $usuario->logearse($user, $pass);
    if (!empty($usuario->logearse($user, $pass))=="logueado") {
        $usuario->obtener_dato_loguado($user);
        foreach ($usuario->objetos as $objeto) {
            $_SESSION['usuario'] = $objeto->id_usuario;
            $_SESSION['us_tipo'] = $objeto->us_tipo;
            $_SESSION['nombre_us'] = $objeto->nombre_us;
        }
        switch ($_SESSION['us_tipo']) {
					case 1:
            header('Location: ../vista/vista_autor.php');
            break;

        case 2:
            header('Location: ../vista/vista_autor.php');
            break;
        case 3:
            header('Location: ../vista/vista_autor.php');
            break;
				case 4:
					header('Location: ../vista/vista_autor.php');
					break;
				case 5:
					header('Location: ../vista/vista_autor.php');
					break;
				case 6:
					header('Location: ../vista/vista_autor.php');
					break;
				case 7:
					header('Location: ../vista/vista_autor.php');
					break;
        }
    } else {
        header('Location: ../index.php');
    }
}
