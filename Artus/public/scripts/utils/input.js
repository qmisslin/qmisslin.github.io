
// ####################
// SELECT
// ####################
let select = [];

function SelectInput(s) {

    // Dom selection
    let that = this;
    this.dom = {
        select: s,
        options: Array.from(s.querySelectorAll(".option"))
    };
    this.is_open = true;
    this.selected = 0;
    this.onchange = () => eval(s.getAttribute("onchange"));
    this.name = s.getAttribute("name");
    this.value = "";

    // Event manager
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
    if (this.is_open) {
        let el = this.dom.options[index];
        this.dom.options.forEach(
            e => e.classList.remove("is_selected")
        );
        el.classList.add("is_selected");
        this.value = el.getAttribute("value");
        if (this.selected != index && this.onchange != null) {
            this.onchange();
        }
        this.selected = index;
    }
    this.switch();
}

function initSelect() {
    var arr = Array.from(document.querySelectorAll(".select"));
    arr.forEach(el => {
        var s = new SelectInput(el);
        select.push(s);
    });
    return select;
}

// ####################
// TEXTAREA
// ####################

function initAutosizeTextarea() {
    Array.from(document.querySelectorAll('textarea')).forEach( e => {
        e.setAttribute('style', 'height:' + (e.scrollHeight) + 'px;overflow-y:hidden;');
        e.addEventListener("input", OnInput, false);
    });
}

function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}

// ####################
// INPUT FILE
// ####################
function replaceAllInputFiles() {
    let inputs = Array.from(document.querySelectorAll("input[type=file]"));
    inputs.forEach(e => {
        
        // Hide old input
        e.classList.add("input_hide");
        let id = e.getAttribute("id");
        let type = e.getAttribute("file_name");
        e.setAttribute("id", "");

        // Create new element
        let container = document.createElement("div");
        container.setAttribute("id", id);
        container.classList.add("input_file_stylized", "input");
        e.parentElement.appendChild(container);

        let text = document.createElement("div");
        text.classList.add("input_file_stylized_text");
        text.innerHTML = "Choisir <br>des " + type;
        container.appendChild(text);

        // Define event
        e.addEventListener("change", function() {
            updateInputFileText(e, text);
        });
        container.addEventListener("click", () => {
            e.click();
        });
    });
}

function updateInputFileText(input, dom) {
    let html = "";
    let pre = "Envoyer <br><span class='input_file_stylized_span'>";
    let suf = "</span> ";
    let type = input.getAttribute("file_name");
    switch(input.files.length) {
        case 0: html = "Choisir <br>des " + type; break;
        case 1: html = pre + input.files.item(0).name + suf; break;
        default: html = pre + input.files.length + suf + type;
    }
    dom.innerHTML = html;
}