var include_manager = { current: 0, final: 0, callback: null };

function include_html(callback) {
    var z, i, elmnt, file, xhttp;
    if(callback != null) 
        include_manager.callback = callback;
    /* Loop through a collection of all HTML elements: */
    z = Array.from(document.querySelectorAll("*[include]"));
    include_manager.final += z.length;
    z.forEach(elmnt => {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                /* Remove the attribute, and call this function once more for include in include */
                elmnt.removeAttribute("include");
                include_html();
                include_manager.current++;
                if (include_manager.current == include_manager.final) {
                    console.log("Include html is finish : " +
                        include_manager.current + "/" + include_manager.final);

                    if (include_manager.callback != null)
                        include_manager.callback();
                    else console.log("No callback.");
                }
            }
        }
        xhttp.open("GET", elmnt.getAttribute("include"), true);
        xhttp.send();
    });
}