function renderProduct(dataList){
    const productsGrid = document.querySelector("#product-grid");
    
    if(!dataList || dataList.length==0){
        productsGrid.innerHTML=`
            <h3>Khong tim thay san pham nao</h3>
        `
        return;
    }

    const htmlCards = dataList.map(product =>{
        const discount  = Math.floor(Math.random()*15+5);

        return `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                    
                    <div class="position-relative p-3 bg-white text-center" style="min-height: 220px; display: flex; align-items: center; justify-content: center;">
                        <span class="badge bg-danger text-white d-inline-flex position-absolute top-0 start-0 mt-2 ms-2 px-3 py-2 rounded-2 shadow-sm">
                            - ${discount}%
                        </span>
                        <img src="${product.image}" class="card-img-top img-fluid" alt="${product.title}" style="max-height: 180px; object-fit: contain;">
                    </div>

                    <div class="card-body d-flex flex-column bg-white border-top">
                        <h6 class="card-title fw-bold text-dark text-truncate" title="${product.title}">
                            <a href="/pages/product.html?id=${product.id}" class="text-decoration-none text-dark">
                                ${product.title}
                            </a>    
                        </h6>
                        
                        <span class="badge bg-secondary mb-3 align-self-start text-uppercase small">${product.category}</span>
                        
                        <p class="card-text text-muted flex-grow-1 small text-truncate-3" style="line-height: 1.5;">
                            ${product.description}
                        </p>
                        
                        <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                            <span class="text-danger class-price fw-bold fs-5">$${product.price.toFixed(2)}</span>
                            
                            <button class="btn btn-primary btn-sm btn-add px-3 rounded-2" data-id="${product.id}">
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("");

    productsGrid.innerHTML = htmlCards;
}


async function fetchProductsFromAPI(params) {
    const productGrid = document.querySelector("#product-grid");

    productGrid.innerHTML = `
        <p> Dang tai san pham</p>
    `
    try{
        const respone = await fetch("https://fakestoreapi.com/products");

        if(!respone.ok){
            throw new Error(`Loi khi lay du lieu: ${respone.status}`)
        }

        const jsonProduct = await respone.json();

        renderProduct(jsonProduct);
    }catch(error){
        console.error("Loi du lieu: "+ error);

        productGrid.innerHTML = `
            <p> Loi du lieu: ${error.message}</p>
        `
    }
}
fetchProductsFromAPI();


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

function addToCart(productId) {
    let cart = getCart();
    
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; 
    } else {

        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("shoplite_cart", JSON.stringify(cart));
    
    updateCartCount();
    alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
}
const productsGridContainer = document.querySelector("#product-grid");

productsGridContainer.addEventListener("click", function(e) {

    if (e.target.classList.contains("btn-add")) {
        
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
    }
});

updateCartCount();