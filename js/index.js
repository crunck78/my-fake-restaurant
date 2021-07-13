import { Navi } from './navigation.js';
import { Backend } from "../smallest_backend_ever/mini_backend.js";
import { Menu } from "./menu.js";
import { Utility } from "./overall.js";

/**
 * Page Set Up
 */
 const navBar = new Navi();
Utility.includeHTML();
 await Backend.init( window.location.origin + '/smallest_backend_ever');
 let menuInitInterval = setInterval(()=>{
    if(document.getElementById("list")){
        Menu.init(Backend.getItem("products"));
        clearInterval(menuInitInterval);
    }
 }, 1000 / 60)

 ////////////////////////////////////////////////////////////////////////

