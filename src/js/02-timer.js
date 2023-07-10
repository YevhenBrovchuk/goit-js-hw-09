import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const flatpickr = require("flatpickr");
const btnStartEl=document.querySelector("button[data-start]")
const daysEl = document.querySelector("span[data-days]")
const hoursEl = document.querySelector("span[data-hours]")
const minutesEl = document.querySelector("span[data-minutes]")
const secondsEl=document.querySelector("span[data-seconds]")

btnStartEl.disabled = true;
btnStartEl.addEventListener("click", handlerStartTimer)

const currentDate = new Date();
let dateFromUser;


flatpickr("#datetime-picker", {
enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        dateFromUser = selectedDates[0];
        if (currentDate > dateFromUser) {
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
        }
        else {
            btnStartEl.disabled = false;
        }
  },})

function handlerStartTimer() {
    const idInterval = setInterval(() => {
        
        const resTimer = convertMs(dateFromUser - new Date())
        console.log(resTimer);
        if (resTimer.seconds >= 0) {
            daysEl.textContent = resTimer.days.toString().padStart(2,"0");
        hoursEl.textContent = resTimer.hours.toString().padStart(2,"0");
        minutesEl.textContent = resTimer.minutes.toString().padStart(2,"0");
        secondsEl.textContent = resTimer.seconds.toString().padStart(2,"0");
        }
        else {
            clearInterval(idInterval)
        }
    }, 1000)
    
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

