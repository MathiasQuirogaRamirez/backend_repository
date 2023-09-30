const socketClient = io();

const productList = document.getElementById("products");

socketClient.on("getProducts", (products) => {
    productList.innerHTML = `Products: ${products}`;
});

