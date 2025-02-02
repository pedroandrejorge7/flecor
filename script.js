document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const messageElement = document.getElementById('message');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        const cartCount = cart.length;
        cartCountElement.textContent = cartCount;
    };

    const showMessage = (message) => {
        messageElement.textContent = message;
        setTimeout(() => {
            messageElement.textContent = '';
        }, 2000);
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.dataset.name;
            const productPrice = productElement.dataset.price;

            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showMessage(`${productName} foi adicionado ao carrinho!`);

            // Estilizando diretamente pelo JavaScript
            message.style.padding = "10px";
            message.style.margin = "20px 0";
            message.style.border = "1px solid #ccc";
            message.style.backgroundColor = "#f9f9f9";
            message.style.color = "#4caf50";
            message.style.display = "block";
            message.style.fontWeight = "600";
            message.style.fontSize = "16px";
            message.style.borderRadius = "5px";
            message.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        });
    });

    if (document.location.pathname.endsWith('cart.html')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price'); // Adicionado

        const updateTotalPrice = () => { // Adicionado
            const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('kz', '').replace('.', '')), 0);
            totalPriceElement.textContent = `Total: ${total.toLocaleString('pt-PT', { minimumFractionDigits: 0 })} Kz`;
        };

        const renderCart = () => {
            cartItemsContainer.innerHTML = '';
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    ${item.name} - ${item.price}
                    <button class="remove-item" data-index="${index}">Remover</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
            updateTotalPrice(); // Adicionado
        };

        renderCart();

        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
                updateTotalPrice(); // Adicionado
            }
        });

        const clearCartButton = document.getElementById('clear-cart');
        clearCartButton.addEventListener('click', () => {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
            updateTotalPrice(); // Adicionado
            showMessage('O carrinho foi limpo!');
        });

        const checkoutButton = document.getElementById('checkout');
        checkoutButton.addEventListener('click', () => {
            const message = cart.map(item => `${item.name}: ${item.price}`).join(', ');
            const whatsappLink = `https://wa.me/+244932599282?text=${encodeURIComponent('Quero comprar: ' + message)}`;
            window.location.href = whatsappLink;
        });
    }

    updateCartCount();
    if (document.location.pathname.endsWith('cart.html')) { // Adicionado
        const totalPriceElement = document.getElementById('total-price'); // Adicionado
        updateTotalPrice(); // Adicionado
    }
});
