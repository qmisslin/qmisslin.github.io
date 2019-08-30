function Conversation(element) {
    let that = this;
    this.dom = {
        element: element,
        enable: element.querySelector(".enable"),
        disable: element.querySelector(".disable"),
        quit: element.querySelector(".quit"),
    }
    this.notification = true;
    
    // Event manage
    this.dom.enable.addEventListener("click", 
        function() {that.switch()}   
    );
    this.dom.disable.addEventListener("click", 
        function() {that.switch()}   
    );
}

Conversation.prototype.switch = function() {
    this.notification = !this.notification;
    let c = "hide";
    if(this.notification) {
        this.dom.enable.classList.remove(c)
        this.dom.disable.classList.add(c);
    } else {
        this.dom.enable.classList.add(c)
        this.dom.disable.classList.remove(c);
    }
}

function PageMessageList() {
    let conv_dom = Array.from(
        document.querySelectorAll("#page_message_list .conv")
    ).map(e => new Conversation(e)); 
}




function initPageMessageList() {
    initAutosizeTextarea();
    replaceAllInputFiles();

    var pageMessage = new PageMessageList(); 


    // Init main menu
    let menu = new MainMenu();

    let popup = new Popup(
        "Êtes-vous sûr.e de vouloir quitter cette conversation ?<br><br>"+
        "Pour revenir à cette conversation, il faudra être invité.e par un.e de ses membres."
        ,[
        {caption: 'Anuler', action: null, classList: 'btn btn_no'},
        {caption: 'Ok', action: null, classList: 'btn btn_yes btn_primary'},
    ]);
}
/*
content: ''
button: [
    {caption: '', action: '', classList: ''}
]

function Popup(content, button ) */