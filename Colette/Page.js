let Page = {

    // Init all dom element
    dom : {
        speach : document.querySelector('.speak'),
        wave : document.querySelector('.wave .circle .inner'),
    },

    // Action on IA
    createMessage : (msg) => {
        dom_msg = document.createElement("div");
        dom_msg.innerHTML = msg;
        dom_msg.classList.add("msg");
        Page.dom.speach.appendChild(dom_msg);

        return dom_msg;
    },
    sendMessage : (msg) => {
        Page.createMessage(msg).classList.add('in');
        answer = IA.getAnswer(msg);
        setTimeout(() => Page.receiveMessage(answer), 1000);
    },
    receiveMessage : (msg) => {
        Page.createMessage(msg).classList.add('out');
    },
    setWaveSize : (s) => {
        Page.dom.wave.style = "width:" +s+"%;height:"+s+"%;margin:"+(100-s)/2+"%";
    },
    clear : () => {
        while (Page.dom.speach.firstChild) {
            Page.dom.speach.removeChild(Page.dom.speach.firstChild);
        }
    },
}