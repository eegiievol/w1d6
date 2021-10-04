/*

Bilguun Batnasan
Following script contains functionalities of ascii animator page

*/

window.onload = function() {
  "use strict";

  const sizes = {
    Tiny: "8pt",
    Small: "10pt",
    Medium: "12pt",
    Large: "14pt",
    "Extra Large": "16pt",
    XXL: "18pt",
  };

  const textArea = document.getElementById("text-area");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const animation = document.getElementById("animation");
  const size = document.getElementById("fontsize");
  const turbo = document.getElementById("turbo");

  textArea.style.fontSize = sizes.Medium;

  let currentAnim = ANIMATIONS["Blank"];
  let speed = 250;
  let animInd = 0;
  let animInterval;
  let previousText = "";

  function animate() {
    if (currentAnim.length > 0) {
      textArea.value = currentAnim[animInd++];
      animInd %= currentAnim.length;
    }
  }

  startBtn.onclick = function() {
    previousText = textArea.value;
    stopBtn.disabled = false;
    startBtn.disabled = true;
    if (currentAnim) {
      animInd = 0;
      animInterval = setInterval(animate, speed);
    } else textArea.value = "";
  };

  stopBtn.onclick = function() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(animInterval);
    textArea.value = previousText;
  };

  animation.onchange = function() {
    currentAnim = ANIMATIONS[animation.value].split("=====\n");
  };

  size.onchange = function() {
    if (textArea.style.fontSize !== sizes[size.value])
      textArea.style.fontSize = sizes[size.value];
  };

  turbo.onchange = function() {
    speed = speed == 250 ? 50 : 250;
    clearInterval(animInterval);
    animInterval = setInterval(animate, speed);
  };
};
