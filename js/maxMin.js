
function diagnostico(alergias, sintomasUser, tipoDiagnostico) {
  var auxSintomas = [
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9]
  ];
  var auxAlergia = [
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9]
  ];
  var auxMasAlto = [];
  var auxSumaAlergias = [];
  var suma;
  var aux;
  var sumaAlergias;
  
    //Obtener el mínimo de el cruce de síntomas de usuario y síntomas de cada alergia
    for (let i = 0; i < alergias.length; i++) {
        for (let j = 1; j <= alergias[i].length; j++) {
            if (sintomasUser[j] <= alergias[i][j]) {
                auxSintomas[i].push(sintomasUser[j]);
            } else {
                auxSintomas[i].push(alergias[i][j]);
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
    console.log(valorMasAlto + ": valor mas alto");

    //Se obtiene la suma de cada alergia (según sus síntomas)
    for (let i = 0; i < alergias.length; i++) {
        sumaAlergias = 0;
        for (let j = 1; j <= alergias[i].length-1; j++) {
            sumaAlergias += parseFloat(alergias[i][j]);
        }
        auxSumaAlergias.push(sumaAlergias);
    }

    // console.log(auxSumaAlergias);
    // console.log(alergias);
    //Se compara el valor más alto del usuario con las alergias
    var kk=0;
    for (var i = 0; i < auxSumaAlergias.length; i++) {
      if (kk > auxSumaAlergias[i]) {
        continue;
      }else {
        kk = auxSumaAlergias[i];
      }

    }
    console.log(auxSumaAlergias + " suma alergas");
    for (let i = 0; i < auxSumaAlergias.length; i++) {
        if(auxSumaAlergias == valorMasAlto){
            // console.log(alergias[i][0]);
        }else{
            // kk = Math.max.apply(Math, auxSumaAlergias);
            console.log("Hay un " + (parseFloat(parseFloat(valorMasAlto) * 100) / parseFloat(auxSumaAlergias[i])).toFixed(2) + "% de posibilidad de tener " + sintomasUser[0])
            break;
        }
    }

}
