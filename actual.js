document.addEventListener('DOMContentLoaded', function(){
    loadActual();
});

function loadActual(){
    fetch('/actual.json')
    .then(response => response.json())
    .then(data =>{
        console.log('Данные загружены:', data);
        showProducts(data);
    })
    .catch(error => {
        console.error('Ошибка загрузки JSON', error);
        document.getElementById('actual-cards').innerHTML = '<p>Товары не загрузились :(</p>'
    });
}