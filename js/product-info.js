let informacionProducto = [];

//Imprimir en pantalla
function mostrarInformacionProducto(informacionProducto){

    let htmlContentToAppend = "";
    for(let i = 0; i < informacionProducto.length; i++){
        let producto = informacionProducto[i];

        htmlContentToAppend += `
            <div class="card mb-3">
                <img class="card-img-top" src="${producto.images}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${producto.description}</h5>
                    <p class="card-text">${producto.cost}</p>
                    <p class="card-text"><small class="text-muted">${producto.soldCount}</small></p>
                </div>
            </div>
            `
        }

        document.getElementById("informacionProducto").innerHTML = htmlContentToAppend;
}

//Fetch para los productos individuales
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/products/"+localStorage.getItem("ID-Producto")+".json")
    .then(function(result){
        if (result.status === "ok"){ 
            informacionProducto = result.data; 
            console.log(informacionProducto);
            mostrarInformacionProducto(informacionProducto);
        }
    })
});