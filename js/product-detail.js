const urlParam = new URLSearchParams(window.location.search);
const productId = urlParam.get("id");

async function fetchProductDetail(){
    const container  = document.querySelector("#product-detail-container");

    if(!productId){
        container.innerHTML=`<p> Vui long chon 1 san pham</p>`;
        return;
    }

    container.innerHTML=`<p> Dang tai san pham</p>`;

    try{
        const reponse = await fetch(`https://fakestoreapi.com/products/${productId}`);

        if(!reponse.ok){
            container.innerHTML=`<p> Khong lay duoc chi tiet san pham</p>`;
            return ;
        }

        const product = await reponse.json();
        container.innerHTML = `
            <div class="col-12 col-md-6 text-center bg-white p-4 rounded-3 shadow-sm">
                <img src="${product.image}" alt="${product.title}" class="img-fluid" style="max-height: 400px; object-fit: contain;">
            </div>
            
            <div class="col-12 col-md-6">
                <span class="badge bg-secondary mb-2 text-uppercase">${product.category}</span>
                <h2 class="fw-bold text-dark mb-3">${product.title}</h2>
                
                <div class="fs-4 text-danger fw-bold mb-4">
                    Giá bán: $${product.price.toFixed(2)}
                </div>
                
                <h5 class="fw-semibold text-dark">Mô tả sản phẩm:</h5>
                <p class="text-muted mb-5" style="line-height: 1.7; text-align: justify;">
                    ${product.description}
                </p>
                
                <button class="btn btn-primary btn-lg w-100 btn-add rounded-3 shadow" data-id="${product.id}">
                    Thêm vào giỏ hàng
                </button>
            </div>
        `;


    }catch(error){
        container.innerHTML=`<p> Co loi say ra : ${error.message}`;
    }
}

fetchProductDetail();


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
    alert(" Đã thêm sản phẩm này vào giỏ hàng thành công từ trang chi tiết!");
}


const detailContainer = document.querySelector("#product-detail-container");

detailContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-add")) {
        
        const idToBuy = parseInt(e.target.dataset.id);
        
        addToCart(idToBuy);
    }
});

updateCartCount();