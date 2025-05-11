// Initialize local storage tables if not already present
if (!localStorage.getItem("customers")) localStorage.setItem("customers", JSON.stringify([]));
if (!localStorage.getItem("orders")) localStorage.setItem("orders", JSON.stringify([]));
if (!localStorage.getItem("payments")) localStorage.setItem("payments", JSON.stringify([]));
if (!localStorage.getItem("products")) localStorage.setItem("products", JSON.stringify([]));

// Add product to cart
function addToCart(productId, productName, productCategory, productUrl, price, quantity = 1) {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const customerId = 1; // Assuming logged-in customer ID is 1 for simplicity
    const orderId = orders.length + 1;

    const newOrder = {
        orderId,
        customerId,
        productId,
        shipped: "No",
        delivered: "No",
        readyToFile: "No",
        quantity,
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    const products = JSON.parse(localStorage.getItem("products"));
    if (!products.find((product) => product.productId === productId)) {
        products.push({
            productId,
            productName,
            productCategory,
            productUrl,
            price,
        });
        localStorage.setItem("products", JSON.stringify(products));
    }

    alert(`${productName} added to cart!`);
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
