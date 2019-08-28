let select = [];

function SelectInput(s) {

    console.log("Hello Select");

    // Dom selection
    this.dom = {
        select: s,
        options: Array.from(s.querySelectorAll(".option"))
    };
    this.is_open = false;
    this.selected = 0;
    this.onchange = () => eval(s.getAttribute("onchange"));

    // Event manager
    this.dom.options.forEach(e, i =>
        e.addEventListener("click", () => this.select_option(i)));

    // Init first select
    console.log("da", this);
    this.select_option(0);
}

SelectInput.prototype.switch = function() {
    this.is_open = !this.is_open;
    if (this.is_open) {
        this.dom.classList.add("opened_select");
    } else {
        this.dom.classList.remove("opened_select");
    }
}

SelectInput.prototype.select_option = function(index) {

    console.log("Hello Select option", this);
    if (this.is_open) {
        let el = this.dom.options[index];
        this.dom.options.forEach(
            e => e.classList.remove("is_selected")
        );
        el.classList.add("is_selected");
        if (this.selected != index) {
            this.onchange();
        }
        this.selected = index;
    }
    this.switch();
}

function initSelect() {
    console.log("Init Select");
    var arr = Array.from(document.querySelectorAll(".select"));
    console.log("Arr", document.querySelectorAll(".select"));
    arr.forEach(el => {
        console.log("wtf");
        var s = SelectInput(el);
        select.push(s);
    });
    console.log("End init Select");
}






/*

<div class="select top">
    <div class="option" value="input-text"> <i class="fas fa-font"></i></div>
    <div class="option" value="input-image"><i class="fas fa-image"></i></div>
    <div class="option" value="input-file"><i class="fas fa-file"></i></div>
</div>

*/