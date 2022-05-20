<?php

    include 'conexion.php';

    class Autor{
        var $objetos;

        public function __construct()
        {
            $db=new Conexion();
            $this->acceso=$db->pdo;
        }

        function crear($nombreautor){
            $sql = "SELECT id_autor FROM autor where nombre_autor=:nombre";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre'=>$nombreautor));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noadd';
            }else {
                $sql = "INSERT INTO autor(nombre_autor) values (:nombre);";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':nombre'=>$nombreautor));
                echo 'add';
            }
        }

        function editar($id, $nombreautor){
            $sql = "SELECT id_autor FROM autor where id_autor!=:id and nombre_autor=:nombre";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id,':nombre'=>$nombreautor));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noedit';
            }else {
                $sql = "UPDATE autor SET nombre_autor=:nombre where id_autor=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$id,':nombre'=>$nombreautor));
                echo 'edit';
            }
        }

        function borrar($id){
            $sql="DELETE autor FROM autor Where autor.id_autor = :id";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id));
            if (!empty($query->execute(array(':id'=>$id)))) {
                echo 'borrado';
            }else {
                echo 'noborrado';
            }
        }
        function mostrar_data(){
            $sql = "SELECT * FROM autor";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }       
        // function rellenar_Unidades(){
        //     $sql = "SELECT * FROM unidad ORDER BY medida asc";
        //     $query = $this->acceso->prepare($sql);
        //     $query->execute(); 
        //     $this->objetos = $query->fetchall();
        //     return $this->objetos;
        // }    
        
    }
?>