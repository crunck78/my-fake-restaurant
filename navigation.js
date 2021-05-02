export class Navi {
    constructor() {
        this.element = document.getElementById("navigation");
        this.isMobile = window.innerWidth < 800;
        this.isHidden = false;
        this.init();
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    init() {
        if(!this.isMobile){
            window.addEventListener("mousemove", this.handleMouseMove.bind(this));
        }else{
           
        }
    }

    hidde() {
        if (!this.isHidden) {
            setTimeout(function () {
                this.element.style.top = `${-this.element.getBoundingClientRect().height}px`;
                this.isHidden = true;
            }.bind(this), 1000);
        }
    }

    show() {
        if (this.isHidden) {
            this.element.style.top = `${0}px`;
            this.isHidden = false;
        }
    }

    handleTouchStart(event) {
    
    }

    handleTouchEnd(event) {

    }

    handleMouseMove(event) {
        if (event.y < this.element.getBoundingClientRect().height) {
            this.show();
        } else {
            this.hidde();
        }
    }

    handleTouchMove(event) {

    }

    handleResize(event){
       this.isMobile = window.innerWidth < 800;
       this.init();
    }

    handleMouseRemove(){
        alert("HANDLE MOUSE REMOVE");
    }
}