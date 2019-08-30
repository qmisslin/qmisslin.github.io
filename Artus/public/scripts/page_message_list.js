function Conversation(element) {
    let that = this;
    this.dom = {
        element: element,
        title: element.querySelector(".title .text"),
        enable: element.querySelector(".enable"),
        disable: element.querySelector(".disable"),
        quit: element.querySelector(".quit"),
    }
    this.title = this.dom.title.innerText;
    this.notification = true;
    
    // Event manage
    this.dom.enable.addEventListener("click", 
        function() {that.switch()}   
    );
    this.dom.disable.addEventListener("click", 
        function() {that.switch()}   
    );
    this.dom.quit.addEventListener("click", 
        function() {that.quit()}
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

Conversation.prototype.quit = function() {
    let that = this;
    this.popup_quit = new Popup(
        "Êtes-vous sûr.e de vouloir quitter la conversation"+
        "<span class=\"colored\"> \"" + this.title + "\" </span>?<br><br>" +
        "Pour revenir à cette conversation, il faudra être invité.e par un.e de ses membres."
        ,[
        {caption: 'Annuler', action: () => that.closePopupQuit(false), classList: 'btn btn_no'},
        {caption: 'Ok', action: () => that.closePopupQuit(true), classList: 'btn btn_yes btn_primary'},
    ]);
}

Conversation.prototype.closePopupQuit = function(value) {
    if(value) {
        // TODO : Quit conversation 
    }
    this.popup_quit.switch();
}

function PageMessageList() {
    
    let that = this;
    this.dom = {
        add_conv: document.querySelector("#container #option")
    }

    // Create all conversation element
    this.conv = Array.from(
        document.querySelectorAll("#page_message_list .conv")
    ).map(e => new Conversation(e)); 

    // Event manage
    this.dom.add_conv.addEventListener("click", function(){
        that.openPopupNew()
    })
}

PageMessageList.prototype.openPopupNew = function () {
    let that = this;
    this.popup_new = new Popup(
        "Entrez un titre pour la nouvelle conversation que vous voulez créer :"+
        "<br><br><input type=\"text\" placeolder=\"Entrez un titre\"><br><br>"
        ,[{
            caption: 'Annuler', 
            action: () => that.closePopupNew(false), 
            classList: 'btn btn_no'
        },{
            caption: 'Ok', 
            action: () => that.closePopupNew(true), 
            classList: 'btn btn_yes btn_primary'
        }]
    );
}

PageMessageList.prototype.closePopupNew = function (value) {
    if(value) {
        // TODO : Quit conversation 
    }
    this.popup_new.switch();
}

function initPageMessageList() {
    initAutosizeTextarea();
    replaceAllInputFiles();

    var pageMessage = new PageMessageList(); 


    // Init main menu
    let menu = new MainMenu();
}