import Notiflix from 'notiflix';

const formEl = document.querySelector(".form")
let info = {}
formEl.addEventListener("submit", handleSubmit);

function handleSubmit(ev) {
  ev.preventDefault();
  const { elements: { delay, step, amount } } = ev.currentTarget;
  if (delay.value === "" || step.value === "" || amount.value === "") {
    Notiflix.Notify.failure("Please fill in all the fields!");
    return;
  }

  info.delay = Number(delay.value);
  info.step = Number(step.value);
  info.amount = Number(amount.value);
console.log(typeof info.delay);
  formEl.reset();
  
  for (let i = 0; i < info.amount; i += 1){
    const pos = i + 1;
    const current=info.delay+(i*info.step)
       createPromise(pos, current)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
     
  }
 

}







function createPromise(position, delay) {
const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      
      if (shouldResolve) {
    res({position, delay})
  } else {
    rej({position, delay})
  }
    }, delay)
    
  
  })
   
}
