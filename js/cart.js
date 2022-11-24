const contenedor = document.getElementById("contenedor");
const valSubTotal = document.getElementById("valorSubtotal");
const valEnvio = document.getElementById("costoEnvio");
const valPagar = document.getElementById("totalAPagar");
const costosSubTotal = document.getElementById("costosSubtotal");

document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault();
    getJSONData("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then(function(result){
        if (result.status === "ok"){
            informacionCarrito = result.data;
            infoCarrito(informacionCarrito);
        }
    })
});

function infoCarrito(informacionCarrito){

    let contenidoCarrito= "";
    let costosSub = "";
    let costosTot = "";
    
    const arrayCarrito = informacionCarrito.articles;

    for(let i = 0; i < arrayCarrito.length; i++){

        let itemCarrito = arrayCarrito[i];

        contenidoCarrito += `
            <td><img width="150px" src="${itemCarrito.image}"></td>
            <td>${itemCarrito.name}</td>
            <td>${itemCarrito.currency}${itemCarrito.unitCost}</td>
            <td><input type="number" min="0" value="${itemCarrito.count}" onChange="calcSubtotal()" id="cantidadComprada"></td>
            <td id="valorSubtotal">${itemCarrito.currency}${itemCarrito.unitCost}</td>
        `         
        costosSub += `<p>${itemCarrito.currency} ${itemCarrito.unitCost}</p>`
        costosTot += `<p>${itemCarrito.currency} ${itemCarrito.unitCost}</p>`
        document.getElementById("costosSubtotal").innerHTML += costosSub;
        document.getElementById("totalAPagar").innerHTML += costosTot;
        document.getElementById("contenedor").innerHTML += contenidoCarrito;  
     } 
};

//Modificador de subtotal en base a la cantidad comprada 

function calcSubtotal(){
    
    subtotal = parseInt(document.getElementById("cantidadComprada").value) * informacionCarrito.articles[0].unitCost;
    
    let imprimirSubtotal = "";
    imprimirSubtotal = `
        USD ${subtotal}
    `

    document.getElementById("valorSubtotal").innerHTML = imprimirSubtotal;
    document.getElementById("costosSubtotal").innerHTML = imprimirSubtotal;

    const opcPremium = document.getElementById("opcPremium");
    const opcExpress = document.getElementById("opcExpress");
    const opcStandard = document.getElementById("opcStandard");
    let imprimirCostos = "";
    let imprimirTotal = "";
    if(opcPremium.checked){
        
        imprimirCostos = `
        USD ${subtotal*0.15}
    `
        imprimirTotal = `
        <strong>USD ${subtotal*0.15+subtotal}</strong>
        `
    document.getElementById("costoEnvio").innerHTML = imprimirCostos;
    document.getElementById("totalAPagar").innerHTML = imprimirTotal;
    } else if(opcExpress.checked){
        imprimirCostos = `
        USD ${subtotal*0.07}
    `
        imprimirTotal = `
        <strong>USD ${subtotal*0.07+subtotal}</strong>
        `
    document.getElementById("costoEnvio").innerHTML = imprimirCostos;
    document.getElementById("totalAPagar").innerHTML = imprimirTotal;
    } else if(opcStandard.checked){
        imprimirCostos = `
        USD ${subtotal*0.05}
    `
        imprimirTotal = `
        <strong>USD ${subtotal*0.05+subtotal}</strong>
        `
    document.getElementById("costoEnvio").innerHTML = imprimirCostos;
    document.getElementById("totalAPagar").innerHTML = imprimirTotal;
    }
};

//Desactivar campos de forma de pago

document.getElementById("tarjetaC").addEventListener("click", ()=>{
    document.getElementById("numeroCuenta").disabled = true;
    document.getElementById("numTarjeta").disabled = false;
    document.getElementById("codigoSeguridad").disabled = false;
    document.getElementById("vencimientoTarjeta").disabled = false;
    document.getElementById("formPagoSeleccionada").innerHTML = "";
    document.getElementById("formPagoSeleccionada").innerHTML = `Tarjeta de credito`
});

document.getElementById("transferenciaB").addEventListener("click", ()=>{
    document.getElementById("numeroCuenta").disabled = false;
    document.getElementById("numTarjeta").disabled = true;
    document.getElementById("codigoSeguridad").disabled = true;
    document.getElementById("vencimientoTarjeta").disabled = true;
    document.getElementById("formPagoSeleccionada").innerHTML = "";
    document.getElementById("formPagoSeleccionada").innerHTML = `Transferencia bancaria`
});

//Boton finalizar compra

const btnComprar = document.getElementById("finalizarCompra");
const calle = document.getElementById("calle");
const esquina = document.getElementById("esquina");
const numero = document.getElementById("numero");
const alertaError = document.getElementById("alertError");
const alertaSuccess = document.getElementById("alertSuccess");
const tarjetaC = document.getElementById("tarjetaC");
const transferenciaB = document.getElementById("transferenciaB");
const mensajeCartel = document.getElementById("cartel");
const cantidadComprada = document.getElementById("cantidadComprada");

btnComprar.addEventListener("click", ()=>{

        let cartel = "";

        if( calle.value != "" && esquina.value != "" && numero.value != ""
            && (opcExpress.checked || opcPremium.checked || opcStandard.checked)
            && parseInt(document.getElementById("cantidadComprada").value) > 0){
                if( tarjetaC.checked 
                    && document.getElementById("numTarjeta").value != "" 
                    && document.getElementById("vencimientoTarjeta").value != "" 
                    && document.getElementById("codigoSeguridad").value != ""){

                    cartel += `<div class="alert alert-success" role="alert">
                    Compra realizada con exito!
                    <span class="btn closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                  </div>`

                  mensajeCartel.innerHTML = cartel;

            

                } else if(  transferenciaB.checked 
                            && document.getElementById("numeroCuenta").value != ""){

                    cartel += `<div class="alert alert-success" role="alert">
                    Compra realizada con exito!
                    <span class="btn closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                        </div>`
            
                              mensajeCartel.innerHTML = cartel;

                } else {

                    cartel += `<div class="alert alert-danger" role="alert">
                    
                    La compra no pudo ser realizada.
                    <span class="btn closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                  </div>`

                  mensajeCartel.innerHTML = cartel;

                }
            } else {

                cartel += `<div class="alert alert-danger" role="alert">
                    La compra no pudo ser realizada.
                    <span class="btn closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                  </div>`

                  mensajeCartel.innerHTML = cartel;

            }
 });

/*Fetch json completo para imprimir en carrito
let productoComprado = [];

document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault();
    getJSONData(PRODUCTO_COMPRADO_URL)
    .then(function(result){
        if (result.status === "ok"){ 
            productoComprado = result.data; 
            comprarProducto(productoComprado);
        }
    })
});
function comprarProducto(productoComprado){

    let mostrarCarrito= "";
    let {name, cost, currency, images: images} = productoComprado;

    mostrarCarrito += `
            <td><img width="150px" src="${images[0]}"></td>
            <td>${name}</td>
            <td>${cost}${currency}</td>
            <td><input type="number" value="" onChange="calcSubtotal()" id="cantidadComprada1"></td>
            <td>Precio x cantidad</td>
        `

    document.getElementById("itemComprado").innerHTML += mostrarCarrito;  
     };*/
