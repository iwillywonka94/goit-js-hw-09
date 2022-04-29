import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const refs = {
    inputField: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('[data-start]'),
    counterDays: document.querySelector('[data-days]'),
    counterHours: document.querySelector('[data-hours]'),
    counterMinutes: document.querySelector('[data-minutes]'),
    counterSeconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

refs.buttonStart.setAttribute('disabled', '');
refs.buttonStart.addEventListener('click', onStartClickInit);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function (selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
        refs.buttonStart.setAttribute('disabled', '');
        return Notify.failure('Please choose a date in the future');
    }
        refs.buttonStart.removeAttribute('disabled');
        Notify.success(`Congratulations, You choose date in the future`);
        },
};

flatpickr('#datetime-picker', options);

function onStartClickInit() {
    timerId = setInterval(eventTimeCounter, 1000);
    refs.buttonStart.setAttribute('disabled', '');
}

function eventTimeCounter() {
    const date = new Date(refs.inputField.value);
    const convertedData = convertMs(date - Date.now());
    if (date < Date.now()) {
    clearInterval(timerId);
    refs.buttonStart.removeAttribute('disabled');
    return eventTimer();
    }
    timer(convertedData);
}

function timer(time = {days, hours, minutes, seconds}) {
    refs.counterDays.textContent = `${time.days}`;
    refs.counterHours.textContent = `${time.hours}`;
    refs.counterMinutes.textContent = `${time.minutes}`;
    refs.counterSeconds.textContent = `${time.seconds}`;
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}