
function diagnosticoEspecifico(alergias, sintomasUser, alergiasSeleccion,alergiasTexto) {
  console.log(alergias);
  var auxMasAlto = [];
  var auxSumaAlergias = [];
  var suma;
  var aux;
  var sumaAlergias;

    // obtener las alergias para diagnostico especifico
    var indiceCarly = 0;
    // var auxAlergia = new Array(alergiasSeleccion.length);
    // var auxSintomas = new Array(alergiasSeleccion.length);
    // var newAlergias = new Array(alergiasSeleccion.length);

    var auxAlergia =[];
    var auxSintomas = [];
    var newAlergias = [];

    for (var i = 0; i < alergiasSeleccion.length; i++) {
      // if (i == 0) {
      //   newAlergias[i]=alergias[indiceCarly]
      // }
      indiceCarly = alergiasSeleccion[i];
      newAlergias[i] = alergias[indiceCarly];
      auxAlergia[i] = [];
      auxSintomas[i] = [];
    }

    console.log(newAlergias);
    console.log(auxAlergia);
    console.log(auxSintomas);
    //Obtener el mínimo de el cruce de síntomas de usuario y síntomas de cada alergia
    for (let i = 0; i < newAlergias.length; i++) {
        for (let j = 1; j <= newAlergias[i].length; j++) {
            if (sintomasUser[j] <= newAlergias[i][j]) {
                auxSintomas[i].push(sintomasUser[j]);
            } else {
                auxSintomas[i].push(newAlergias[i][j]);
            }
        }
    }

    //Obtener la suma de cada mínimo por alergia/usuario
    for (let i = 0; i < auxSintomas.length; i++) {
        suma = 0;
        for (let j = 1; j < auxSintomas[i].length-1; j++) {
            suma += parseFloat(auxSintomas[i][j]);
        }
        auxAlergia[i].push(suma);
    }

    //Se obtienen los valores máximos de cada cruce
    for (let i = 0; i < auxAlergia.length; i++) {
        auxMasAlto.push(auxAlergia[i].pop());
    }

    //Retorna el valor más alto
    valorMasAlto = 0;
    for (var i = 0; i < auxMasAlto.length; i++) {
      if (valorMasAlto > auxMasAlto[i]) {
        continue;
      }else {
        valorMasAlto = auxMasAlto[i];
      }

    }
    console.log(valorMasAlto);

    //Se obtiene la suma de cada alergia (según sus síntomas)
    for (let i = 0; i < newAlergias.length; i++) {
        sumaAlergias = 0;
        for (let j = 1; j <= newAlergias[i].length-1; j++) {
            sumaAlergias += parseFloat(newAlergias[i][j]);
        }
        auxSumaAlergias.push(sumaAlergias);
    }

    // console.log(auxSumaAlergias);
    // console.log(newAlergias);
    //Se compara el valor más alto del usuario con las newAlergias
    var kk=0;
    for (var i = 0; i < auxSumaAlergias.length; i++) {
      if (kk > auxSumaAlergias[i]) {
        continue;
      }else {
        kk = auxSumaAlergias[i];
      }

    }
    arregloResultado = [];
    posicionResultados = [];
    for (let i = 0; i < auxSumaAlergias.length; i++) {
      arregloResultado[i]="Hay un " + (parseFloat(parseFloat(valorMasAlto) * 100) / parseFloat(auxSumaAlergias[i])).toFixed(2) + "% de posibilidad de tener " + alergiasTexto[alergiasSeleccion[i]][1];
      posicionResultados[i]=alergiasSeleccion[i];
    }
    ContenedorDefinicionEspecifico(posicionResultados,arregloResultado);

}
