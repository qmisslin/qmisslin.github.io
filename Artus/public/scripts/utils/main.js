function MainMenu() {
    let that = this;
    
    this.dom = {
        menu: document.querySelector("#main_menu"),
        menu_switch: document.querySelector("#main_menu .main_menu_item_0"),
    };
    this.is_open = false;
    this.global_click = false;

    this.dom.menu_switch.addEventListener("click", function() {that.switch();})
    window.addEventListener("click", function() {that.autoClose();})
}

MainMenu.prototype.switch = function() {
    this.is_open = !this.is_open;
    this.global_click = false;
    if(this.is_open) {
        this.dom.menu.classList.add("main_menu_item_open");
    } else {
        this.dom.menu.classList.remove("main_menu_item_open");
    }
}
MainMenu.prototype.autoClose = function() {
    if(this.is_open && this.global_click) {
        this.switch();
    }
    this.global_click = true;
}