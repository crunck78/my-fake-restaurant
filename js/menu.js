import { Backend } from "../smallest_backend_ever/mini_backend.js";

export class Menu {
    static #products;
    static #list;
    static #menu;
    static #menu_anchor;

    /**
     * TODO HANDLE ERROR
     */
    static async init() {
        Menu.#list = document.getElementById('list');
        Menu.#menu = document.getElementById("tageskarte");
        Menu.#menu_anchor = document.getElementById("tageskarte-link");

        await Backend.init("./smallest_backend_ever");
        Menu.#products = Backend.getItem("products");
        
        Menu.#showProducts();
        Menu.#showTagesKarte();
    }

    static #generateProduct(product) {
        return `
        <tr class="product">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
        </tr>
        `;
    }

    static #showProducts() {
        Menu.#products.forEach((product) => {
            Menu.#list.insertAdjacentHTML("beforeend", Menu.#generateProduct(product));
        });
    }

    static #hideTagesKarte() {
        Menu.#menu.classList.add("d-none");
        Menu.#menu_anchor.classList.add("d-none");
    }

    static #showTagesKarte() {
        Menu.#menu_anchor.classList.remove("d-none");
        Menu.#menu.classList.remove("d-none");
    }
}