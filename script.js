// Initialize local storage tables if not already present
if (!localStorage.getItem("customers")) {
    localStorage.setItem("customers", JSON.stringify([]));
}
if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
}
if (!localStorage.getItem("payments")) {
    localStorage.setItem("payments", JSON.stringify([]));
}
if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify([
        { productId: 1, productName: "Employee Tax Return", productCategory: "Tax Service", productUrl: "https://example.com/employee-tax-return", price: 200, icon: "briefcase" },
        { productId: 2, productName: "Withholding Tax", productCategory: "Tax Service", productUrl: "https://example.com/withholding-tax", price: 250, icon: "calculator" },
        { productId: 3, productName: "Nil Return", productCategory: "Tax Service", productUrl: "https://example.com/nil-return", price: 100, icon: "document" },
        { productId: 4, productName: "Tax Compliance", productCategory: "Tax Service", productUrl: "https://example.com/tax-compliance", price: 100, icon: "check-circle" }
    ]));
}

// Show toast message
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Add animation to button
function animateButton(button) {
    button.classList.add("animate-bounce");
    setTimeout(() => button.classList.remove("animate-bounce"), 500);
}

// Add product to cart
function addToCart(productId, button) {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const products = JSON.parse(localStorage.getItem("products"));
    const product = products.find((p) => p.productId === productId);

    if (!product) {
        alert("Product not found!");
        return;
    }

    const customerId = 1; // Assuming logged-in customer ID is 1 for simplicity
    const orderId = orders.length + 1;

    const newOrder = {
        orderId,
        customerId,
        productId,
        shipped: "No",
        delivered: "No",
        readyToFile: "No",
        quantity: 1,
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Animate the button
    button.classList.add("animate-bounce");
    setTimeout(() => button.classList.remove("animate-bounce"), 500);

    showToast(`${product.productName} added to cart!`);
}

// Render cart items
function renderCart() {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const products = JSON.parse(localStorage.getItem("products"));
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");

    cartList.innerHTML = "";
    let total = 0;

    orders.forEach((order) => {
        const product = products.find((p) => p.productId === order.productId);
        if (product) {
            total += product.price * order.quantity;
            cartList.innerHTML += `
                <div class="flex justify-between items-center border-b py-4">
                  <div>
                    <p class="font-semibold">${product.productName}</p>
                    <p class="text-sm text-gray-500">KES ${product.price} x ${order.quantity}</p>
                  </div>
                  <button
                    class="text-red-500 text-sm"
                    onclick="removeFromCart(${order.orderId})"
                  >
                    Remove
                  </button>
                </div>
            `;
        }
    });

    cartTotal.textContent = `Total: KES ${total}`;
}

// Remove item from cart
function removeFromCart(orderId) {
    let orders = JSON.parse(localStorage.getItem("orders"));
    orders = orders.filter((order) => order.orderId !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderCart();
}
