function PageMessageSettings() {
    this.select = null;
}

PageMessageSettings.prototype.selectMember = function() {

}

PageMessageSettings.prototype.addMember = function() {

}

/* PAGE SCRIPT MANAGER */

function initPageMessageSettings() {
    var select = initSelect();
    initAutosizeTextarea();
    replaceAllInputFiles();

    var pageMessageSettings = new PageMessageSettings();

    select.forEach(e => {
        if (e.dom.select.getAttribute("name") == "message_type_select") {
            pageMessageSettings.select = e;
            e.onchange = () => pageMessageSettings.selectMember();
            e.onchange();
        }
    });

    // Init main menu
    let menu = new MainMenu();
}