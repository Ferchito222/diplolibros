<?php
    include_once 'conexion.php';
    class usuario{
        var $objetos;
        public function __construct()
        {
            $db = new conexion();
            $this->acceso = $db->pdo;
        }
        function logearse($dni, $pass){
            $sql = "SELECT * FROM usuario inner join tipo_us on us_tipo=id_tipo_us where dni_us=:dni";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':dni'=>$dni));
            $objetos=$query->fetchall();
            foreach ($objetos as $objeto) {
                $contrasena_actual=$objeto->contrasena_us;
            }
            if (strpos($contrasena_actual,'$2y$10$')===0) {
                if (password_verify($pass,$contrasena_actual)) {
                    return "logueado";
                }
            } else {
                if ($pass==$contrasena_actual) {
                    return "logueado";
                }
            }
        }
				function obtener_dato_loguado($user){
					$sql = "SELECT * FROM usuario join tipo_us on us_tipo=id_tipo_us and dni_us=:user";
					$query = $this->acceso->prepare($sql);
					$query->execute(array(':user'=>$user));
					$this->objetos=$query->fetchall();
					return $this->objetos;
			}
        function obtener_datos($id){
            $sql = "SELECT * FROM usuario join tipo_us on us_tipo=id_tipo_us and id_usuario=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id));
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }
        function editar($id_usuario,$telefono,$residencia,$correo,$sexo,$adicional){
            $sql = "UPDATE usuario SET telefono_us=:telefono,residencia_us=:residencia,correo_us=:correo,sexo_us=:sexo,adicional_us=:adicional WHERE id_usuario=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id_usuario,':telefono'=>$telefono,':residencia'=>$residencia,':correo'=>$correo,':sexo'=>$sexo,':adicional'=>$adicional)); 
        }
        function cambiar_contra($id_usuario,$oldpass,$newpass){
            $sql = "SELECT * FROM usuario WHERE id_usuario=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id_usuario)); 
            $this->objetos = $query->fetchall();
            foreach ($this->objetos as $objeto) {
                $contrasena_actual=$objeto->contrasena_us;
            }
            if (strpos($contrasena_actual,'$2y$10$')===0) {
                if (password_verify($oldpass,$contrasena_actual)) {
                    $pass=password_hash($newpass,PASSWORD_BCRYPT,['cost'=>10]);
                    $sql = "UPDATE usuario SET contrasena_us=:newpass WHERE id_usuario=:id";
                    $query=$this->acceso->prepare($sql);
                    $query->execute(array(':id'=>$id_usuario, ':newpass'=>$pass));
                    echo 'update';
                } else {
                    echo 'noupdate';
                }
                
            } else {
                if ($oldpass==$contrasena_actual) {
                    $pass=password_hash($newpass,PASSWORD_BCRYPT,['cost'=>10]);
                    $sql = "UPDATE usuario SET contrasena_us=:newpass WHERE id_usuario=:id";
                    $query=$this->acceso->prepare($sql);
                    $query->execute(array(':id'=>$id_usuario, ':newpass'=>$pass));
                    echo 'update';
                }else {
                    echo 'noupdate';
                }
            }
        }
        function cambiar_photo($id_usuario,$nombre){
            $sql = "SELECT avatar FROM usuario WHERE id_usuario=:id";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id_usuario)); 
            $this->objetos = $query->fetchall();
                $sql = "UPDATE usuario SET avatar=:nombre WHERE id_usuario=:id";
                $query=$this->acceso->prepare($sql);
                $query->execute(array(':id'=>$id_usuario, ':nombre'=>$nombre));
            return $this->objetos;
        }
        function buscar(){
            if (!empty($_POST['consulta'])) {
                $consulta = $_POST['consulta'];
                $sql = "SELECT * FROM usuario join tipo_us on us_tipo = id_tipo_us where nombre_us LIKE :consulta";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':consulta'=>"%$consulta%"));
                $this->objetos=$query->fetchall();
                return $this->objetos;
            }else {
                $sql = "SELECT * FROM usuario join tipo_us on us_tipo = id_tipo_us where nombre_us NOT LIKE '' ORDER BY id_usuario LIMIT 25";
                $query = $this->acceso->prepare($sql);
                $query->execute();
                $this->objetos=$query->fetchall();
                return $this->objetos;
            }
        }
        function crear($nombre,$apellido,$edad,$dni,$pass,$tipo,$avatar){
            $sql = "SELECT id_usuario FROM usuario where dni_us=:dni";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':dni'=>$dni));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                echo 'noadd';
            }else {
                $sql = "INSERT INTO usuario(nombre_us,apellidos_us,edad,dni_us,contrasena_us,us_tipo,avatar) VALUES (:nombre,:apellido,:edad, :dni,:pass,:tipo,:avatar);";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':nombre'=>$nombre,':apellido'=>$apellido,':edad'=>$edad, ':dni'=>$dni,':pass'=>$pass,':tipo'=>$tipo,':avatar'=>$avatar));
                echo 'add';
            }
        }
        
        function descender($pass,$id_descendido,$id_usuario){
            $sql = "SELECT id_usuario FROM usuario where id_usuario=:id_usuario and contrasena_us=:pass";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id_usuario'=>$id_usuario,':pass'=>$pass));
            $this->objetos=$query->fetchall();
            if (!empty($this->objetos)) {
                $tipo=2;
                $sql = "UPDATE usuario SET us_tipo=:tipo where id_usuario=:id";
                $query = $this->acceso->prepare($sql);
                $query->execute(array(':id'=>$id_descendido,':tipo'=>$tipo));
                echo 'descendido';
            }else {
                echo 'nodescendido';
            }
        }
				function ascender($pass,$id_ascendido,$id_usuario){
					$sql = "SELECT * FROM usuario where id_usuario=:id_usuario";
					$query = $this->acceso->prepare($sql);
					$query->execute(array(':id_usuario'=>$id_usuario));
					$this->objetos=$query->fetchall();
					$tipo=3;
					foreach ($this->objetos as $objeto) {
						$contrasena_actual=$objeto->contrasena_us;
					}
					if (strpos($contrasena_actual,'$2y$10$')===0) {
						if (password_verify($pass,$contrasena_actual)) {
							
							$sql = "UPDATE usuario SET us_tipo=:tipo where id_usuario=:id";
							$query = $this->acceso->prepare($sql);
							$query->execute(array(':id'=>$id_ascendido,':tipo'=>$tipo));
							echo 'ascendido';
						}else {
								echo 'noascendido';
						}
				} else {
						if ($pass==$contrasena_actual) {
							if (password_verify($pass,$contrasena_actual)) {
								
								$sql = "UPDATE usuario SET us_tipo=:tipo where id_usuario=:id";
								$query = $this->acceso->prepare($sql);
								$query->execute(array(':id'=>$id_ascendido,':tipo'=>$tipo));
								echo 'ascendido';
							}else {
								echo 'noascendido';
							}
						}
				}
			}
        function borrar($pass,$id_borrado,$id_usuario){
            $sql = "SELECT * FROM usuario where id_usuario=:id_usuario";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':id_usuario'=>$id_usuario));
            $this->objetos=$query->fetchall();
            foreach ($this->objetos as $objeto) {
                $contrasena_actual=$objeto->contrasena_us;
            }
            if (strpos($contrasena_actual,'$2y$10$')===0) {
                if (password_verify($pass,$contrasena_actual)) {
                    $sql = "DELETE FROM usuario where id_usuario=:id";
                    $query = $this->acceso->prepare($sql);
                    $query->execute(array(':id'=>$id_borrado));
                    echo 'borrado';
                }else {
                    echo 'noborrado';
                }
            } else {
                if ($pass==$contrasena_actual) {
                    if (password_verify($pass,$contrasena_actual)) {
                        $sql = "DELETE FROM usuario where id_usuario=:id";
                        $query = $this->acceso->prepare($sql);
                        $query->execute(array(':id'=>$id_borrado));
                        echo 'borrado';
                    }else {
                        echo 'noborrado';
                    }
                }
            }
        }
    }
?>