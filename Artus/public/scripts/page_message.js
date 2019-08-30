function PageMessage() {
    this.dom = {
        input: {
            t:document.querySelector("#input_container #input_text"),
            i:document.querySelector("#input_container #input_image"),
            f:document.querySelector("#input_container #input_file"),           
        }
    };
    this.select = null;
}

PageMessage.prototype.changeType = function() {
    this.dom.input.t.classList.remove("active");
    this.dom.input.i.classList.remove("active");
    this.dom.input.f.classList.remove("active");

    switch(this.select.value) {
        case "input_text": {
            this.dom.input.t.classList.add("active");
        } break;
        case "input_image": {
            this.dom.input.i.classList.add("active");
        } break;
        case "input_file": {
            this.dom.input.f.classList.add("active");
        } break;
    }
};

function initPageMessage() {
    var select = initSelect();
    initAutosizeTextarea();
    replaceAllInputFiles();

    var pageMessage = new PageMessage(); 

    select.forEach(e => {
        if(e.dom.select.getAttribute("name") == "message_type_select") {
            pageMessage.select = e;
            e.onchange = () => pageMessage.changeType();
            e.onchange();
        }  
    });

    // Init main menu
    let menu = new MainMenu();
}