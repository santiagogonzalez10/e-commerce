let informacionProducto = [];
let comentariosProducto = [];

function mostrarInformacion(informacionProducto){

    let contenidoDeProducto = "";
    let {name, description, cost, currency, images: images, soldCount: soldCount, category: category} = informacionProducto;
    
    contenidoDeProducto += `   
    <h2 class="mt-4 mx-4">${name}</h2>
    <hr class="col-sm-10 mx-4">
        <label class="mt-1 mx-4"><strong>Precio</strong></label>
        <p class="mt-1 mx-4">${currency}  ${cost}</p>
        <label class="mt-2 mx-4"><strong>Descripción</strong></label>
        <p class="mt-1 mx-4">${description}</p>
        <label class="mt-2 mx-4"><strong>Categoria</strong></label>
        <p class="mt-1 mx-4">${category}</p>
        <label class="mt-2 mx-4"><strong>Cantidad de vendidos</strong></label>
        <p class="mt-1 mx-4">${soldCount}</p>
        <label class="mt-2 mx-4"><strong>Imagenes ilustrativas</strong></label>       
        `
    
    let imagenes = "";
    for (let image of images) {
        imagenes +=`
        <img src="${image}" alt="" class="col-sm-2 my-4 mx-4"/>
        `}
    
    document.getElementById("infoProducto").innerHTML += contenidoDeProducto+`<br>`+imagenes+`<br>`;        
};

function mostrarComentarios(comentariosProducto){
    
    let commProducto = "";
    
    for(let i = 0; i < comentariosProducto.length; i++){
        let comentario = comentariosProducto[i];        
        let puntaje = comentario.score;   
        let stars = "";     
        
        for (let a=0; a<5; a++) {
            if(a<puntaje){
                stars += `<span class="fa fa-star checked"></span>`
            } else {
                stars += `<span class="fa fa-star"></span>`
            }
        }
        
        commProducto+=`<div class="card">
                <div class="mx-4">
                <p id="estrellas"><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${stars}</p>
                <p>${comentario.description}</p>
            </div>
        </div>
        `
    }
    
    document.getElementById("comentarios").innerHTML += commProducto;

};

//Agregar comentario
/*const agregarComentario = document.getElementById("Enviar");
const opcionEstrellas = document.getElementById("opcionEstrellas");
agregarComentario.addEventListener("click", (e)=>{
    e.preventDefault;
    let comentar = "";
    
    if(opcionEstrellas.value=1){
        comentar+= `<div class="card">
                <div class="mx-4">
                <p id="estrellas"><strong>${localStorage.getItem("ID-Producto")}</strong> - ${comentario.dateTime} - ${comentario.score}</p>
                <p>${comentario.description}</p>
            </div>
        </div>
        `
    }

    document.getElementById("comentarios").innerHTML= 
});*/


//Fetch para los productos individuales
document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault();
    getJSONData(PRODUCTO_INDIVIDUAL_URL)
    .then(function(result){
        if (result.status === "ok"){ 
            informacionProducto = result.data; 
            mostrarInformacion(informacionProducto);
        }
    })
});

//Fetch para los comentarios
document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault();
    getJSONData(COMENTARIOS_URL)
    .then(function(result){
        if (result.status === "ok"){ 
            comentariosProducto = result.data; 
            mostrarComentarios(comentariosProducto);
        }
    })
  });

//Nombre de usuario en barra de navegación

let nombreUsuario = [];
const usuarioEnProductos = document.getElementById("usuarioProductos");
if(localStorage.getItem("nombre-usuario").value != ""){
      nombreUsuario.value = localStorage.getItem("nombre-usuario");
      usuarioEnProductos.innerHTML = nombreUsuario.value;
};