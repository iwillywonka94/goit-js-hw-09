import Notiflix from 'notiflix';
const form = document.querySelector(".form")

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
  })
  promise.then(result => {Notiflix.Notify.success(result)}).catch(result => {Notiflix.Notify.failure(result)});
}

form.addEventListener("submit", e => {
  e.preventDefault();
  let delay = parseInt(form.delay.value)
  const step = parseInt(form.step.value)
  const amount = parseInt(form.amount.value)

  for(let i = 0; i < amount; i+= 1) {
    createPromise(i + 1, delay);
    delay += step
  }
})