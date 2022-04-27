const body = document.querySelector("body")
const buttonStart = document.querySelector("button[data-start]")
const buttonStop = document.querySelector("button[data-stop]")
let intervalId = null
buttonStart.addEventListener("click", clickOnButtonStart)
buttonStop.addEventListener("click", clickOnButtonStop)

function clickOnButtonStart (evt) {
    evt.target.setAttribute("disabled", "")
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 500)
}
function clickOnButtonStop (evt) {
    buttonStart.removeAttribute("disabled");
    clearInterval(intervalId);
}
function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }