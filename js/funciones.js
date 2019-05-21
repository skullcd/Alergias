function ContenedorDefinicion() {
    element = document.getElementById("cont_descrip");
    if (element.style.display == "none") {
       element.style.display = "flex";
    }else{
       element.style.display = "none";
    }
}

var AreaDolor = {Cabeza:["Nariz", "Ojos", "Orejas", "Boca", "Garganta"], Torso:["Pecho", "Espalda", "Adomen"],
 Brazo:["Mano", "Hombro", "Codo"],Pierna:["Rodilla", "Pies"]};

function change_photo(tipo){
    console.log(AreaDolor[tipo]);
    data="";
    for(datos in AreaDolor[tipo]){
      data +="<div style='height: 100px' class='swiper-slide tarjetas-opciones'>"+AreaDolor[tipo][datos]+"</div>";
    }
    document.getElementById("dolorEspecifico").innerHTML = data;
    document.getElementById("img_principal").setAttribute("src","imagenes/"+tipo+".jpg");
}



// function getData(){
//   var request = new XMLHttpRequest();
//
//   request.open('GET', "sources/alergias.json");
//   request.responseType = 'json';
//   request.send();
//
//   console.log(request);
//   request.onload = function() {
//   var datos = request.response;
//   console.log(datos);
//   }
// }
