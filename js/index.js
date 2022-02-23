import { Navi } from './navigation.js';
import { Backend } from "../smallest_backend_ever/mini_backend.js";
import { Menu } from "./menu.js";
import { Utility } from "./overall.js";

/**
 * Page Set Up
 */
const navBar = new Navi();
await Utility.includeHTML2();
await Backend.init(window.location.origin + '/smallest_backend_ever');
Menu.init(Backend.getItem("products"));

 ////////////////////////////////////////////////////////////////////////

