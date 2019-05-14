function ContenedorDefinicion() {
    element = document.getElementById("cont_descrip");
    if (element.style.display == "none") {
       element.style.display = "flex";
    }else{
       element.style.display = "none";
    }
}

function change_photo(tipo){
    console.log(tipo);
    document.getElementById("img_principal").setAttribute("src","imagenes/"+tipo+".jpg");
}