var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);
showSliderValue();
function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value /rangeSlider.max);
  var dom = document.getElementById('cont_derecho');
    console.log(bulletPosition);
  if (bulletPosition >= 0 && bulletPosition < (0.4)) {
      colorOne = "#42DB00";
      colorTwo = "#0CE829";
        orientation = "180deg";
        console.log("iuno");
        rangeBullet.innerHTML = "<i class='fa fa-smile-o' aria-hidden='true'></i>"
  } else if(bulletPosition >= 0.4 && bulletPosition < (0.7)){
        colorOne = "#E8B02C";
        colorTwo = "#F2CB13";
        orientation = "180deg";
        rangeBullet.innerHTML = "<i class='fa fa-meh-o' aria-hidden='true'></i>"
  }else if(bulletPosition >= 0.7 && bulletPosition <= (1)){
        colorOne = "#DB302A";
        colorTwo = "#F26327";
        orientation = "180deg";
       rangeBullet.innerHTML = "<i class='fa fa-frown-o' aria-hidden='true'></i>"
    }

    dom.style.backgroundImage = 'linear-gradient('
        + orientation + ', ' + colorOne + ', ' + colorTwo + ')';
  rangeBullet.style.left = (bulletPosition * 578) + "px";
}
