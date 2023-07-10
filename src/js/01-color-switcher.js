const btnStartEl=document.querySelector("button[data-start]")
const btnStopEl = document.querySelector("button[data-stop]")
const bodyEl=document.querySelector("body")

btnStartEl.addEventListener("click", handlerBodyColor)
btnStopEl.addEventListener("click", handlerStopBodyColor)
window.addEventListener("load", isHistory)
let timerId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function isHistory() {
    btnStopEl.disabled=true
}

function handlerBodyColor(evt)
{
    switchDisabled(evt.target, btnStopEl)
     timerId = setInterval(() => {bodyEl.style.backgroundColor=getRandomHexColor() },1000)
}

function handlerStopBodyColor(evt) {
    switchDisabled(evt.target, btnStartEl)
    clearInterval(timerId);
}
function switchDisabled(evt, btn) {
    if (evt.disabled === false) {
        evt.disabled = true;
        btn.disabled = false;
    }
}