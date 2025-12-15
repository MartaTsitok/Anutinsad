// cart-common.js - общие функции для работы с корзиной
const CART_STORAGE_KEY = 'cart';

// Универсальная функция добавления в корзину
function addToCart(productData) {
    const cart = getCart();
    
    const productId = productData.id;
    
    if (cart[productId]) {
        // Увеличиваем количество, если товар уже есть
        cart[productId].quantity += productData.quantity || 1;
    } else {
        // Добавляем новый товар
        cart[productId] = {
            id: productData.id,
            name: productData.name,
            size: productData.size,
            price: productData.price,
            quantity: productData.quantity || 1,
            image: productData.image,
            addedAt: new Date().toISOString()
        };
    }
    
    saveCart(cart);
    
    // Показываем уведомление
    showNotification(`${productData.name} добавлен в корзину!`);
    
    return cart;
}

// Функция получения корзины
function getCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : {};
}

// Функция сохранения корзины
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCounter();
}

// Функция обновления счетчика (работает на всех страницах)
function updateCartCounter() {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    
    // Обновляем все счетчики на странице
    document.querySelectorAll('.cart-counter, .cart-count, #cart-counter').forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
    
    return totalItems;
}

// Показ уведомления
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <a href="/cart.html" class="view-cart-btn">Перейти в корзину</a>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Инициализация счетчика при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
});