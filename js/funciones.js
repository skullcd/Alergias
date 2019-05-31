function ContenedorDefinicion(resultadoTotal) {
      var img = localStorage.getItem("imgResultado");
      var request = new XMLHttpRequest;
      request.open('GET', './sources/alergias.json', true);
      request.onreadystatechange = function () {
        if (request.readyState == 4)
          if  (request.status == 200) {

            var alergiasArray = JSON.parse(this.responseText);
            var alergias = alergiasArray['Alergias'];

            //llenar la matriz "datos"
            for (let i = 0; i < Object.keys(alergias).length; i++) {
              if (i == img) {
                var nameAlergia = Object.keys(alergias)[i];
                var arrayDefinicion = alergias[nameAlergia]['Definicion'];
                // document.getElementById(definicion).innerHTML = arrayDefinicion;
                console.log(nameAlergia);
                console.log(arrayDefinicion);
                document.getElementById("imgResultado").setAttribute("src","img/imagenesAlergias/"+img+".jpg");
                document.getElementById("textResultado").innerHTML=arrayDefinicion;
                document.getElementById("nameResultado").innerHTML="Resultado: "+nameAlergia;
                document.getElementById("textResultadoporcentaje").innerHTML=resultadoTotal;

                element = document.getElementById("cont_descrip");
                if (element.style.display = "none") {
                   element.style.display = "flex";
                }else{
                   element.style.display = "none";
                }
              }

            }
          }
        };
        request.send(null);
}


function cerrarModal(){
  element = document.getElementById("cont_descripEspecifico");
  if (element.style.display == "none") {
     element.style.display = "flex";
  }else{
     element.style.display = "none";
  }
}

function cerrarModalGenral(){
  element = document.getElementById("cont_descrip");
  if (element.style.display == "none") {
     element.style.display = "flex";
  }else{
     element.style.display = "none";
  }
}


function ContenedorDefinicionEspecifico(resultadosTotal, textoResultados) {
      var img = localStorage.getItem("imgResultado");
      var request = new XMLHttpRequest;
      request.open('GET', './sources/alergias.json', true);
      request.onreadystatechange = function () {
        if (request.readyState == 4)
          if  (request.status == 200) {

            var alergiasArray = JSON.parse(this.responseText);
            var alergias = alergiasArray['Alergias'];
            dataContentido = "";
            //llenar la matriz "datos"
            for (var j = 0; j < resultadosTotal.length; j++) {
              for (let i = 0; i < Object.keys(alergias).length; i++) {
                  var nameAlergia = Object.keys(alergias)[resultadosTotal[j]];
                  var arrayDefinicion = alergias[nameAlergia]['Definicion'];
                  console.log(nameAlergia);
                  console.log(arrayDefinicion);
                  dataContentido += "<div class='swiper-slide descrip'>"+
                    "<div class='contenedor_decripcion'>"+
                      "<div class='contenedor_decripcion_derecho descrip'>"+
                        "<img src='img/imagenesAlergias/"+resultadosTotal[j]+".jpg'>"+
                      "</div>"+
                      "<div class='contenedor_decripcion_izquierdo'>"+
                        "<div class='cont_izq_titulo descrip'>"+
                          "<h2>Resultado: "+nameAlergia+"</h2>"+
                        "</div>"+
                        "<div class='cont_izq_texto '>"+
                          "<p>"+arrayDefinicion+"</p>"+
                          "<b> <p id='textResultadoporcentaje_"+resultadosTotal[j]+"'>"+textoResultados[j]+"</p></b>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                  "</div>";
                  break;
                  // document.getElementById('imgResultado").setAttribute("src","img/imagenesAlergias/"+resultadosTotal[j]+".jpg");
                  // document.getElementById("textResultado").innerHTML=arrayDefinicion;
                  // document.getElementById("nameResultado").innerHTML="Resultado: "+nameAlergia;
                  // document.getElementById("textResultadoporcentaje").innerHTML=resultadoTotal;
                  // }
              }
            }
            console.log(dataContentido);
            $("#ResultadosEspecifico").html(dataContentido);
            element = document.getElementById("cont_descripEspecifico");
            var swiper = new Swiper('.swiper-container-desc', {
              slidesPerView: 1,
              spaceBetween: 30,
              loop: true,
              pagination: {
                el: '.swiper-pagination-esp',
                clickable: true,
              },
              navigation: {
                nextEl: '.swiper-button-next-esp',
                prevEl: '.swiper-button-prev-esp',
              },
            });

            if (element.style.display = "none") {
               element.style.display = "flex";
            }else{
               element.style.display = "none";
             }
          }
        };
        request.send(null);
}



var AreaDolor = {Cabeza:["Nariz", "Ojos", "Boca", "GeneralCabeza"], GeneralCuerpo:["Piel"], Pecho:["Pecho"], Estómago:["Estómago"]};

function change_photo(tipo){
    data="";
    for(datos in AreaDolor[tipo]){
      data +="<div style='height: 100px; ' onclick=\"getQuestions('"+AreaDolor[tipo][datos]+"', '"+tipo+"')\" class='swiper-slide tarjetas-opciones'>"+AreaDolor[tipo][datos]+"</div>";
    }
    document.getElementById("dolorEspecifico").innerHTML = data;
    document.getElementById("img_principal").setAttribute("src","imagenes/"+tipo+".jpg");
}

function getQuestions(tipo, area){
  getData(area,tipo);
}

function getData(area, areaEspecifica){
  console.log(area);
  console.log(areaEspecifica);
  var xmlhttp = new XMLHttpRequest();
  var url = "sources/catalogoPreguntas.json";

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(myArr);
    areaEspecifica = myArr.Preguntas.Cuerpo[area][areaEspecifica];
    console.log(areaEspecifica);
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
  if (cont == 15) {
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
