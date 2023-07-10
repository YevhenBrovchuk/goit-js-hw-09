const btnStartEl=document.querySelector("button[data-start]")
const btnStopEl = document.querySelector("button[data-stop]")
const bodyEl=document.querySelector("body")
// console.dir(btnStartEl.textContent);
// console.dir(btnStopEl.textContent);
// bodyEl.style.backgroundColor = "teal";


btnStartEl.addEventListener("click",  handlerBodyColor)


function handlerBodyColor(evt)
{
    evt.target.disabled=true
    console.log(evt.target);
}