// 假設商品資料預先載入（或從 API 再抓一次）
let productList = {}; // 存放商品資料（ID 對應詳細資訊）

// 取得商品資料（這步驟也可以和 main.js 共用）
fetch("https://script.google.com/macros/s/AKfycbyEmDE3CV4-m5hH4iuEIkWTSc1-w7u4td5OCMScmXDLCAaCBZZ_s1y65y-QdSr9WX04/exec")
  .then(res => res.json())
  .then(products => {
    // 建立快速查表用的 ID => 商品資料
    products.forEach(p => productList[p.ID] = p);

    renderCart();
  });

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.querySelector("#cart-items");
  container.innerHTML = ""; // 清空

  let total = 0;

  cart.forEach(item => {
    const product = productList[item.id];
    const subtotal = product.價格 * item.qty;
    total += subtotal;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${product.商品名稱}</span>
      <span>數量：${item.qty}</span>
      <span>價格：$${subtotal}</span>
      <button onclick="removeFromCart('${item.id}')">移除</button>
    `;
    container.appendChild(row);
  });

  document.querySelector("#total").innerText = `總金額：$${total}`;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId); // 移除指定商品
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // 重新渲染
}
