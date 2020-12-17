document.querySelector("#lang").addEventListener("click", async function (evt) {
    if (evt.target.tagName === "SPAN") {
        translator.load(evt.target.getAttribute("data-value"));
        localStorage.lang = evt.target.getAttribute("data-value")
        await miro.board.ui.closeLibrary()
        await miro.board.ui.openLibrary('web-plugin/sonjaconan.html', { title: 'Sonja et Conan contre les Ninjas' })
    }
});

function bootstrap() {
    const container = document.getElementById('scrollable-container-quick')
    const containerNinjas = document.getElementById('container-ninjas')
    const containerBarbare = document.getElementById('container-barbare')
    const containerBoard = document.querySelector('#container-board')
    addCards(containerNinjas, imgNinjas)
    addImages(containerBarbare, imgBarbare, 'small-')
    addImages(containerBoard, imgBoard, 'large-')

    let currentImageUrl
    let currentImageCard

    const imageOptions = {
        onClick: async (targetElement) => {
            currentImageUrl = targetElement.getAttribute('data-image-url')
            currentImageTag = targetElement.getAttribute('alt')
            currentImageCard = targetElement.getAttribute('data-cartes')
            const viewport = await miro.board.viewport.get()
            const x = viewport.x + (viewport.width / 2)
            const y = viewport.y + (viewport.height / 2)
            if (currentImageTag == "barbare-mots") {
                barbareDes("mots")
            } else if (currentImageTag == "barbare-phrases") {
                barbareDes("phrases")
            } else if (currentImageTag == 'techniques') {
                techniquesNinja(x, y)
            } else if (currentImageCard == "cartes") {
                createImage(x, y, currentImageUrl, "cartes")
            }
        },
        draggableItemSelector: 'img',
        getDraggableItemPreview: (targetElement) => { //drag-started
            currentImageUrl = targetElement.getAttribute('data-image-url')
            currentImageTag = targetElement.getAttribute('alt')
            currentImageCard = targetElement.getAttribute('data-cartes')
            return {
                width: 100,
                height: 100,
                url: currentImageUrl
            }
        },
        onDrop: async (canvasX, canvasY) => {
            if (currentImageTag == "techniques") {
                techniquesNinja(canvasX, canvasY)
            } else if (currentImageTag == "tapis") {
                let selectTapis = await miro.board.widgets.get({ type: 'image', metadata: { [APP_ID]: { type: "tapis" } } })
                if (selectTapis.length === 1) {
                    return miro.showNotification('Il y a déjà un tapis de jeu sur le board !')
                } else {
                    createImage(canvasX, canvasY, `${APP_URL}/img/${lang}/aide-jeu/tapis.svg`, "tapis")
                }
            } else if (currentImageCard == "cartes") {
                createImage(canvasX, canvasY, currentImageUrl, "cartes")
            }
        }
    }
    miro.board.ui.initDraggableItemsContainer(container, imageOptions)
}

miro.onReady(() => {
    UI.displayOnLoadQuick()
    bootstrap()
})
