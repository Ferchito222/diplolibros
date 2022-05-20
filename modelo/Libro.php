<?php

    include 'conexion.php';

    class Libro{
        var $objetos;

        public function __construct()
        {
            $db=new Conexion();
            $this->acceso=$db->pdo;
        }

        function crear($titulo, $nombreautor, $lote, $descripcion){
            $sql = "SELECT id_libro FROM libro where titulo=:titu and nombre_autor_id=:autor and lote=:lot and descripcion=:descrip";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':titu'=>$titulo,':autor'=>$nombreautor,':lot'=>$lote,':descrip'=>$descripcion));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noadd';
            }else {
                $sql = "INSERT INTO libro(titulo, nombre_autor_id, lote, descripcion) values (:titu, :autor, :lot, :descrip);";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':titu'=>$titulo,':autor'=>$nombreautor,':lot'=>$lote,':descrip'=>$descripcion));
                echo 'add';
            }
        }

        function editar($id, $titulo, $nombreautor, $lote, $descripcion){
            $sql = "SELECT id_libro FROM libro where id_libro!=:id and titulo=:titulo and nombre_autor_id=:nombreautor and lote=:lote and descripcion=:descrip";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id,':titulo'=>$titulo,':nombreautor'=>$nombreautor,':lote'=>$lote,':descrip'=>$descripcion));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noedit';
            }else {
                $sql = "UPDATE libro SET titulo=:titulo, nombre_autor_id=:nombreautor, lote=:lote, descripcion=:descrip where id_libro=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$id,':titulo'=>$titulo,':nombreautor'=>$nombreautor,':lote'=>$lote,':descrip'=>$descripcion));
                echo 'edit';
            }
        }

        function borrar($id){
            $sql="DELETE libro FROM libro Where libro.id_libro = :id";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id));
            if (!empty($query->execute(array(':id'=>$id)))) {
                echo 'borrado';
            }else {
                echo 'noborrado';
            }
        }   

        function mostrar_data(){
            $sql = "SELECT id_libro, titulo, autor.nombre_autor as nombreautor, lote, descripcion, id_autor 
                    FROM libro 
                    join autor on nombre_autor_id=id_autor";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }
        function buscar_id($id)
    {
        $sql = "SELECT id_libro, titulo, autor.nombre_autor as nombreautor, lote, descripcion, id_autor
            FROM libro
            join autor on nombre_autor_id=id_autor
            where id_libro=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id' => $id));
        $this->objetos = $query->fetchall();
        return $this->objetos;
    }          
        
    }
?>