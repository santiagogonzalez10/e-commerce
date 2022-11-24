const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//Modificar la URL para que el fetch seleccione 
//el JSON de la categoria seleccionada
const idDeCategoria = localStorage.getItem("catID");
const PRODUCTOS_URL = PRODUCTS_URL+idDeCategoria+EXT_TYPE; 

//URL dinamica para los productos individuales y comentarios
const idDeProducto = localStorage.getItem("ID-Producto");
const PRODUCTO_INDIVIDUAL_URL = PRODUCT_INFO_URL+idDeProducto+EXT_TYPE;
const COMENTARIOS_URL = PRODUCT_INFO_COMMENTS_URL+idDeProducto+EXT_TYPE;

//URL para imprimir en carrito
const idDeCarrito = localStorage.getItem("ID-Carrito");
const PRODUCTO_COMPRADO_URL = PRODUCT_INFO_URL+idDeCarrito+EXT_TYPE;



let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

//Funcion que hace uso del fetch para los JSON
let getJSONData = function(url){
    let result = {}; //Objeto vacio
    showSpinner();
    return fetch(url) //Fetch de una URL
    .then(response => {
      if (response.ok) {
        return response.json(); //Si la respuesta del fetch es exitosa, 
        //va a retornar el valor del json
      }else{
        throw Error(response.statusText); //Si el fetch no es exitoso, va a retornar un error
      }
    })
    .then(function(response) { //Luego de hacer un fetch exitoso..
          result.status = 'ok'; //Le damos status "ok" al objeto result
          result.data = response; //El valor data del objeto result va a ser 
          //la respuesta del fetch
          hideSpinner();
          return result; //Retorna el valor de result
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result; //Function que atrapa el error de un fetch fallido
    });
};

//Agregar usuario a la barra de navegacion

let nombreUsuario = [];
const usuarioEnProductos = document.getElementById("perfilUser");
if(localStorage.getItem("nombre-usuario").value != ""){
      nombreUsuario.value = localStorage.getItem("nombre-usuario");
      usuarioEnProductos.innerHTML = `<div class="dropdown my-2">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      ${nombreUsuario.value}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" onclick="cerrarSession()" href="login.html">Cerrar sesión</a></li>
      </ul>
    </div>`;
};

function cerrarSession(){
  localStorage.removeItem("nombre-usuario");
  localStorage.removeItem("user-name1");
  localStorage.removeItem("user-name2");
  localStorage.removeItem("user-surName1");
  localStorage.removeItem("user-surName2");
  localStorage.removeItem("user-phone");
  window.location = "login.html";
};