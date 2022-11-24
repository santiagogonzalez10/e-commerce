let informacionProducto = [];
let comentariosProducto = [];
let productosRelacionados = [];

function infoRelacionado(id){
    localStorage.setItem("ID-Producto", id);
    window.location = "product-info.html"
}

function mostrarInformacion(informacionProducto){

    let contenidoDeProducto = "";
    let {id, name, description, cost, currency, images: images, soldCount: soldCount, category: category, relatedProducts: productosRelacionados} = informacionProducto;

    contenidoDeProducto += `  
    <h2 class="mt-4">${name} </h2>
    <hr class="col-sm-10">
        <label class="mt-1"><strong>Precio</strong></label>
        <p class="mt-1">${currency}  ${cost}</p>
        <label class="mt-2"><strong>Descripción</strong></label>
        <p class="mt-1">${description}</p>
        <label class="mt-2"><strong>Categoria</strong></label>
        <p class="mt-1">${category}</p>
        <label class="mt-2"><strong>Cantidad de vendidos</strong></label>
        <p class="mt-1">${soldCount}</p>
        <label class="mt-2" style="margin-left: 40%;"><strong>Imagenes del producto</strong></label>
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-Dark">
        </div>
    <div class="carousel-inner">
          <div class="carousel-item active" style="color: black">
          <div class="d-flex justify-content-center">
            <img src="${images[0]}" class="d-block w-300">
            </div>
          </div>
          <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <img src="${images[1]}" class="d-block w-300">
            </div>
          </div>
          <div class="carousel-item">
          <div class="d-flex justify-content-center">
            <img src="${images[2]}" class="d-block w-300">
            </div>
          </div>
          <div class="carousel-item">
          <div class="d-flex justify-content-center">
          <img src="${images[3]}" class="d-block w-300">
          </div>
        </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" style="color: black">
          <span class="carousel-control-prev-icon" aria-hidden="true" style="color: black"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" style="color: black">
          <span class="carousel-control-next-icon" aria-hidden="true" style="color: black"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        `
    let prodRelacionados = "";
    prodRelacionados+=`
    <h3 style="text-align: center;">Productos que te pueden interesar:</h3>
    <div class="row" style="margin-left: 27%;">
        <div onclick="infoRelacionado(${productosRelacionados[0].id})" class="col-sm-4" style="cursor: pointer;">
            <div class="card border-primary" style="width: 20rem; background-color: #d9d9d9;">
             <img class="card-img-top" src="${productosRelacionados[0].image}" alt="Card image cap">
                  <div class="card-body">
                     <h5 class="card-title" style="text-align: center;">${productosRelacionados[0].name}</h5>
                  </div>
            </div>
        </div>
        <div onclick="infoRelacionado(${productosRelacionados[1].id})" class="col-sm-4" style="cursor: pointer;">
            <div class="card border-primary" style="width: 20rem; background-color: #d9d9d9 ;">
             <img class="card-img-top" src="${productosRelacionados[1].image}" alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title" style="text-align: center;">${productosRelacionados[1].name}</h5>
                    </div>
            </div>
        </div>
    </div>
    `        

    document.getElementById("relatedProducts").innerHTML = prodRelacionados;
    document.getElementById("infoProducto").innerHTML += contenidoDeProducto+`<br>`;        
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
        
        commProducto+=`
        <div class="card border-danger my-2" style="background-color: #fff0d3;">
            <div>
                <p id="estrellas" class="mx-3"><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${stars}</p>
                <p class="mx-3">${comentario.description}</p>
             </div>
        </div>
        `
    }
    
    document.getElementById("comentarios").innerHTML += commProducto;

};

//Agregar comentario
const agregarComentario = document.getElementById("Enviar");
const opcionEstrellas = document.getElementById("opcionEstrellas");
const valorOpinion = document.getElementById("opinion");
agregarComentario.addEventListener("click", (e)=>{
    e.preventDefault;
    let comentar = "";
    let puntaje = opcionEstrellas.value;   
        let stars = "";     
        
        for (let a=0; a<5; a++) {
            if(a<puntaje){
                stars += `<span class="fa fa-star checked"></span>`
            } else {
                stars += `<span class="fa fa-star"></span>`
            }
        }
        let fecha = new Date().toLocaleDateString('es', { day: "numeric", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })   
    if(opcionEstrellas.value=1){
        comentar+= `
        <div class="card border-danger my-1 mx-2" style="background-color: #fff0d3;">
                <p id="estrellas" class="mx-3"><strong>${localStorage.getItem("nombre-usuario")}</strong> - ${fecha} - ${stars}</p>
                <p class="mx-3">${valorOpinion.value}</p>
            </div>
        `
    }

    document.getElementById("nuevoComentario").innerHTML= comentar;
});


//Fetch para los productos individuales
document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault();
    getJSONData(PRODUCTO_INDIVIDUAL_URL)
    .then(function(result){
        if (result.status === "ok"){ 
            informacionProducto = result.data; 
            console.log(informacionProducto)
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

/*function comprarItem(id){
    localStorage.setItem("ID-Carrito", id);
    alert("Se agrego el producto al carrito");
};*/