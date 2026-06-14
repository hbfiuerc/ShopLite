
const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", function(e) {
    e.preventDefault();


    const fullname = document.querySelector("#fullname").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    let isFormValid = true;

    const fullnameInput = document.querySelector("#fullname");
    if (fullname === "") {
        fullnameInput.classList.add("is-invalid"); 
        isFormValid = false;
    } else {
        fullnameInput.classList.remove("is-invalid"); 
        fullnameInput.classList.add("is-valid");     
    }
    const emailInput = document.querySelector("#email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (!emailRegex.test(email)) {
        emailInput.classList.add("is-invalid");
        isFormValid = false;
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }

    const passwordInput = document.querySelector("#password");
    if (password.length < 6) {
        passwordInput.classList.add("is-invalid");
        isFormValid = false;
    } else {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
    }
    if (isFormValid) {
        alert("🎉 Đăng ký tài khoản ShopLite thành công!");
        
    
        const newUser = { fullname, email, password };

    
        registerForm.reset();
        
    
        fullnameInput.classList.remove("is-valid");
        emailInput.classList.remove("is-valid");
        passwordInput.classList.remove("is-valid");
        window.location.href = "../index.html";
    }

});