$(document).ready(function () {

    let funcion, funcion1, funcion2;

    funcion2 = "listar";

    rellenar_cliente();
    // ordenar();
    let datatable = $('#tabla_prestamos').DataTable({
        "lengthMenu": [[3, 10, 25, -1], [3, 10, 25, "All"]],
        "ajax": {
            "url": "../controlador/LibroController.php",
            "method": "POST",
            "data": { funcion2: funcion2 }
        },
        rowCallback: function (row, data) {
            if (data.lote == 0) {
                $($(row).find("td")[2]).css("background-color", "#F1948A");
            }
            else if (data.lote == 1) {
                $($(row).find("td")[2]).css("background-color", "#F7DC6F");
            }
            else if (data.lote >= 1) {
                $($(row).find("td")[2]).css("background-color", "#82E0AA");
            }
        },
        "columns": [
            { "data": "titulo" },
            { "data": "nombreautor" },
            { "data": "lote" },
            {
                "defaultContent": `
                                <button class="agregar_lista_prod btn btn-primary" title="Agregar a la lista" type="button" ><i class="fas fa-external-link">Agregar</i></button>` }
        ],
        "language": dis
    });
    function rellenar_cliente() {
        funcion = "rellenar_clientes";
        $.post('../controlador/ClienteController.php', { funcion }, (response) => {
            const sucursales = JSON.parse(response);
            let template = '<option value ="" selected>Seleccionar cliente</option>';
            sucursales.forEach(sucursal => {
                template += `
                            <option value="${sucursal.id}">${sucursal.nombre}</option>                            
						`;
            });
            $('#nombre22').html(template);
        })
    }

    RecuperarEnvios();
    calcularTotal();

    //EL BOTON DE AGREGAR
    $(document).on('click', '.agregar_lista_prod', function () {
        var datos = datatable.row($(this).parents()).data();
        // console.log(datos);
        const id = datos.id_libro;
        const titulo = datos.titulo;
        const nombreautor = datos.nombreautor;
        const lote = datos.lote;
        var libro = {
            id: id,
            titulo: titulo,
            nombreautor: nombreautor,
            lote: lote,
            cantidad: 0
        }
        let id_prod;
        let productos;
        productos = RecuperarLS();
        productos.forEach(prod => {
            if (prod.id === libro.id) {
                id_prod = prod.id;
            }
        });
        if (libro.lote == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El libro esta Agotado!',
            })
        } else {
            if (id_prod === libro.id) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El libro ya esta en la lista!',
                })
            } else {
                let template = '';
                template = `
                        <tr id="${libro.id}">
                        <td><h5>${libro.titulo}</h5></td>
                        <td>
                            <h5>${libro.nombreautor}</h5>
                        </td>   
                        <td>
                            <h5>${libro.lote}</h5>
                        </td>                 
                        <td>
                            <button class="borrar-producto btn btn-danger"><i class="fas fa-trash"></i></button>
                        </td>
                        </tr>
                        `;
                $('#lista_dis').append(template);
                AgregarLS(libro);
                // calcularTotal();
                // $('#tabla_distribuir').DataTable().ajax.reload();
            }
        }
    });

    function RecuperarEnvios() {
        let productos, id_libropres;
        productos = RecuperarLS();
        funcion = "buscar_id";
        productos.forEach(producto => {
            id_libropres = producto.id;
            // console.log(producto);
            $.post('../controlador/LibroController.php', { funcion, id_libropres }, (response) => {
                let template_compra = '';
                let json = JSON.parse(response);
                // console.log(json);
                template_compra = `
                <tr id="${json.id}">
                        <td><h5>${json.titulo}</h5></td>
                        <td>
                            <h5>${json.nombreautor}</h5>
                        </td>   
                        <td>
                            <h5>${json.lote}</h5>
                        </td>                 
                        <td>
                            <button class="borrar-producto btn btn-danger"><i class="fas fa-trash"></i></button>
                        </td>
                        </tr>                   
                `;
                // console.log(json);
                $('#lista_dis').append(template_compra);
                calcularTotal();
            })
        });
    }



    //CALCULAR TOTAL
    function calcularTotal() {
        let productos;
        let total = 0;
        productos = RecuperarLS();
        productos.forEach(producto => {
            let subtotal_producto = Number(producto.precio * producto.finalcanti);
            total = total + subtotal_producto;
            // console.log(total);
        });
        $('#total').html(total.toFixed(2));
    }

    // // PARA VERIFICAR EL STOCK
    // function verificar_stock() {
    //     let productos, id, cantidad;
    //     let error = 0;
    //     funcion = 'verificar_stock';
    //     productos = RecuperarLS();
    //     productos.forEach(producto => {
    //         id = producto.id;
    //         cantidad = producto.finalcanti;
    //         $.ajax({
    //             url: '../controlador/DistribuirController.php',
    //             data: { funcion, id, cantidad },
    //             type: 'POST',
    //             async: false,
    //             success: function (response) {
    //                 error = error + Number(response);

    //             }
    //         });
    //     });
    //     return error;
    // }

    //PARA EL BOTON DE ENVIAR LA LISTA 
    function Procesar_envio() {
        let nombre = '', nom, nom2;

        // nom = document.getElementById('nombre').value;
        // cliente = document.getElementById('nombre22').value;
        let cliente = $('#nombre22').val();
        console.log(cliente);
        if (RecuperarLS().length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay libros, seleccione algunos!',
            }).then(function () {
                location.href = '../vista/vista_prestamos.php';
            })
        }
        else if (cliente == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta el Cliente!!!',
            })
        } else if (RecuperarLS().length > 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo un libro por cliente!',
            }).then(function () {
                location.href = '../vista/vista_prestamos.php';
            })
        } else {
            Registrar_envio(cliente);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se realizo el prestamo! ' + nombre,
                showConfirmButton: false,
                timer: 2500
            }).then(function () {
                eliminarLS();
                location.href = '../vista/vista_prestamos.php';
                $('#tabla_prestamos').DataTable().ajax.reload();
            })
        }
    }


    //PARA GUARDAR UNA LISTA    
    function Registrar_envio(nombre) {
        // let productos;
        // productos = RecuperarLS();
        // let json = JSON.stringify(productos);
        let id_librops;
        let productos;
        productos = RecuperarLS();
        productos.forEach(prod => {
            id_librops = prod.id;
        });
        funcion = 'registrar_envio';
        console.log(id_librops);
        $.post('../controlador/PrestamoController.php', { funcion, nombre, id_librops }, (response) => {
            console.log(response);
        });
    }


    //PARA BORRAR EL PRODUCTO DE LA TABLA DE LISTA_DIS 
    $(document).on('click', '.borrar-producto', (e) => {
        let id, productos;
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        //primero debe cargar el document de eso depende. id =elemento.id no funciona
        id = $(elemento).attr('id');
        productos = RecuperarLS();
        productos.forEach(function (producto, indice) {
            if (producto.id === id) {
                productos.splice(indice, 1);
            }
        });
        localStorage.setItem('lista_dis', JSON.stringify(productos));
        elemento.remove();
        // calcularTotal();
        $('#tabla_prestamos').DataTable().ajax.reload();
    });



//PARA LLAMAR AL BOTON DE ENVIAR LISTA
$(document).on('click', '#procesar_envio', (e) => {
    Procesar_envio();
});

//RECUPERAR LOS PRODUCTOS
function RecuperarLS() {
    let productos;
    if (localStorage.getItem('lista_dis') === null) {
        productos = [];
    } else {
        productos = JSON.parse(localStorage.getItem('lista_dis'));
    }
    return productos;
}

//AGREGARPRODUCTOS
function AgregarLS(producto) {
    let productos;
    productos = RecuperarLS();
    productos.push(producto);
    localStorage.setItem('lista_dis', JSON.stringify(productos));
}

//ELIMINAR EL LOCAL STORE
function eliminarLS() {
    localStorage.removeItem('lista_dis');
    // localStorage.clear();
}


});


let dis = {
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Tabla vacia",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %d fila al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "1": "Mostrar 1 fila",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No Vacio"
            },
            "moment": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No vacio"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No vacío"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "not": "No",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d"
    },
    "select": {
        "1": "%d fila seleccionada",
        "_": "%d filas seleccionadas",
        "cells": {
            "1": "1 celda seleccionada",
            "_": "$d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        }
    },
    "thousands": "."
};