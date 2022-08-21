const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//Constate que uso para la categoria Autos
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 

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
        return response.json(); //Si la respuesta del fetch es exitosa, va a retornar el valordel json
      }else{
        throw Error(response.statusText); //Si el fetch no es exitoso, va a retornar un error
      }
    })
    .then(function(response) { //Luego de hacer un fetch exitoso..
          result.status = 'ok'; //Le damos status "ok" al objeto result
          result.data = response; //El valor data del objeto result va a ser la respuesta del fetch
          hideSpinner();
          return result; //Retorna el valor de result
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result; //Function que atrapa el error de un fetch fallido
    });
}