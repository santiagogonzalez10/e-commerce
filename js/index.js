document.addEventListener("DOMContentLoaded", function(){
    //* Redireccionar el index al login//
    if(localStorage.getItem("redireccion") == 0){
        location.assign("login.html"); //Condicional que en caso de que el valor del item ¨redireccion¨ sea 0, redirecciona al login.html
    };
    let valor = 0; //Creo una variable de valor 0, que utilizo para redireccionar al login
    localStorage.setItem("redireccion", valor); //Creo un item en el localStorage y uso la variable "valor" como valor

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});