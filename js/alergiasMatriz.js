function generaMatriz(){
    var request = new XMLHttpRequest();
    request.open('GET', './sources/alergias.json');
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        var data = request.response;
        console.log(data);
        console.log(data['Alergias']['Alergia a las mascotas']['Sintomas']['Boca']['Picazón en la garganta']['Calificacion']);
        var body = data['Alergias']['Alergia a las mascotas']['Sintomas'];
        console.log(JSON.stringify(body.Boca));
    };
    //console.log(alergias.response);

var matrizAlergias = [];
var sintoma = 0;    
var calificacio = 0;

for (let i = 0; i < 10; i++) {
    matrizAlergias[i] = [];
    for (let x = 0; x < 53; x++) {
        calificacio = data;
        matrizAlergias[i][x] = 0;
    }
    
}



    // var matrizAlergias = [
    //     [0,[0.4],[0],[0.6],[0],[0.4],[0.7],[0.8]], //hata llegar a 54 (total de sintomas).
    //     [1,[0.6],[0.2],[0.9],[0.4],[0.7],[0.8]]  //hata llegar a 54 (total de sintomas).
    //     [2,[]],
    //     [3,[]],
    //     [4,[]],
    //     [5,[]],
    //     [6,[]],
    //     [7,[]],
    //     [8,[]],
    //     [9,]
    // ];


    // matrizAlergias[9].push([4]);

    console.log("this "+matrizAlergias[9]);
}