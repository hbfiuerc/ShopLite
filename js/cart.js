
function getCart() {
    const cart = localStorage.getItem("shoplite_cart");
    return cart ? JSON.parse(cart) : [];
}

async function displayCart() {
    const tbody = document.querySelector("#cart-table-body");
    const subtotalEl = document.querySelector("#cart-subtotal");
    const totalEl = document.querySelector("#cart-total");
    const cart = getCart();

    if (cart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Giỏ hàng của bạn đang trống rỗng.</td></tr>`;
        subtotalEl.textContent = "$0.00";
        totalEl.textContent = "$0.00";
        return;
    }

    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const allProducts = await response.json();

        let totalCartMoney = 0;

        const trRows = cart.map(cartItem => {
            const originalProduct = allProducts.find(p => p.id === cartItem.id);
            
            if (!originalProduct) return "";

            const itemTotalMoney = originalProduct.price * cartItem.quantity;
            totalCartMoney += itemTotalMoney; 

            return `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${originalProduct.image}" alt="" style="width: 50px; height: 50px; object-fit: contain;" class="me-3">
                            <span class="fw-semibold text-dark text-truncate d-inline-block" style="max-width: 200px;">${originalProduct.title}</span>
                        </div>
                    </td>
                    <td>$${originalProduct.price.toFixed(2)}</td>
                    <td>
                        <span class="badge bg-light text-dark border p-2 px-3 fs-6">${cartItem.quantity}</span>
                    </td>
                    <td class="fw-bold text-dark">$${itemTotalMoney.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger btn-remove" data-id="${cartItem.id}">Xóa</button>
                    </td>
                </tr>
            `;
        }).join("");

        tbody.innerHTML = trRows;
        subtotalEl.textContent = `$${totalCartMoney.toFixed(2)}`;
        totalEl.textContent = `$${totalCartMoney.toFixed(2)}`;

    } catch (error) {
    }
}

document.querySelector("#cart-table-body").addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-remove")) {
        const idToRemove = parseInt(e.target.dataset.id);
        let cart = getCart();
        

        cart = cart.filter(item => item.id !== idToRemove);
        
        localStorage.setItem("shoplite_cart", JSON.stringify(cart));
        displayCart();
        
        if(typeof updateCartCount === 'function') updateCartCount();
    }
});

displayCart();

function getCart() {
    const cart = localStorage.getItem("shoplite_cart");

    return cart ? JSON.parse(cart) : [];
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    

    const badge = document.querySelector("#cart-count");
    if (badge) {
        badge.textContent = totalItems; 
    }
}

updateCartCount();