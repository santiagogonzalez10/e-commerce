const btnCambios = document.getElementById("btnCambios");

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("nombre-usuario") === "" || localStorage.getItem("nombre-usuario") === null) {
        window.location = ("login.html");
    } else {
        mail.value = `${localStorage.getItem("nombre-usuario")}`;
        name1.value = `${localStorage.getItem("user-name1")}`;
        name2.value = `${localStorage.getItem("user-name2")}`;
        surName1.value = `${localStorage.getItem("user-surName1")}`;
        surName2.value = `${localStorage.getItem("user-surName2")}`;
        phone.value = `${localStorage.getItem("user-phone")}`;
        image.value = `${localStorage.getItem("profile-picture")}`;
    }
});

//Boton guardar cambios
const name1 = document.getElementById("nombre1");
const name2 = document.getElementById("nombre2");
const surName1 = document.getElementById("apellido1");
const surName2 = document.getElementById("apellido2");
const mail = document.getElementById("mail");
const phone = document.getElementById("telefono");
const formUser = document.getElementById("formUser");
const image = document.getElementById("image");

btnCambios.addEventListener("click", (e) => {
    e.preventDefault();
    formUser.classList.add("was-validated");
    localStorage.setItem("user-name1", name1.value);
    localStorage.setItem("user-name2", name2.value);
    localStorage.setItem("user-surName1", surName1.value);
    localStorage.setItem("user-surName2", surName2.value);
    localStorage.setItem("user-phone", phone.value);

});

//Agregar imagen

const profileImage = document.querySelector("#profileImage");
let displayImage = "";

function mostrarImagen(event){
    let imagenSource = event.target.result;
    let previewImage = document.getElementById("image");
    localStorage.setItem("profile-picture", event.target.result);

    previewImage.src = imagenSource;
}

function procesarArchivo(event){
    let imagen = event.target.files[0];

    let lector = new FileReader();

    lector.addEventListener("load", mostrarImagen, false);
    lector.readAsDataURL(imagen);
};

document.getElementById("profileImage").addEventListener("change", procesarArchivo, false)