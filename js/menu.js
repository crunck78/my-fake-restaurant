export class Menu {
    static #products;
    static #list;
    static #menu;
    static #menu_anchor;

    /**
     * TODO HANDLE ERROR
     */
    static async init(products, editable = false) {
        Menu.#list = document.getElementById('list');
        Menu.#menu = document.getElementById("tageskarte");
        Menu.#menu_anchor = document.getElementById("tageskarte-link");
        Menu.#products = products;
        if(editable)
            Menu.#showProductsEditable();
        else
            Menu.#showProducts();
        Menu.#showTagesKarte();
    }

    static addNewProduct( product ){
        Menu.#products.push( product );
    }

    static getProducts(){
        return Menu.#products;
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

    /**
     * Generates tr product data for tbody, editProduct declared and set to Menu.editProduct
     * @param {obj} product - 
     * @returns 
     */
    static #generateProductEditable(product) {
        return `
        <tr onclick="editProduct(${product.id})" class="product editable">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
        </tr>
        `;
    }

    static editProduct(id){
        // console.log(Menu.#products.find( product => product.id == id));
        const toEdit = Menu.#products.find( product => product.id == id);
    }

    static #showProducts() {
        Menu.#products.forEach((product) => {
            Menu.#list.insertAdjacentHTML("beforeend", Menu.#generateProduct(product));
        });
    }

    static #showProductsEditable() {
        Menu.#products.forEach((product) => {
            Menu.#list.insertAdjacentHTML("beforeend", Menu.#generateProductEditable(product));
        });
    }

    static #hideTagesKarte() {
        Menu.#menu.classList.add("d-none");
        if(Menu.#menu_anchor)
            Menu.#menu_anchor.classList.add("d-none");
    }

    static #showTagesKarte() {
        if(Menu.#menu_anchor)
            Menu.#menu_anchor.classList.remove("d-none");
        Menu.#menu.classList.remove("d-none");
    }

    static getList(){
       return Menu.#list;
    }
}