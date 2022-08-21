// fetch para la categoria autos

let array = [] //Primero creo un array vacio

//Funcion para imprimir el contenido del JSon en mi categoria "Autos"
function categoriaAutos(array){

    let htmlContentToAppend = ""; //Creo un string vacio

    //Funcion que recorrre los array del JSON
    for(let i = 0; i < array.length; i++){
        let category = array[i]; 
        //Uso el array con el valor "data.products" que son los objetos "auto" que voy a imprimir en pantalla
            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name} - ${category.currency} ${category.cost} </h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("autos").innerHTML = htmlContentToAppend; //Imprimo en pantalla
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(AUTOS_URL) //Al cargar el contenido del DOM hace uso de la funcion getJSONData, 
    //y le paso por parametro la URL de la categoria autos
    .then(function(result){
        if (result.status === "ok"){ //Condicional que revisa si el status del fetch es ¨ok¨
            array = result.data.products //Si el status del result es "ok", usamos el campo 
            //"products" del JSon que son los objetos "auto" que vamos a imprimir en pantalla para esta categoria
            categoriaAutos(array) //Usamos la funcion showCategoriesList con el valor del array 
        }
    }); 
});







