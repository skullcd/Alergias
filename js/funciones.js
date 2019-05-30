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
  showSliderValue();
  $("#option-inicial").css("display","none");
  $("#cont-preguntas-derecha").css("display","block");
}

var datosArr=[];
for (var i = 0; i < 55; i++) {
  datosArr[i] = 0;
}


var cantidadPreguntas=[]
for (var i = 0; i < 55; i++) {
  cantidadPreguntas[i] = 0;
}
localStorage.setItem("cantidadPreguntas",JSON.stringify(cantidadPreguntas));

function getQuestion(){
  cantidadPreguntas = JSON.parse(localStorage.getItem("cantidadPreguntas"));
  cantidadPreguntas[document.getElementsByClassName("swiper-slide-active")[0].getElementsByTagName('div')[0].id] = 1;

  datosArr[document.getElementsByClassName("swiper-slide-active")[0].getElementsByTagName('div')[0].id] = parseFloat(document.getElementById('rs-range-line').value/10);
  localStorage.setItem("datosUsuario",JSON.stringify(datosArr));
  localStorage.setItem("cantidadPreguntas",JSON.stringify(cantidadPreguntas));
  document.getElementById('rs-range-line').value = 0;
  showSliderValue();
  contadorPreguntas();
}


function contadorPreguntas(){
  cont=0;
  cantidadPreguntas = JSON.parse(localStorage.getItem("cantidadPreguntas"));
  for (var i = 0; i < cantidadPreguntas.length; i++) {
    if (cantidadPreguntas[i]==1) {
      cont++;
    }
  }
  $("#ContadorPregunta").html("Preguntas contestadas: "+cont);
  if (cont == 3) {
    console.log("entro");
    $("#boton-diagnostico").css("opacity","1");
  }
}

function TipoDiagnostico(tipo){
    window.location = tipo+".html";

}

function obtenerAlergias(){
  var request = new XMLHttpRequest();
  request.open('GET', './sources/alergias.json', true);
  request.send();
  request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var contenido="";
          var alergiasArray = JSON.parse(this.responseText);
          var alergias = alergiasArray['Alergias'];
          for (let i = 0; i < Object.keys(alergias).length; i++) {
              nombreAlergia = Object.keys(alergias)[i];
              contenido +="<div class='input-group mb-3'>"+
                "<div class='input-group-prepend'>"+
                  "<div class='input-group-text'>"+
                    "<input id="+i+" type='checkbox' >"+
                  "</div>"+
                "</div>"+
                "<h1 class='form-control'>"+nombreAlergia+"</h1>"
                // "<input type='text' value="+nombreAlergia+" class='form-control'>"+
              "</div>";
            }

            document.getElementById('cont-alergias').innerHTML = contenido;
        }
      }
}

function validarSeleccion(){
  respuestas=[];
  $('#cont-alergias :input').each(function(e){
    if($("#"+this.id).is(':checked')) {
      respuestas.push(this.id);
    }
  });
  if (respuestas.length == 0) {
    alert("Selecciona una alergia");
  }else {
    localStorage.setItem("SeleccionAlergias",JSON.stringify(respuestas));
    $("#contenido-especifico").css("display","none");
    $("#seleccionarArea-especifico").css("display","block");
  }
}
