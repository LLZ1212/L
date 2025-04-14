const API_URL = "https://script.google.com/macros/s/AKfycbwBt2Jd3DkTvfAJvl3TfMCVX_ltvNJY5AKBjHzsdbCWFSgtM3BJAIXaYN-XjSJe6ECP/exec";

// 顯示商品清單
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const productList = document.getElementById("product-list");
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${item.圖片}" alt="${item.商品名稱}">
        <h3>${item.商品名稱}</h3>
        <p>價格：$${item.價格}</p>
      `;
      productList.appendChild(div);
    });
  });

// 下單表單
document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((value, key) => obj[key] = value);

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.text())
    .then(msg => {
      document.getElementById("msg").textContent = "✅ 訂單已送出，感謝你的購買！";
      form.reset();
    })
    .catch(err => {
      document.getElementById("msg").textContent = "❌ 發送失敗，請稍後再試";
    });
});
