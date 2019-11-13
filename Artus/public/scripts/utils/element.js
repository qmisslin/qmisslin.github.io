/*
dom {
    tag: '',

    id: '',
    classList: '',
    style: '',
    html: '',

    attributes: [{name: '', value: ''}],
    event: [{name: '', action: ''}],
    child: [dom]
}
*/


function Element(e, child) {

    

    if(Element.object_list == null) {
        Element.object_list = [];
    }
    let str = a => (typeof a === 'string' || a instanceof String)?
        a : 
        null;
    let arr = a => Array.isArray(a)? 
        a : (a!=null)? 
        [a] : 
        [];
    if(e == null) e = {};

    
    
    let ev = {
        tag: str(e.tag) || 'div',

        id: str(e.id) || null,
        classList: str(e.classList) || '',
        style: str(e.style) || '',
        html: str(e.html) || null,

        attributes: arr(e.attributes),
        action: arr(e.action),
        child: arr(child)
    };

    let el = document.createElement(ev.tag);

    if(ev.id != null) el.setAttribute("id", ev.id);
    if(ev.classList != null) el.setAttribute("class", ev.classList);
    if(ev.style != null) el.style = ev.style;
    if(ev.html != null) el.innerHTML = ev.html;

    ev.attributes.forEach(a => {
        el.setAttribute(a.name, a.value)
    });
    ev.action.forEach(a => {
        el.addEventListener(a.name, a.action)
    });
    ev.child.forEach(a => {
        el.appendChild(a);
    });

    return el;
}