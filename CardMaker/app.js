const Dom = {
    div: (classlist, color, background) => {
        let dom = document.createElement('div');
        dom.classList.add(classlist);
        dom.style = {};
        dom.style.color = color
        dom.style.backgroundColor = background || 'transparent'
        return dom;
    }
}

class Card {

    width = 350
    height = 486
    exportScale = 10
    primaryColor = "#ae2626"
    foregroundColor = "white"
    backgroundColor = "#151515"
    title = "Card title example";
    contentTitle = "Card subtitle example";
    contentText = "Card content example. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate ipsum turpis, id imperdiet sapien tincidunt vel. Cras quis molestie eros, pellentesque pellentesque neque. Cras elementum diam non tempus congue."

    action = {
        select: () => false,
        delete: () => false,
        copy: () => false
    }
    dom = {
        card: {
            container: null,
            title: null,
            contentTitle: null,
            contentText: null
        },
        item: {
            container: null,
            title: null
        }
    }
    item = null
    constructor(attr) {
        Object.assign(this, attr)
        this.createDom();
        this.refresh();
    }

    createDom() {
        // Create card
        let card = Dom.div("card", this.foregroundColor, this.primaryColor);
        card.style.width = `${this.width}px`;
        card.style.height = `${this.height}px`;
        card.style.minWidth = `${this.width}px`;
        card.style.minHeight = `${this.height}px`;
        card.style.boxShadow = `inset 0 0 0 4px ${this.backgroundColor}`
        this.dom.card.container = card

        let title = Dom.div("title", this.backgroundColor, 'transparent')
        title.innerText = this.title
        title.style.boxShadow = `inset 0 0 0 4px ${this.backgroundColor}`
        card.appendChild(title)
        this.dom.card.title = title


        let background = Dom.div("background", this.foregroundColor, this.backgroundColor)
        card.appendChild(background)

        let contentTitle = Dom.div("content-title", this.foregroundColor)
        this.dom.card.contentTitle = contentTitle

        let contentText = Dom.div("content-text", this.foregroundColor)
        contentText.innerHTML = this.contentText.replaceAll('\n', '<br/>')
        this.dom.card.contentText = contentText

        let content = Dom.div("content", this.foregroundColor)
        content.appendChild(contentTitle)
        content.appendChild(contentText)
        card.appendChild(content)

        // Create item
        let item = Dom.div("card-item", this.foregroundColor, this.backgroundColor);
        this.dom.item.container = item

        let itemTitle = Dom.div("item-title", this.foregroundColor, 'transparent')
        item.appendChild(itemTitle)
        itemTitle.onclick = () => this.action.select()
        this.dom.item.title = itemTitle

        let action = Dom.div("item-action", this.foregroundColor, 'transparent')
        action.innerHTML = "X";
        item.appendChild(action)
        this.action.onclick = () => this.action.delete();
    }

    refresh() {
        this.dom.card.title.innerText = this.title
        this.dom.card.contentTitle.innerText = this.contentTitle
        this.dom.card.contentText.innerText = this.contentText
        this.dom.item.title.innerText = this.title
        this.dom.card.container.style.backgroundColor = this.primaryColor
        this.dom.item.container.style.boxShadow = `inset 4px 0 0 ${this.primaryColor}`
    }

    toImage() {
        domtoimage.toPng(this.dom.card.container, {
            width: this.width,
            height: this.height
        })
            .then((dataUrl) => {
                let img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('Cannot export image', error);
            });
    }

    downloadImage() {
        let exportDom = document.createElement("div");
        exportDom.appendChild(this.dom.card.container.cloneNode(true))
        exportDom.style = `transform-origin: 0px 0px; transform: translate(0%, 0%) scale(${this.exportScale});`
        document.body.appendChild(exportDom)

        domtoimage.toPng(exportDom, {
            width: this.width * this.exportScale,
            height: this.height * this.exportScale
        })
            .then((dataUrl) => {
                var link = document.createElement('a');
                link.download = `${this.title}.png`;
                link.href = dataUrl;
                link.click();
                document.body.removeChild(exportDom)
            });
    }
}

class Manager {
    cards = []

    currentCard = null

    dom = {
        cardContainer: document.querySelector('.card-container'),
        itemContainer: document.querySelector('.card-list'),
        input: {
            title: document.querySelector('#input-title'),
            contentTitle: document.querySelector('#input-content-title'),
            contentText: document.querySelector('#input-content-text'),
            download: document.querySelector('#download'),
            save: document.querySelector('#save'),
            load: document.querySelector('#load'),
            colors: [...document.querySelectorAll('.color-list button')]
        }
    }

    constructor() {

        // Init cards
        for (let i = 0; i < 20; i++) {
            this.cards.push(new Card({
                title: `Card example n°${i}`
            }));
        }

        this.refreshList();
        this.setCurrentCard(this.cards[0]);

        // Init editor
        this.dom.input.title.oninput = () => {
            this.currentCard.title = this.dom.input.title.value
            this.currentCard.refresh()
        }
        this.dom.input.colors.forEach(colorInput => {
            let color = colorInput.getAttribute('color')
            colorInput.style = `background-color:${color}`
            colorInput.onclick = () => {
                this.currentCard.primaryColor = color
                this.currentCard.refresh()
            }
        })
        this.dom.input.contentTitle.oninput = () => {
            this.currentCard.contentTitle = this.dom.input.contentTitle.value
            this.currentCard.refresh()
        }
        this.dom.input.contentText.oninput = () => {
            this.currentCard.contentText = this.dom.input.contentText.value
            this.currentCard.refresh()
        }

        this.dom.input.download.onclick = () => {
            this.currentCard.downloadImage();
        }

        this.dom.input.save.onclick = () => {
            this.saveBackup();
        }

        this.dom.input.load.onchange = (e) => {
            this.loadBackup(e);
        }


    }

    refreshList() {
        while (this.dom.itemContainer.children.length) {
            this.dom.itemContainer.removeChild(this.dom.itemContainer.firstChild)
        }
        this.cards.forEach(card => {
            this.dom.itemContainer.appendChild(card.dom.item.container)
            card.action.select = () => {
                this.setCurrentCard(card)
            }
        })
    }

    refreshCard() {
        while (this.dom.cardContainer.children.length) {
            this.dom.cardContainer.removeChild(this.dom.cardContainer.firstChild)
        }
        this.dom.cardContainer.appendChild(this.currentCard.dom.card.container);
    }

    setCurrentCard(card) {
        this.currentCard = card;
        this.refreshCard(card)

        // Display input values
        this.dom.input.title.value = card.title
        this.dom.input.contentTitle.value = card.contentTitle
        this.dom.input.contentText.value = card.contentText
    }

    saveBackup() {
        let struct = {
            cardSetting: {
                width: 350,
                height: 486,
                exportScale: 10,
                foregroundColor: "white",
                backgroundColor: "#151515",
            },
            cards: this.cards.map(card => {
                return {
                    primaryColor: card.primaryColor,
                    title: card.title,
                    contentTitle: card.contentTitle,
                    contentText: card.contentText,
                }
            })
        }

        let json = encodeURIComponent(JSON.stringify(struct))
        var dataUrl = `data:text/json;charset=utf-8,${json}`;
        var link = document.createElement('a');
        link.download = `Card_Maker_Backup.json`;
        link.href = dataUrl;
        link.click();
    }

    loadBackup(e) {
        let reader = new FileReader();
        reader.onload = (content) => {
            let data = JSON.parse(content.target.result)
            this.cards = data.cards.map(card => new Card(card));
            this.refreshList();
            this.setCurrentCard(this.cards[0]);
            this.dom.input.load.value = null;
        };
        reader.readAsText(e.target.files[0]);
    }
}

class App {

    constructor() {
        new Manager();
    }
}

new App();