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
      data +="<div style='height: 100px' onclick=\"getQuestions('"+AreaDolor[tipo][datos]+"', '"+tipo+"')\" class='swiper-slide tarjetas-opciones'>"+AreaDolor[tipo][datos]+"</div>";
    }
    document.getElementById("dolorEspecifico").innerHTML = data;
    document.getElementById("img_principal").setAttribute("src","imagenes/"+tipo+".jpg");
}

function getQuestions(tipo, area){
  getData(area,tipo);
}

function getData(area, areaEspecifica){
  var xmlhttp = new XMLHttpRequest();
  var url = "sources/catalogoPreguntas.json";

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(areaEspecifica);
    areaEspecifica = myArr.Preguntas.Cuerpo[area][areaEspecifica];
    data="";
    try {
      for (var i = 0; i < Object.keys(areaEspecifica).length; i++) {
        data+="<div class='swiper-slide'><div id="+Object.keys(areaEspecifica)[i]+" class='preguntas'><h1>"+areaEspecifica[Object.keys(areaEspecifica)[i]]+"</h1></div></div>";
      }
    } catch (e) {
      data+="<div class='swiper-slide'><div class='preguntas'><h1>No hay preguntas</h1></div></div>";
    }
    document.getElementById("preguntas").innerHTML = data;
    var swiper = new Swiper('.swiper-container3', {
       slidesPerView: 1,
       spaceBetween: 30,
       loop: true,
       pagination: {
         el: '.swiper-pagination3',
         clickable: true,
       },
       navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
       },
     });
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

var datosArr=[];
for (var i = 0; i < 53; i++) {
  datosArr[i] = 0;
}
function getQuestion(){
  // console.log(datosArr);
  datosArr[document.getElementsByClassName("swiper-slide-active")[0].getElementsByTagName('div')[0].id] = parseInt(document.getElementById('rs-range-line').value);
  console.log(datosArr);
  document.getElementById('rs-range-line').value = 0;
  showSliderValue();
  // console.log(document.getElementsByClassName("swiper-slide-active")[0].getElementsByTagName('div')[0].id);
  // console.log(document.getElementById('rs-range-line').value);
}
