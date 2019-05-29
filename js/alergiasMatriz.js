usuario = [0, 0.2, 0.1, 0.3, 0.2, 0.9, 0, 0, 0, 0.8, 0.8, 0, 0.7, 0, 0, 0.3, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0]

function califica(usuario) {
    var matrizAlergias = [
        [0], //hata llegar a 54 (total de sintomas).
        [1], //hata llegar a 54 (total de sintomas).
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
    ];

    //Rellena la matriz en las 53 posiciones con 0
    for (let i = 0; i < matrizAlergias.length; i++) {
        for (let x = 0; x < 55; x++) {
            matrizAlergias[i][x] = 0;
        }
    }

    //pedir el archivo alergias.json
    var request = new XMLHttpRequest();
    request.open('GET', './sources/alergias.json', true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var alergiasArray = JSON.parse(this.responseText);
            var alergias = alergiasArray['Alergias'];


            //Matriz para guardar las alergias y su ponderación
            var datos = [
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

            var acumulador = 0;

            //llenar la matriz "datos"
            for (let i = 0; i < Object.keys(alergias).length; i++) {
                var nameAlergia = Object.keys(alergias)[i];
                var arrayParteCuerpo = alergias[nameAlergia]['Sintomas'];

                for (let y = 0; y < Object.keys(arrayParteCuerpo).length; y++) {
                    var parteCuerpo = Object.keys(arrayParteCuerpo);
                    var sintomas = arrayParteCuerpo[parteCuerpo[y]];
                    var sintoma = Object.keys(arrayParteCuerpo[parteCuerpo[y]]);

                    for (let x = 0; x < sintoma.length; x++) {
                        datos[i][acumulador] = sintomas[sintoma[x]];
                        acumulador++;
                    }

                }
                acumulador = 0;
            }

            //llenar la matriz "matrizAlergias" en la posicion correspondiente con pa calificacion correspondiente
            let y = 1;
            var posicionCorrecta = 0;

            for (let i = 0; i < matrizAlergias.length; i++) {
                for (let x = 0; x < datos[i].length; x++) {
                    posicionCorrecta = datos[i][x].PreguntaId;
                    do {
                        if (y = posicionCorrecta) {
                            matrizAlergias[i][y] = datos[i][x].Calificacion;
                            break;
                        } else {
                            y++;
                        }
                    } while (y < 53);
                    y = 1;
                }
            }
            //imprime matriz "matrizAlergias"
            diagnostico(matrizAlergias, usuario);
        }

    }
}