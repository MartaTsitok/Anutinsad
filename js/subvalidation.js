document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();
    
    // Получаем значения полей
    const frequency = this.querySelector('[name="frequency"]').value.trim();
    const size = this.querySelector('[name="size"]').value.trim().toUpperCase();
    const address = this.querySelector('[name="address"]').value.trim();
    
    // Проверяем валидацию
    const errors = validateSubscription(frequency, size, address);
    
    if (errors.length > 0) {
        // Показываем ошибки
        showErrors(errors);
    } else {
        showSuccess('Подписка успешно оформлена! ожидайте доставку');
    }
});

function validateSubscription(frequency, size, address) {
    const errors = [];
    
    // Валидация частоты доставки
    const validFrequencies = ['1 раз в неделю', '2 раза в месяц', '3 раза в месяц'];
    if (!validFrequencies.includes(frequency)) {
        errors.push({
            field: 'frequency',
            message: 'Частота доставки должна быть: "1 раз в неделю", "2 раза в месяц" или "3 раза в месяц"'
        });
    }
    
    // Валидация размера букета
    const validSizes = ['S', 'M', 'L'];
    if (!validSizes.includes(size)) {
        errors.push({
            field: 'size',
            message: 'Размер букета должен быть: S, M или L'
        });
    }
    
    // Валидация адреса
    if (!/^г\.\s*Минск/i.test(address)) {
    errors.push({
      field: 'adres',
      message: 'Адрес должен начинаться с "г. Минск"'
    });
    
    }
    
    return errors;
}

function showErrors(errors) {
    const errorContainer = document.getElementById('errorMessagesSub');
    errorContainer.innerHTML = '';
    
    errors.forEach(error => {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = error.message;
        errorContainer.appendChild(errorElement);
        const field = document.querySelector(`[name="${error.field}"]`);
        if (field) {
            field.classList.add('input-error');
        }
    });
}

function showSuccess(message) {
    const errorContainer = document.getElementById('errorMessagesSub');
    errorContainer.innerHTML = '';
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    errorContainer.appendChild(successElement);
}

function clearErrors() {
    const errorContainer = document.getElementById('errorMessagesSub');
    errorContainer.innerHTML = '';
    document.querySelectorAll('.input-error').forEach(field => {
        field.classList.remove('input-error');
    });
}