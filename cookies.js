document.getElementById('registration').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this); 
    const fio = formData.get('fio');
    const email = formData.get('email');
    document.cookie = `ФИО=${fio}; max-age=2592000`; 
    document.cookie = `Почта=${email}; max-age=2592000`; 
    console.log('Данные из формы регистрации:', document.cookie);
});