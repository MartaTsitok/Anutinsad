const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minuts = document.querySelector("#minuts");
const seconds = document.querySelector("#seconds");

let timerEnded = false;

function updateTimer() {
    const endDate = new Date().getFullYear();
    const nextYear = new Date(`February 14 ${endDate + 1} 00:00:00`);
    const currentTime = new Date();
    
    const diff = nextYear - currentTime;
    
    if (diff <= 0 && !timerEnded) {
        timerEnded = true;
        showSimpleAlert();
        return;
    }
    
    const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutsLeft = Math.floor(diff / 1000 / 60) % 60;
    const secondsLeft = Math.floor(diff / 1000) % 60;
    
    days.innerText = daysLeft < 10 ? '0' + daysLeft : daysLeft;
    hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
    minuts.innerText = minutsLeft < 10 ? '0' + minutsLeft : minutsLeft;
    seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
}

function showSimpleAlert() {
    // Проверяем, не показывали ли уже alert в этой сессии
    if (sessionStorage.getItem('timerAlertShown')) return;
    
    // Показываем alert один раз
    alert('⏰ Акция "14 февраля" завершена! Специальные предложения больше не доступны.');
    
    // Помечаем, что alert уже показан
    sessionStorage.setItem('timerAlertShown', 'true');
    
    // Останавливаем таймер
    days.innerText = '00';
    hours.innerText = '00';
    minuts.innerText = '00';
    seconds.innerText = '00';
}

// Запускаем таймер
updateTimer();
setInterval(updateTimer, 1000);