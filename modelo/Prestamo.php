<?php
    include 'conexion.php';
    class Prestamo{
        var $objetos;
        public function __construct()
        {
            $db=new Conexion();
            $this->acceso=$db->pdo;
        }
        
        function crear($id_libpres, $nombre, $fechaprestamo, $diasprestamo)
        {
            $sql = "INSERT INTO prestamo(nombre_libro_id, nombre_cliente_id, fecha_prestamo, dias_prestamos) values(:libro, :cliente, :fecha, :dias)";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':libro'=>$id_libpres,':cliente'=>$nombre,':fecha'=>$fechaprestamo,':dias'=>$diasprestamo));

        }
        function reducirlote($id_libpres){

            $sql = "UPDATE libro SET lote=lote-1 where id_libro=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id_libpres));
            echo 'prestar';
        }
        function devolverlote($id_libpres){

            $sql = "UPDATE libro SET lote=lote+1 where id_libro=:id2";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id2'=>$id_libpres));
            // echo 'devolver';
        }     
        function mostrar_data(){
            $sql = "SELECT id_prestamo, libro.titulo as titulo, cliente.nombre_cliente as cliente, fecha_prestamo, dias_prestamos, nombre_libro_id as id_lib 
                    FROM prestamo 
                    join libro on nombre_libro_id=id_libro
                    join cliente on nombre_cliente_id=id_cliente";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }  
        function borrar($id)
        {
            $sql = "DELETE prestamo
            FROM prestamo
            Where prestamo.id_prestamo =:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id)); 
            if (!empty($query->execute(array(':id'=>$id)))) {
                echo 'borrado';
            }else {
                echo 'noborrado';
            }
        }      
        
    }
?>