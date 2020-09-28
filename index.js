import { products } from './products.js'

function generateProduct(product) {
    return `
    <p id="name-price">${product.id}. ${product.name} ${product.price} - ${product.description}</p>
    `;
}

window.onload = function () {
    products.forEach(product => {
        document.getElementById('list').insertAdjacentHTML("beforeend", generateProduct(product));
    });
}