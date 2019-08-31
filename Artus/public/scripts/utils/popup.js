/*
content: ''
button: [
    {caption: '', action: '', classList: ''}
]

*/

function Popup(content, button ) {

    let button_list = button.map(b => Element({
            classList: b.classList,
            html: b.caption,
            action: [{name: 'click', action: b.action}]
    }));

    this.display = true;
    this.dom = 
        Element({
            classList: 'popup_container',
            style: (this.display)?'':'display: none;'
        }, [
            Element({
                classList: 'popup',
            }, [
                Element({
                    classList: 'header',
                    html: content,
                }),
                Element({
                    classList: 'footer'
                }, button_list)
            ])
        ]);
    document.querySelector("#container").appendChild(this.dom);
    
    let input = this.dom.querySelector("input");
    if(this.display && input != null) {
        input.focus();
    }
}

Popup.prototype.switch = function() {
    this.display = ! this.display;
    if(this.display) {
        this.dom.style = "";
    } else {
        this.dom.style = 'display: none;';
    }
}
Popup.prototype.delete = function() {
    document.querySelector("#container").removeChild(this.dom);
}