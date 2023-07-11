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

  info.delay = delay.value;
  info.step = step.value;
  info.amount = amount.value;

  formEl.reset();
  setTimeout(() => {
  for (let i = 0; i < info.amount; i += 1){
       createPromise(i, info.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
  }
 }, info.delay)

}







function createPromise(position, delay) {
const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    
      if (shouldResolve) {
    res({position, delay})
  } else {
    rej({position, delay})
  }
  
  })
   
}
