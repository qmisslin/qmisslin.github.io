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
        "Êtes-vous sûr.e de vouloir quitter la conversation "+
        "<span class=\"colored\">\"" + this.title + "\"</span>?<br><br>" +
        "Pour revenir à cette conversation, il faudra être invité.e par un.e de ses membres."
        ,[
        {caption: 'Annuler', action: () => that.closePopupQuit(false), classList: 'btn btn_no'},
        {caption: 'Ok', action: () => that.closePopupQuit(true), classList: 'btn btn_yes btn_primary'},
    ]);
}

Conversation.prototype.closePopupQuit = function(value) {
    if(value) {
        
        this.dom.element.parentElement.removeChild(this.dom.element);
        delete this;
        // TODO : Quit conversation on server
    }
    this.popup_quit.delete();
}

function PageMessageList() {
    
    let that = this;
    this.dom = {
        add_conv: document.querySelector("#container #option"),
        conv_list: document.querySelector("#content .conv").parentElement,
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
        "<br><br><input id=\"name\" type=\"text\" placeolder=\"Entrez un titre\"><br><br>"
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
        let name = document.querySelector(".popup input#name").value;
        this.newConv(name);
        // TODO : New conversation 
    }
    this.popup_new.delete();
}

PageMessageList.prototype.newConv = function (name) {
    let dom = 
        Element({classList: 'conv'}, [
            Element({classList: 'title'}, [
                Element({classList: 'text', html:name}, []),
                Element({classList: 'settings'}, [
                    Element({tag:'i', classList: 'enable fas fa-bell'}, []),
                    Element({tag:'i', classList: 'disable hide fas fa-bell-slash'}, []),
                    Element({tag:'i', classList: 'quit fas fa-trash-alt'}, [])
                ]),
            ]),
            Element({classList: 'notification', html:'Pas de nouveaux messages.'}, [])
        ]);
    
    this.dom.conv_list.appendChild(dom);
    this.conv.push(new Conversation(dom));
}

function initPageMessageList() {
    initAutosizeTextarea();
    replaceAllInputFiles();

    var pageMessageList = new PageMessageList(); 


    // Init main menu
    let menu = new MainMenu();
}