export class Utility {

  static async readFile(path) {
    const response = await fetch(path);
    const content = await response.text();
    console.log(content);
  }

  static showFeedback(id) {
    document.getElementById(id).style.display = "flex";
  }

  static hideFeedback(id) {
    document.getElementById(id).style.display = "none";
  }

  static openDialog(id) {
    document.getElementById(id).style.display = "flex";
  }

  static closeDialogByRef(ref) {
    ref.style.display = "none";
  }

  static closeDialogById(id) {
    document.getElementById(id).style.display = "none";
  }

  static fillContainer(title = "", id, array, toGenerate, data) {
    const container = document.getElementById(id);
    container.innerHTML = title;
    if (array.length > 0)
      array.forEach((elem, index) => container.insertAdjacentHTML("beforeend", toGenerate({ ref: elem, index: index, data: data })));
    else {
      container.innerHTML = `<div class="empty-container">NOTHING TO SHOW</div>`;
    }

  }

  static getElementById(collection, id) {
    return collection.find(elem => elem.id === id);
  }

  static getNewIdForCollection(collection) {
    let newId = Math.floor(Math.random() * new Date().getTime());
    console.log(newId);
    return collection.some(elem => elem.id == newId) ? getNewIdForCollection(collection) : newId;
  }

  static setCurrentLinkSelected() {
    const navbarLinks = Array.from(document.getElementById("links-container").childNodes);
    const current = navbarLinks.find(navbarLink => navbarLink.baseURI == navbarLink.href);
    current.classList.add("current-link");
  }

  /**
   * Includes templates
   * @returns 
   */
  static includeHTML2() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = Array.from(document.getElementsByTagName("*"));
    const hasInclude = z.filter(elem => elem.hasAttribute("w3-include-html"));
    hasInclude.forEach( async(include) => {
      const file = include.getAttribute("w3-include-html");
      const response = await fetch(file);
      const content = await response.text();
      include.innerHTML = content;
      include.removeAttribute("w3-include-html");
    });
  }

  /**
   * Includes templates
   * @returns 
   */
  static includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {

        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            Utility.includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

}

class Dialog {

}