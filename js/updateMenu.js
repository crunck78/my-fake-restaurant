import { Backend } from "../smallest_backend_ever/mini_backend.js";
import { Menu } from "./menu.js";
import { Utility } from "./overall.js";

/**
 * Page Set Up
 */
await Utility.includeHTML2();
await Backend.init( window.location.origin + '/smallest_backend_ever');
Menu.init(Backend.getItem("products"), true);
////////////////////////////////////////////////////////////////////////

// Utility.readFile('../downloads/Tageskarte.pdf');

/**
 * Expose Menu.editProduct to window object
 */
window.editProduct = Menu.editProduct;

window.submitNewProduct = async (event) =>{
    event.preventDefault();
    const form = event.target;

    const newProduct =
    {
        id : Menu.getProducts().length,
        name : form["name"].value,
        price : form["price"].value,
        description : form["description"].value
    }

    Menu.addNewProduct( newProduct );
    await Backend.setItem("products", Menu.getProducts());
}

window.addProduct = ()=>{
    Utility.openDialog("add-product");
}
window.closeDialog = Utility.closeDialogByRef;

/**
 * Retrieves the text of a specif page within a PDF Document obtained through pdf.js 
 * 
 * @param {Integer} pageNum Specifies the number of the page 
 * @param {PDFDocument} PDFDocumentInstance The PDF document obtained 
 **/
 window.getPageText = function(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";

                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];

                    finalString += item.str + " ";
                }

                // Solve promise with the text retrieven from the page
                resolve(finalString);
            });
        });
    });
}

/**
 * Extract the test from the PDF
 */

var PDF_URL  = './downloads/Tageskarte.pdf';
var loadingTask = window.pdfjsLib.getDocument(PDF_URL);
loadingTask.promise.then(function (pdf) {

    // var totalPages = PDFDocumentInstance.pdfInfo.numPages;
    // var pageNumber = 1;

    // // Extract the text
    // window.getPageText(pageNumber , PDFDocumentInstance).then(function(textPage){
    //     // Show the text of the page in the console
    //     console.log(textPage);
    // });

    pdf.getPage(1).then(function(page) {
        // you can now use *page* here
        console.log(page);
        var textContent = page.getTextContent();
        textContent.then( result => console.log(result));
    });

});