import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const btnStartEl=document.querySelector("button[data-start]")
const daysEl = document.querySelector("span[data-days]")
const hoursEl = document.querySelector("span[data-hours]")
const minutesEl = document.querySelector("span[data-minutes]")
const secondsEl=document.querySelector("span[data-seconds]")

btnStartEl.disabled = true;
btnStartEl.addEventListener("click", handlerStartTimer)


let dateFromUser;

flatpickr("#datetime-picker", {
enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose([selectedDates]) {
        dateFromUser = selectedDates;
        if (Date.now() > selectedDates) {
            btnStartEl.disabled = true;
         Notiflix.Notify.failure("Please choose a date in the future");
            return;
        }
        else {
            btnStartEl.disabled = false;
        }
  },})

function handlerStartTimer() {
    const idInterval = setInterval(() => {
        const resTimer = convertMs(dateFromUser - new Date.now())
        console.log(resTimer);
        if (resTimer.seconds >= 0) {
            createMarkupItems(resTimer)
            
        }
        else {
            clearInterval(idInterval)
        }
        
    }, 1000)
    
}

function createMarkupItems(res){
       daysEl.textContent = addNulNumber(res.days);
        hoursEl.textContent = addNulNumber(res.hours);
        minutesEl.textContent = addNulNumber(res.minutes);
        secondsEl.textContent = addNulNumber(res.seconds);
}

function addNulNumber(val) {
    return val.toString().padStart(2,"0")
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

