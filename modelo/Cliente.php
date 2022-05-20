<?php

    include 'conexion.php';

    class Cliente{
        var $objetos;

        public function __construct()
        {
            $db=new Conexion();
            $this->acceso=$db->pdo;
        }

        function crear($nombrecliente, $email, $celular){
            $sql = "SELECT id_cliente FROM cliente where nombre_cliente=:nombrecliente and email=:email and celular=:celular";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombrecliente'=>$nombrecliente,':email'=>$email,':celular'=>$celular));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noadd';
            }else {
                $sql = "INSERT INTO cliente(nombre_cliente, email, celular) values (:nombrecliente, :email, :celular);";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':nombrecliente'=>$nombrecliente,':email'=>$email,':celular'=>$celular));
                echo 'add';
            }
        }

        function editar($id, $nombrecliente, $email, $celular){
            $sql = "SELECT id_cliente FROM cliente where id_cliente!=:id and nombre_cliente=:nombrecliente and email=:email and celular=:celular";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id,':nombrecliente'=>$nombrecliente,':email'=>$email,':celular'=>$celular));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noedit';
            }else {
                $sql = "UPDATE cliente SET nombre_cliente=:nombrecliente, email=:email, celular=:celular where id_cliente=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$id,':nombrecliente'=>$nombrecliente,':email'=>$email,':celular'=>$celular));
                echo 'edit';
            }
        }

        function borrar($id){
            $sql="DELETE cliente FROM cliente Where cliente.id_cliente = :id";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id));
            if (!empty($query->execute(array(':id'=>$id)))) {
                echo 'borrado';
            }else {
                echo 'noborrado';
            }
        }   

        function mostrar_data(){
            $sql = "SELECT * FROM cliente";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }         
        
    }
?>