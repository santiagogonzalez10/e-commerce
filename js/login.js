const email = document.getElementById("email");
const pass = document.getElementById("contrasenia");
const button = document.getElementById("ingresar");
const alertaError = document.getElementById("error");
alertaError.style.color = 'red'; //Style de la alerta de error

console.log(localStorage);

//Funcion de validacion del email y contraseña
function enviarFormulario(){ 
    let mensajeError = []; //Creo variable vacia que va a contener el mensaje de error

    if(email.value === null || email.value === ''){
        mensajeError.push('Ingresa tu email'); //Pusheo/imprimo un mensaje de error en caso de que el email no tenga valor
    } else {
        localStorage.redireccion += 2; //Modifico el el valor del item ¨redireccion¨ en el localStorage
        location.replace("index.html"); //Y redirecciono al usuario a la pagina principal del e-commerce
    }
    if(pass.value === null || pass.value === ''){ //Misma condicional que la anterior pero para validar la contraseña
        mensajeError.push('Ingresa tu contraseña'); 
    } else {
        alert("Usuario y contraseña ingresado con exito!");
        localStorage.redireccion += 2;
        location.replace("index.html");
    }
    error.innerHTML = mensajeError.join(', '); //Imprimo con innerHTML en mi pantalla el/los mensajes de error (separados por coma y espacio)
    return false; //Impide que el formulario se envie por defecto
};


/*const formularioLogin = document.getElementById("formulario");/*

/*formularioLogin.addEventListener("submit", function(event){
  event.preventDefault;

  let mensajeError = [];

    if(email.value === null || email.value === ''){
        mensajeError.push('Ingresa tu email');
    }
    if(pass.value === null || pass.value === ''){
        mensajeError.push('Ingresa tu contraseña');
    } else {
        window.replace.href = "index.html"
    }
    error.innerHTML = mensajeError.join(', ');
});*/