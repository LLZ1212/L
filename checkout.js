// 提交訂單
document.querySelector("#order-form").addEventListener("submit", function (e) {
  e.preventDefault(); // 阻止表單預設提交行為

  const name = document.querySelector("#name").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("購物車是空的！");
    return;
  }

  const orderId = "ORD" + Date.now(); // 簡單的訂單編號

  const data = {
    orderId,
    name,
    phone,
    address,
    items: cart
  };

  // 送出 POST 請求到 Google Apps Script
  fetch("https://script.google.com/macros/s/AKfycbxUgsxmXIDmBGoiHzggwoEN2iexJ1WIrDevXrAEbg671nmOwCVvuATm9oStDpoa6A8B/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(response => {
      alert("訂單已送出！");
      localStorage.removeItem("cart"); // 清空購物車
      window.location.href = "index.html"; // 回首頁
    })
    .catch(err => {
      console.error(err);
      alert("提交失敗，請稍後再試");
    });
});
