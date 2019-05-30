//usuario = [0, 0.2, 0.1, 0.3, 0.2, 0.9, 0, 0, 0, 0.8, 0.8, 0, 0.7, 0, 0, 0.3, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0]
function califica(tipoDiagnostico) {
    usuario = JSON.parse(localStorage.getItem("datosUsuario"));
    alergiasSeleccion = JSON.parse(localStorage.getItem("SeleccionAlergias"));
    bandera = false;
    for (i = 0; i < usuario.length; i++) {
        if (usuario[i] <= 0) {
            continue;
        }else{
            bandera = true;
            break;
        }
    }
    if(bandera){
        var matrizAlergias = [
            [0, 'Rinitis alérgica'], //hata llegar a 54 (total de sintomas).
            [1, 'Conjuntivitis'], //hata llegar a 54 (total de sintomas).
            [2, 'Dermatitis atópica'],
            [3, 'Dermatitis de contacto'],
            [4, 'Asma alérgico'],
            [5, 'Alergia a las mascotas'],
            [6, 'Alergia alimentaria'],
            [7, 'Alergia a medicamento'],
            [8, 'Alergia al moho'],
            [9, 'Alergia a los ácaros del polvo']
        ];
        var matrizAlergiasTexto = [
            [0, 'Rinitis alérgica'], //hata llegar a 54 (total de sintomas).
            [1, 'Conjuntivitis'], //hata llegar a 54 (total de sintomas).
            [2, 'Dermatitis atópica'],
            [3, 'Dermatitis de contacto'],
            [4, 'Asma alérgico'],
            [5, 'Alergia a las mascotas'],
            [6, 'Alergia alimentaria'],
            [7, 'Alergia a medicamento'],
            [8, 'Alergia al moho'],
            [9, 'Alergia a los ácaros del polvo']
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

                //llenar la matriz "matrizAlergias" en la posicion correspondiente con la calificacion correspondiente
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

                // Selecciona la funcion correspondiente al tipo de diagnostico.
                if (tipoDiagnostico == "general") {
                    diagnostico(matrizAlergias, usuario, matrizAlergiasTexto);
                } else {
                    diagnosticoEspecifico(matrizAlergias, usuario, alergiasSeleccion, matrizAlergiasTexto)
                }

            }

        }
    }else{
        alert('Puntua al menos un síntoma para generar un diagnóstico');
    }
}
