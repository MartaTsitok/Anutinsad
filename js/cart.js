
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    setupEventListeners();
    updateCartCounter();
});

// Ключ для Local Storage (одинаковый на всех страницах)
const CART_STORAGE_KEY = 'cart';

// Функция получения корзины
function getCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) return {};
    
    try {
        return JSON.parse(cartData);
    } catch (error) {
        console.error('Ошибка парсинга корзины:', error);
        return {};
    }
}

// Функция сохранения корзины
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCounter();
}

// Функция отображения товаров в корзине
function displayCartItems() {
    const cart = getCart();
    const productsGrid = document.getElementById('products');
    
    if (!productsGrid) return;
    
    // Если корзина пуста
    if (Object.keys(cart).length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-cart">
                <h2>Корзина пуста</h2>
                <p>Добавьте товары из каталога</p>
                <a href="/catalog.html" class="btn">Перейти в каталог</a>
            </div>
        `;
        return;
    }
    
    let html = '';
    let totalAmount = 0;
    let totalItems = 0;
    
    // Преобразуем объект в массив для отображения
    const cartArray = Object.values(cart);
    
    cartArray.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        totalItems += item.quantity;
        
        html += `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image || '/img/default-product.jpg'}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-size">Размер: ${item.size || 'стандартный'}</p>
                <p class="cart-item-price">Цена: ${item.price} руб.</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" onclick="changeQuantity('${item.id}', -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>
            <div class="cart-item-total">
                <p class="total-price">${itemTotal} руб.</p>
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
            </div>
        </div>`;
    });
    
    // Добавляем итоговую информацию
    html += `
    <div class="cart-summary">
        <div class="summary-info">
            <p>Товаров: ${totalItems} шт.</p>
            <p>Общая сумма: <strong>${totalAmount} руб.</strong></p>
        </div>
        <button class="checkout-btn" onclick="checkout()">Оформить заказ</button>
    </div>`;
    
    productsGrid.innerHTML = html;
}

// Функция изменения количества товара
function changeQuantity(productId, change) {
    const cart = getCart();
    
    if (cart[productId]) {
        const newQuantity = cart[productId].quantity + change;
        
        if (newQuantity < 1) {
            // Удаляем товар, если количество стало меньше 1
            removeFromCart(productId);
        } else {
            // Обновляем количество
            cart[productId].quantity = newQuantity;
            saveCart(cart);
            displayCartItems();
        }
    }
}

// Функция удаления товара из корзины
function removeFromCart(productId) {
    const cart = getCart();
    
    if (cart[productId]) {
        if (confirm(`Удалить "${cart[productId].name}" из корзины?`)) {
            delete cart[productId];
            saveCart(cart);
            displayCartItems();
        }
    }
}

// Функция обновления счетчика товаров
function updateCartCounter() {
    const cart = getCart();
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    
    // Обновляем счетчик в хедере
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
    
    // Также можно обновить в других местах страницы
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
    
    return totalItems;
}

// Функция оформления заказа
function checkout() {
    const cart = getCart();
    
    if (Object.keys(cart).length === 0) {
        alert('Корзина пуста!');
        return;
    }

    alert(`Заказ оформлен! Сумма: ${calculateTotal()} руб.`);
    
    // Очищаем корзину после оформления
    localStorage.removeItem(CART_STORAGE_KEY);
    displayCartItems();
    updateCartCounter();
}

// Функция расчета общей суммы
function calculateTotal() {
    const cart = getCart();
    return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Очистка корзины
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Очистить всю корзину?')) {
                localStorage.removeItem(CART_STORAGE_KEY);
                displayCartItems();
                updateCartCounter();
            }
        });
    }
}

// Функция для добавления товара (используется на странице каталога)
function addToCart(productId) {

}

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCart,
        saveCart,
        updateCartCounter,
        addToCart
    };
}