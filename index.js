import { Navi } from './navigation.js';
import { products } from './products.js';

const navBar = new Navi();

function generateProduct(product) {
    return `
    <tr class="product">
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
    </tr>
    `;
}

function showProducts() {
    products.forEach(product => {
        document.getElementById('list').insertAdjacentHTML("beforeend", generateProduct(product));
    });
}

showProducts();