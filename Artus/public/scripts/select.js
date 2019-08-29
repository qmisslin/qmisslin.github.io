let select = [];

function SelectInput(s) {

    // Dom selection
    this.dom = {
        select: s,
        options: Array.from(s.querySelectorAll(".option"))
    };
    this.is_open = true;
    this.selected = 0;
    this.onchange = () => eval(s.getAttribute("onchange"));

    // Event manager
    let that = this;
    this.dom.options.forEach((el, i) =>
        el.addEventListener("click", function(){ that.select_option(i) }));

    // Init first select
    this.select_option(0);
}

SelectInput.prototype.switch = function() {
    this.is_open = !this.is_open;
    if (this.is_open) {
        this.dom.select.classList.add("opened_select");
    } else {
        this.dom.select.classList.remove("opened_select");
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
        var s = new SelectInput(el);
        select.push(s);
    });
}






/*

<div class="select top">
    <div class="option" value="input-text"> <i class="fas fa-font"></i></div>
    <div class="option" value="input-image"><i class="fas fa-image"></i></div>
    <div class="option" value="input-file"><i class="fas fa-file"></i></div>
</div>

*/