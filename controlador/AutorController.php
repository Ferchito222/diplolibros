<?php
include '../modelo/Autor.php';

    $autor = new Autor();

    if ($_POST['funcion'] == 'crear') {

    $nombreautor = $_POST['nombre'];

    $autor->crear($nombreautor);
    }

    if ($_POST['funcion'] == 'editar') {
    $id = $_POST['id'];
    $nombreautor = $_POST['nombre'];

    $autor->editar($id, $nombreautor);
    }

    if ($_POST['funcion'] == 'listar') {

    $autor->mostrar_data();
    $json = array();
    foreach ($autor->objetos as $objeto) {
        $json['data'][] = $objeto;
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

    }
 
    if ($_POST['funcion'] == 'borrar') {

    $id = $_POST['id'];
    $autor->borrar($id);

    }    
    if ($_POST['funcion']=='rellenar_autores') {
        $autor->mostrar_data();
        $json = array();
        foreach ($autor->objetos as $objeto) {
            $json[]=array(
                'id'=>$objeto->id_autor,
                'nombre'=>$objeto->nombre_autor
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }

?>