function MainMenu() {
    let that = this;
    
    this.dom = {
        menu: document.querySelector("#main_menu"),
        menu_switch: document.querySelector("#main_menu .main_menu_item_0"),
    };

    this.dom.menu_switch.addEventListener("click", function() {that.switch();})

}

MainMenu.prototype.switch = function() {
    if(this.dom.menu.classList.contains("main_menu_item_open")) {
        this.dom.menu.classList.remove("main_menu_item_open");
    } else {
        this.dom.menu.classList.add("main_menu_item_open");
    }
}