const products = [
    { id: 1, name: "Shirt", price: 2000},
    { id: 2, name: "Bat", price: 1500 },
    { id: 3, name: "Shoes", price: 4000 },
    {id : 4, name : "T-Shirts", price : 1000}
];

let cart = []; // { id, name, price, qty }

const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");

// Products only need to be drawn once
productsEl.innerHTML = products
    .map(
        (a) => `
        <div class="card">
            <div>${a.name}</div>
            <div>₹${a.price.toFixed(2)}</div>
            <button data-id="${a.id}">Add to cart</button>
        </div>
    `
    )
    .join("");

function renderCart() {
    cartEl.innerHTML = cart
        .map(
            (item) => `
            <li data-id="${item.id}">
                <span class="name">${item.name}</span>
                <button class="qty-btn minus">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn plus">+</button>
                <span>$${(item.price * item.qty).toFixed(2)}</span>
            </li>
        `
        )
        .join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    totalEl.textContent = `₹${total.toFixed(2)}`;
}

// Add to cart
productsEl.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        const p = products.find((p) => p.id === id);
        cart.push({ ...p, qty: 1 });
    }

    renderCart();
});

// Change quantity (removes the item when qty hits 0)
cartEl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);
    const item = cart.find((i) => i.id === id);

    if (e.target.classList.contains("plus")) item.qty++;
    if (e.target.classList.contains("minus")) item.qty--;

    cart = cart.filter((i) => i.qty > 0); // drop empty items
    renderCart();
});

renderCart();