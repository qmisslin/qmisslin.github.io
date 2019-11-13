let Page = {

    // Init all dom element
    dom : {
        speach : document.querySelector('.speak'),
        wave : document.querySelector('.wave .circle .inner'),
    },

    // Action on IA
    createMessage : (msg) => {
        dom_msg = document.createElement("div");
        dom_msg_content = document.createElement("div");
        if(msg != null) dom_msg_content.innerHTML = msg;
        dom_msg.classList.add("msg");
        dom_msg_content.classList.add("msg-content");

        dom_msg.appendChild(dom_msg_content);
        Page.dom.speach.appendChild(dom_msg);
        Page.dom.speach.scrollBy(0,Page.dom.speach.offsetHeight);
        return dom_msg;
    },
    sendMessage : (msg) => {
        let m = Page.createMessage(Mapper.stylize(msg));
        m.classList.add('in');
        IA.getAnswer(msg);
        return m;
    },
    receiveMessage : (msg) => {
        let m = Page.createMessage(msg);
        m.classList.add('out');
        return m;
    },
    setWaveSize : (s) => {
        Page.dom.wave.style = "width:" +s+"%;height:"+s+"%;margin:"+(100-s)/2+"%";
    },
    clear : () => {
        while (Page.dom.speach.firstChild) {
            Page.dom.speach.removeChild(Page.dom.speach.firstChild);
        }
    },
    vocalIsPaused : (v) => {
        if(v) Page.dom.wave.classList.add("vocal_pause");
        else Page.dom.wave.classList.remove("vocal_pause");
    },

    reveiveGif : (theme) => {
        $.support.cors = true;
        $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=CW27AW0nlp5u0&tag="+theme, null, function(response) {
 
            var image = response.data.image_original_url;

            let msg = Page.receiveMessage();

            let gif = document.createElement("img");
            gif.setAttribute("src", image);
            gif.classList.add("gif");

            msg.appendChild(gif);

            return msg;

        }).fail(function(jqXHR, textStatus, e) {
            console.log(e);
        });
    }
}