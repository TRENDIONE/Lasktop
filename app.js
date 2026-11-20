import "https://esm.sh/metallicss@4.0.3";

const cart = [];
const cartCount = document.querySelector("#cartCount");
const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const cartSubtotal = document.querySelector("#cartSubtotal");
const overlay = document.querySelector("#overlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("open");
}

function renderCart() {
  cartCount.textContent = String(cart.length);
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your basket is empty.</p>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-row">
        <div class="cart-thumb">MV</div>
        <div><p>${item.name}</p><small>£${item.price.toFixed(2)} × 1</small></div>
        <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name}">×</button>
      </div>`).join("");
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartSubtotal.textContent = `£${total.toFixed(2)}`;
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    cart.push({ name: card.dataset.name, price: Number(card.dataset.price) });
    renderCart();
    openCart();
    button.textContent = "✓";
    setTimeout(() => { button.textContent = "+"; }, 900);
  });
});

document.querySelectorAll(".wish-button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
  });
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
  });
});

cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-item");
  if (!removeButton) return;
  cart.splice(Number(removeButton.dataset.index), 1);
  renderCart();
});

document.querySelector("#cartButton").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

const searchDialog = document.querySelector("#searchDialog");
document.querySelector("#searchButton").addEventListener("click", () => {
  searchDialog.showModal();
  setTimeout(() => document.querySelector("#searchInput").focus(), 50);
});

const header = document.querySelector(".header");
const onScroll = () => {
  header.style.position = window.scrollY > 34 ? "sticky" : "relative";
  header.style.top = window.scrollY > 34 ? "0" : "auto";
  header.style.zIndex = "50";
  header.style.boxShadow = window.scrollY > 34 ? "0 8px 30px rgba(28,32,24,.07)" : "none";
};
window.addEventListener("scroll", onScroll, { passive: true });
