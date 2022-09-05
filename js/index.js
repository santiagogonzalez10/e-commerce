document.addEventListener("DOMContentLoaded", function(){
    //* Redireccionar del index al login//
    if(localStorage.getItem("nombre-usuario") == null){
        window.location.href = "login.html"; //Condicional que en caso de que el item "redireccion" no exista, redirecciona al login
    };

    // Agregar nombre de usuario a la barra de navegacion
    let nombreUsuario = [];
    const usuarioEnIndex = document.getElementById("usuarioIndex");
    if(localStorage.getItem("nombre-usuario").value != ""){
        nombreUsuario.value = localStorage.getItem("nombre-usuario");
        usuarioEnIndex.innerHTML = nombreUsuario.value;
    };

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