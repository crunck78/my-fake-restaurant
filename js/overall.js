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

  static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  /**
   * Includes templates to innerHTML of all elements with data-template attribute
   * @returns
   */
  static async includeHTML2() {
    try {
      const templatesContainer = document.querySelectorAll('[data-template]');
      if(templatesContainer.length == 0)  return; //fall case
      await Utility.asyncForEach(templatesContainer, async (container) => {
        const file = container.getAttribute("data-template");
        const response = await fetch(file);
        if (response.ok) {
          const content = await response.text();
          container.innerHTML = content;
        }
        container.removeAttribute("data-template");
      });
      await Utility.includeHTML2();
    } catch (error) {
      console.error(error);
    }
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

// class Dialog {

// }