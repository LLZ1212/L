// 從 Google Sheet API 取得商品資料
fetch("https://script.google.com/macros/s/AKfycbwBt2Jd3DkTvfAJvl3TfMCVX_ltvNJY5AKBjHzsdbCWFSgtM3BJAIXaYN-XjSJe6ECP/exec")
  .then(res => res.json()) // 將回應轉成 JSON 格式
  .then(products => {
    const container = document.querySelector("#product-list");

    // 遍歷每一個商品並產生 HTML
    products.forEach(product => {
      const item = document.createElement("div");
      item.className = "product";

      item.innerHTML = `
        <img src="${product.圖片連結}" />
        <h3>${product.商品名稱}</h3>
        <p>$${product.價格}</p>
        <button onclick="addToCart('${product.ID}')">加入購物車</button>
      `;

      container.appendChild(item);
    });
  });

// 加入購物車
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let found = cart.find(item => item.id === productId);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車！");
}
