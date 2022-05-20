<?php
include '../modelo/Libro.php';

    $libro = new Libro();

    if ($_POST['funcion'] == 'crear') {

    $titulo = $_POST['titulo'];
    $nombreautor = $_POST['autores'];
    $lote = $_POST['lote'];
    $descripcion = $_POST['des'];

    $libro->crear($titulo,$nombreautor,$lote,$descripcion);
    }

    if ($_POST['funcion'] == 'editar') {

    $id = $_POST['id'];
    $titulo = $_POST['titulo'];
    $nombreautor = $_POST['autores'];
    $lote = $_POST['lote'];
    $descripcion = $_POST['des'];
    
    $libro->editar($id,$titulo,$nombreautor,$lote,$descripcion);
    }

    if ($_POST['funcion2'] == 'listar') {

    $libro->mostrar_data();
    $json = array();
    foreach ($libro->objetos as $objeto) {
        $json['data'][] = $objeto;
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
    
    }
    if ($_POST['funcion'] == 'buscar_id') {
        $id = $_POST['id_libropres'];
        $libro->buscar_id($id);
        $json = array();
        foreach ($libro->objetos as $objeto) {
            $json[] = array(
                'id' => $objeto->id_libro,
                'titulo' => $objeto->titulo,
                'nombreautor' => $objeto->nombreautor,
                'lote' => $objeto->lote,
            );
        }
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }
 
    if ($_POST['funcion'] == 'borrar') {

    $id = $_POST['id'];
    $libro->borrar($id);

    }

?>