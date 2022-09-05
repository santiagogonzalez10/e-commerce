const email = document.getElementById("email");
const pass = document.getElementById("contrasenia");
const button = document.getElementById("enviar");
const alertaEmail = document.getElementById("errorEmail");
const alertaPass = document.getElementById("errorPass");
alertaEmail.style.color = 'red'; //Style de la alerta de error
alertaPass.style.color = 'red';

//Funcion de validacion del email y contraseña
button.addEventListener("click", (e)=>{ 
    e.preventDefault();
    if(email.value === null || email.value === ''){
        alertaEmail.innerHTML = 'Ingresa tu email';
        document.getElementById("email").style.borderColor = "red";
    }
    if (pass.value === null || pass.value === ''){
        alertaPass.innerHTML = "Ingresa tu contraseña";
        document.getElementById("contrasenia").style.borderColor = "red";
    }

    if(pass.value != null && pass.value != "" && email.value != null && email.value != '') {
        localStorage.setItem("nombre-usuario", email.value);
        window.location.href = "index.html";
    }
});