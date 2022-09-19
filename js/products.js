let productosCategoriaActual = []; //Array vacio para imprimir los productos

//Constantes para filtrar precios y relevancia
const ordenarPrecios1 = document.getElementById("ordenarPorPrecio1");
const ordenarPrecios2 = document.getElementById("ordenarPorPrecio2");
const ordenarPorRelevancia = document.getElementById("ordenarPorRelevancia");
const botonFiltrarPrecio = document.getElementById("filtrarRango");
let ordenamientoCategoria = undefined;
let cantidadMinima = undefined;
let cantidadMaxima = undefined;

//Buscador por nombre
const inputDeBusqueda = document.getElementById("input-busqueda");
const botonBusqueda = document.getElementById("boton-busqueda");
const celdasProductos = document.getElementById("ListaProductos");

//Funcion para imprimir el contenido del JSon en mi categoria
function ListasDeProductos(productosCategoriaActual){

    let contenidoDeCategoria = ""; //Creo un string vacio

    //Funcion que recorrre los productosCategoriaActual del JSON
    for(let i = 0; i < productosCategoriaActual.length; i++){
        let itemDeCategoria = productosCategoriaActual[i]; 

        if (((cantidadMinima == undefined) || (cantidadMinima != undefined && parseInt(itemDeCategoria.cost) >= cantidadMinima)) &&
            ((cantidadMaxima == undefined) || (cantidadMaxima != undefined && parseInt(itemDeCategoria.cost) <= cantidadMaxima))){
                  
        //Uso el productosCategoriaActual con el valor "data.products" que son los objetos que voy a imprimir en pantalla
            contenidoDeCategoria += `
            <div onclick="guardarIDProducto(${itemDeCategoria.id})" class="list-group-item list-group-item-action cursor-active" id="articulosEnVenta">
                <div class="row">
                    <div class="col-3">
                        <img src="${itemDeCategoria.image}" alt="${itemDeCategoria.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${itemDeCategoria.name} - ${itemDeCategoria.currency} ${itemDeCategoria.cost} </h4>
                            <small class="text-muted">${itemDeCategoria.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${itemDeCategoria.description}</p>
                    </div>
                </div>
            </div>
            `
            }
        }
        
        document.getElementById("ListaProductos").innerHTML = contenidoDeCategoria; //Imprimo en pantalla
}

//Funcion para ordenar por precio y relevancia

function ordenarProductos(ordenarPor, productosCategoriaActual){
    let lista = [];
    if (ordenarPor === ordenarPrecios1)
    {
        lista = productosCategoriaActual.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (ordenarPor === ordenarPrecios2){
        lista = productosCategoriaActual.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (ordenarPor === ordenarPorRelevancia){
        lista = productosCategoriaActual.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return lista;
};

//Funcion para cambiar la forma en que se ordenan los productos

function cambiarOrden(ordenarPor){
    ordenamientoCategoria = ordenarPor; //Uso la funcion que compara los precios para reordenar los articulos

    productosCategoriaActual = ordenarProductos(ordenamientoCategoria, productosCategoriaActual); 

    //Muestro las categorías ordenadas
    ListasDeProductos(productosCategoriaActual);
};

document.addEventListener("DOMContentLoaded", function(e){
    e.preventDefault();
    getJSONData(PRODUCTOS_URL) //Al cargar el contenido del DOM hace uso de la funcion getJSONData, 
    //y le paso por parametro la URL de la categoria
    .then(function(result){
        if (result.status === "ok"){ //Condicional que revisa si el status del fetch es ¨ok¨
            productosCategoriaActual = result.data.products; //Si el status del result es "ok", usamos el campo 
            //"products" del JSon que son los objetos que vamos a imprimir en pantalla
            ListasDeProductos(productosCategoriaActual); //Usamos la funcion showCategoriesList con el valor del productosCategoriaActual 
            //console.log(productosCategoriaActual);
     }
    });

    //Ordenar y filtrar productos

    ordenarPrecios1.addEventListener("click", (e)=>{
        e.preventDefault();
        cambiarOrden(ordenarPrecios1);
    });
    ordenarPrecios2.addEventListener("click", (e)=>{
        e.preventDefault();
        cambiarOrden(ordenarPrecios2);
    });
    ordenarPorRelevancia.addEventListener("click", (e)=>{
        e.preventDefault();
        cambiarOrden(ordenarPorRelevancia);
    });
    ListasDeProductos(productosCategoriaActual);

    //Limpiar rango de precios
    document.getElementById("limpiarRango").addEventListener("click", function(){
     document.getElementById("rangoMinimo").value = "";
     document.getElementById("rangoMaximo").value = "";

     cantidadMinima = undefined;
     cantidadMaxima = undefined;

     ListasDeProductos(productosCategoriaActual);
    });

    //Filtrar por rango de precio

    botonFiltrarPrecio.addEventListener("click", function(){

        cantidadMinima = document.getElementById("rangoMinimo").value;
        cantidadMaxima = document.getElementById("rangoMaximo").value;
      
        if ((cantidadMinima != undefined) && (cantidadMinima != "") && (parseInt(cantidadMinima)) >= 0){
            cantidadMinima = parseInt(cantidadMinima);
        }
        else{
            cantidadMinima = undefined;
        }
      
        if ((cantidadMaxima != undefined) && (cantidadMaxima != "") && (parseInt(cantidadMaxima)) >= 0){
            cantidadMaxima = parseInt(cantidadMaxima);
        }
        else{
            cantidadMaxima = undefined;
        }
        ListasDeProductos(productosCategoriaActual);
      });

});

//Nombre de usuario en barra de navegación

let nombreUsuario = [];
const usuarioEnProductos = document.getElementById("usuarioProductos");
if(localStorage.getItem("nombre-usuario").value != ""){
      nombreUsuario.value = localStorage.getItem("nombre-usuario");
      usuarioEnProductos.innerHTML = nombreUsuario.value;
};

//Buscador por palabras/letras clave

inputDeBusqueda.addEventListener("keyup", (e)=>{ //Evento que escucha el contenido que se escribe en el buscador
    if(e.target.matches("#input-busqueda")){ //Si se escribe algo en el input...
        document.querySelectorAll("#articulosEnVenta").forEach(elemento =>{ //Recorremos todos los articulos y sus descripciones
        elemento.textContent.toLowerCase() //Revisamos si el textContent del elemento que recorremos (pasamos todo a minusculas)..
        .includes(e.target.value.toLowerCase()) //...si incluye lo que estamos buscando
            ?elemento.classList.remove("ocultar") //Removemos la clase "ocultar" de los articulos que si cumplen
            :elemento.classList.add("ocultar") //Le agregamos la clase ocultar a los articulos que no cumplen con las condiciones de busqueda
        })
    }
});

//Funcion para setear el id del producto en el localStorage
function guardarIDProducto(id) {
    localStorage.setItem("ID-Producto", id);
    window.location = "product-info.html"
}

