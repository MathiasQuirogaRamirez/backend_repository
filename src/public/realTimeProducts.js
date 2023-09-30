const socketClient = io();

const productList = document.getElementById("products");
const form = document.getElementById("form");
const title = document.getElementById("title_id").value;
const description = document.getElementById("description_id").value;

form.onsubmit = (e) => {
    e.preventDefault();    
    socketClient.emit("addProduct", { title, description });
  };

socketClient.on("getProductsRealTime", (products) => {
    productList.innerHTML = `Products: ${products}`;
});