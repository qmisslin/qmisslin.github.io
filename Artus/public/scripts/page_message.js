/*

type: 0 > info, 1 > in, 2 > out
<div class="msg_container in">
    <div class="msg_author">Jean Michel</div>
    <div class="msg">Hello !</div>
    <div class="msg_time">17h30</div>
</div>
        
*/
function Message(id, type, content, author, time) {
    this.dom = {
        parent: document.querySelector("#content_anchor").parentElement,
    };
    this.type = type;
    this.id = id;

    // Different type of message
    if (type == 'in' || type == 'out') {
        this.dom.element = Element({
            id: this.id,
            classList: 'msg_container ' + this.type
        }, [
            this.dom.author = Element({ classList: 'msg_author', html: author }, []),
            this.dom.content = Element({ classList: 'msg', html: content }, []),
            this.dom.time = Element({ classList: 'msg_time', html: time }, [])
        ]);
    } else {
        this.dom.element = Element({
            id: this.id,
            classList: 'info',
            html: content,
        });
    }

    // Add message to page content
    this.dom.parent.appendChild(this.dom.element);
}



/* PAGE MESSAGE MANAGER */

function PageMessage() {
    let that = this;
    this.dom = {
        input: {
            t: document.querySelector("#input_container #input_text"),
            i: document.querySelector("#input_container #input_image"),
            f: document.querySelector("#input_container #input_file"),
        },
        // Get real input
        hide_input: {
            i: document.querySelector("#input_container #hide_input_image"),
            f: document.querySelector("#input_container #hide_input_file"),
        },
        title: document.querySelector("#header #title"),
        content: document.querySelector("#content #content_anchor"),
        btn_send: document.querySelector("#footer #btn_msg_send"),
        btn_clear: document.querySelector("#btn_clear_input"),
    };

    this.select = null;
    this.conversation_id = '00001';
    this.conversation = client.getConversationFromId(this.conversation_id);

    if (this.conversation == null) {
        msgPopup("Désolé... Il semble que cette conversation n'existe plus.");
        // TODO : Go back
    }
    this.generate();

    // Event manage
    this.dom.btn_clear.addEventListener("click", function() { that.clearInput() })
    this.dom.btn_send.addEventListener("click", function() { that.addNewMessage() })
}

PageMessage.prototype.idGenerator = function() {
    let array = new Uint32Array(8)
    window.crypto.getRandomValues(array)
    let str = '';
    for (let i = 0; i < array.length; i++) {
        str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4)
    }
    return str;
}

PageMessage.prototype.changeType = function() {
    this.dom.input.t.classList.remove("active");
    this.dom.input.i.classList.remove("active");
    this.dom.input.f.classList.remove("active");

    switch (this.select.value) {
        case "input_text":
            {
                this.dom.input.t.classList.add("active");
            }
            break;
        case "input_image":
            {
                this.dom.input.i.classList.add("active");
            }
            break;
        case "input_file":
            {
                this.dom.input.f.classList.add("active");
            }
            break;
    }
};


// To generate from client data
PageMessage.prototype.generate = function() {
    this.dom.title.innerHTML = this.conversation.name;
    this.conversation.message_list.forEach(m => {

        //{id: '00052', author: '00001', time: '17h20', content: 'Coucou'},
        if (m.author != null) {
            let type = (m.author == client.getId()) ? 'out' : 'in';

            let author = client.getUserWithId(m.author);
            author = (author != null) ?
                author = author.name + " " + author.surname :
                'Utilisateur supprimé';

            new Message(m.id, type, m.content, author, m.time);
        } else {
            new Message(m.id, 'info', m.content);
        }
    })
}

PageMessage.prototype.addNewMessageFile = function() {

}

PageMessage.prototype.addNewMessage = function() {
    let content;
    let id = this.idGenerator();
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let time = (h < 10 ? '0' + h : h) + "h" + (m < 10 ? '0' + m : m);
    let user_data = client.getUserWithId(client.getId());
    let author = user_data.name + " " + user_data.surname;

    // Print and send message
    switch (this.select.value) {
        case "input_text":
            {
                content = this.dom.input.t.value;
            }
            break;
        case "input_image":
            {
                content = this.dom.input.i.value;
                content =
                "<div class=\"img_container\">" +
                "<img onclick=\"imgPopup('../db/files/img.jpg')\" src=\"../db/files/img.jpg\">" +
                "<img onclick=\"imgPopup('../db/files/img.jpg')\" src=\"../db/files/img.jpg\">" +
                "<img onclick=\"imgPopup('../db/files/img.jpg')\" src=\"../db/files/img.jpg\">" +
                "<img onclick=\"imgPopup('../db/files/img.jpg')\" src=\"../db/files/img.jpg\">" +
                "<img onclick=\"imgPopup('../db/files/img.jpg')\" src=\"../db/files/img.jpg\">" +
                "</div>";
            }
            break;
        case "input_file":
            {
                content = this.dom.input.f.value;
                content =
                "<div class=\"file_container\">" +
                "<a href=\"../db/files/img.jpg\">" +
                "<div class=\"filedisplay\">" +
                "<i class=\"fileicon fas fa-file\"></i>" +
                "<span class=\"fileext\">TXT</span>" +
                "</div>" +
                "<div class=\"filename\">Fichier 1</div>" +
                "</a>" +
                "<a href=\"../db/files/img.jpg\">" +
                "<div class=\"filedisplay\">" +
                "<i class=\"fileicon fas fa-file\"></i>" +
                "<span class=\"fileext\">JPEG</span>" +
                "</div>" +
                "<div class=\"filename\">Fichier 1</div>" +
                "</a>" +
                "<a href=\"../db/files/img.jpg\">" +
                "<div class=\"filedisplay\">" +
                "<i class=\"fileicon fas fa-file\"></i>" +
                "<span class=\"fileext\">TXT</span>" +
                "</div>" +
                "<div class=\"filename\">Fichier 1</div>" +
                "</a>" +
                "<a href=\"../db/files/img.jpg\">" +
                "<div class=\"filedisplay\">" +
                "<i class=\"fileicon fas fa-file\"></i>" +
                "<span class=\"fileext\">TXT</span>" +
                "</div>" +
                "<div class=\"filename\">Fichier 1</div>" +
                "</a>" +
                "<a href=\"../db/files/img.jpg\">" +
                "<div class=\"filedisplay\">" +
                "<i class=\"fileicon fas fa-file\"></i>" +
                "<span class=\"fileext\">TXT</span>" +
                "</div>" +
                "<div class=\"filename\">Fichier 1</div>" +
                "</a>" +
                "</div>";
            }
            break;
    }

    new Message(id, 'out', content, author, time);

    // TODO : Send message to server

    let data = {
        id: id,
        author: author,
        time: time,
        content: content
    };
    if (!client.sendMessage(this.conversation_id, data)) {
        console.error("ERROR : Cannot send message.");
    }

    // Clear
    this.clearInput();
}

PageMessage.prototype.clearInput = function() {

    // Clear hidden input
    this.dom.input.t.value = '';
    this.dom.hide_input.i.value = '';
    this.dom.hide_input.f.value = '';

    // Clear visual input
    updateInputFileText(this.dom.hide_input.i, this.dom.input.i.querySelector(".input_file_stylized_text"));
    updateInputFileText(this.dom.hide_input.f, this.dom.input.f.querySelector(".input_file_stylized_text"));

    // Update size of textarea
    TextareaOnInput(this.dom.input.t);
}



/* PAGE SCRIPT MANAGER */

function initPageMessage() {
    var select = initSelect();
    initAutosizeTextarea();
    replaceAllInputFiles();

    var pageMessage = new PageMessage();

    select.forEach(e => {
        if (e.dom.select.getAttribute("name") == "message_type_select") {
            pageMessage.select = e;
            e.onchange = () => pageMessage.changeType();
            e.onchange();
        }
    });

    // Init main menu
    let menu = new MainMenu();
}