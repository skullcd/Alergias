function diagnostico(alergias, sintomasUser, alergiasTexto) {
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
  var sumaAlergias;

  //Obtener el mínimo de el cruce de síntomas de usuario y síntomas de cada alergia SACA EL MINIMO
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
    for (let j = 1; j < auxSintomas[i].length - 1; j++) {
      suma += parseFloat(auxSintomas[i][j]);
    }
    auxAlergia[i].push(suma);
  }

  //Se obtienen los valores máximos de cada cruce
  for (let i = 0; i < auxAlergia.length; i++) {
    auxMasAlto.push(auxAlergia[i].pop());
  }

  console.log(auxMasAlto)

  //Retorna el valor más alto
  valorMasAlto = 0;
  for (var i = 0; i < auxMasAlto.length; i++) {
    if (valorMasAlto > auxMasAlto[i]) {
      continue;
    } else {
      valorMasAlto = auxMasAlto[i];
    }

  }

  //Se obtiene la suma de cada alergia (según sus síntomas)
  for (let i = 0; i < alergias.length; i++) {
    sumaAlergias = 0;
    for (let j = 1; j <= alergias[i].length - 1; j++) {
      sumaAlergias += parseFloat(alergias[i][j]);
    }
    auxSumaAlergias.push(sumaAlergias);
  }
  console.log(valorMasAlto);
  console.log(auxSumaAlergias);

  //Se compara el valor más alto del usuario con las alergias
  // var kk = 0;
  // for (var i = 0; i < auxSumaAlergias.length; i++) {
  //   if (kk > auxSumaAlergias[i]) {
  //     continue;
  //   } else {
  //     kk = auxSumaAlergias[i];
  //   }

  // }
  // console.log(auxSumaAlergias);
  // console.log(valorMasAlto);
  minimo = 0;
  maximo = 0;

  var consulta1 = auxSumaAlergias.filter(function (c) {
    return c > valorMasAlto;
  });
  var consulta2 = auxSumaAlergias.filter(function (c) {
    return c < valorMasAlto;
  });
    minimo = Math.abs(valorMasAlto - Math.min.apply(Math, consulta2));
  maximo = Math.abs(valorMasAlto - Math.min.apply(Math, consulta1));
  valorFinal = 0;
  if (minimo < maximo) {
    valorFinal = minimo;
  } else {
    valorFinal = maximo;
  }
  posicionFinalAlergia = null;

  // for (var i = 0; i < auxSumaAlergias.length; i++) {
  // }

  // console.log(posicionFinalAlergia);
  for (let i = 0; i < auxSumaAlergias.length; i++) {
    if (auxSumaAlergias[i] == valorFinal + valorMasAlto) {
      posicionFinalAlergia = i;
      if (auxSumaAlergias[i] == valorMasAlto) {
        console.log("tienes: " + alergiasTexto[posicionFinalAlergia][1])
      } else {
          localStorage.setItem("imgResultado", posicionFinalAlergia);
          ContenedorDefinicion("Hay un " + (parseFloat(parseFloat(valorMasAlto) * 100) / parseFloat(auxSumaAlergias[i])).toFixed(2) + "% de posibilidad de tener " + alergiasTexto[posicionFinalAlergia][1]);
        // kk = Math.max.apply(Math, auxSumaAlergias);
      }
    }
  }

}
