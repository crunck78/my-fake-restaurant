export class Backend {

    static #base_server_url;
    static #jsonFromServer;

    /**
     * Sets the base url to smallest_backent_ever and loads the database.json to #jsonFromServer
     * @param {string} url - base url path to smallest_backend_ever
     */
    static async init(url) {
        Backend.#base_server_url = url;
        await Backend.#downloadFromServer();
    }

    static async setItem(key, item) {
        Backend.#jsonFromServer[key] = item;
        return await Backend.#saveJSONToServer();
    }

    static getItem(key) {
        if (!Backend.#jsonFromServer[key]) {
            return null;
        }
        return Backend.#jsonFromServer[key];
    }

    static deleteItem(key) {
        delete Backend.#jsonFromServer[key];
        return Backend.#saveJSONToServer();
    }

    static async #downloadFromServer() {
        let result = await Backend.#loadJSONFromServer();
        Backend.#jsonFromServer = JSON.parse(result);
        console.log('Loaded', result);
    }

    static async #loadJSONFromServer() {
        let response = await fetch(Backend.#base_server_url + '/nocors.php?json=database&noache=' + (new Date().getTime()));
        return await response.text();
    }

    /**
    * Saves a JSON or JSON Array to the Server
    */
    static #saveJSONToServer() {
        return new Promise(function (resolve, reject) {
            let xhttp = new XMLHttpRequest();
            let proxy = Backend.#determineProxySettings();
            let serverURL = proxy + Backend.#base_server_url + '/save_json.php';
            xhttp.open('POST', serverURL);

            xhttp.onreadystatechange = function (oEvent) {
                if (xhttp.readyState === 4) {
                    if (xhttp.status >= 200 && xhttp.status <= 399) {
                        resolve(xhttp.responseText);
                    } else {
                        reject(xhttp.statusText);
                    }
                }
            };

            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify(Backend.#jsonFromServer));

        });
    }

    static #determineProxySettings() {
        return '';

        if (window.location.href.indexOf('.developerakademie.com') > -1) {
            return '';
        } else {
            return 'https://cors-anywhere.herokuapp.com/';
        }
    }
}
