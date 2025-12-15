document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.searchinput');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchValue = this.value.trim();
                
                if (searchValue) {
                    window.location.href = 'error/error.html';
                } else {
                    alert('Введите поисковый запрос');
                    this.focus();
                }
            }
        });
        
        console.log('Обработчик добавлен к:', searchInput);
    } else {
        console.error('Элемент .searchinput не найден!');
    }
});