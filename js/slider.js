var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);
//
function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value/rangeSlider.max);
  var dom = document.getElementById('cont_derecho');
  if (bulletPosition >= 0 && bulletPosition < (0.4)) {
        // if (bulletPosition == 0) {colorOne = "#41BA2F";}
        // if (bulletPosition == 0.1) {colorOne = "#2EAE1B";}
        // if (bulletPosition == 0.2) {colorOne = "#0CA300";}
        // if (bulletPosition == 0.3) {colorOne = "#078500";}
        if (bulletPosition == 0) {colorOne = "#078500";}
        if (bulletPosition == 0.1) {colorOne = "#0CA300";}
        if (bulletPosition == 0.2) {colorOne = "#2EAE1B";}
        if (bulletPosition == 0.3) {colorOne = "#41BA2F";}
        colorTwo = "#096500";
        orientation = "180deg";
        rangeBullet.innerHTML = "<i class='fa fa-smile-o' aria-hidden='true'></i>"
  } else if(bulletPosition >= 0.4 && bulletPosition < (0.7)){
        if (bulletPosition == 0.4) {colorOne = "#FFD700";}
        if (bulletPosition == 0.5) {colorOne = "#FFEB00";}
        if (bulletPosition == 0.6) {colorOne = "#FFAD34";}
        colorTwo = "#FD6F01";
        orientation = "180deg";
        rangeBullet.innerHTML = "<i class='fa fa-meh-o' aria-hidden='true'></i>"
  }else if(bulletPosition >= 0.7 && bulletPosition <= (1)){
        if (bulletPosition == 1) {colorOne = "#8A0808";}
        if (bulletPosition == 0.9) {colorOne = "#AD0505";}
        if (bulletPosition == 0.8) {colorOne = "#CB0A0D";}
        if (bulletPosition == 0.7) {colorOne = "#F50B0C";}
        colorTwo = "#5F0304";
        orientation = "180deg";
       rangeBullet.innerHTML = "<i class='fa fa-frown-o' aria-hidden='true'></i>"
    }

    dom.style.backgroundImage = 'linear-gradient('
        + orientation + ', ' + colorOne + ', ' + colorTwo + ')';
  rangeBullet.style.left = (bulletPosition * 578) + "px";
}
