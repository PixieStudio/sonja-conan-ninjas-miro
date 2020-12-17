// APP
const APP_ID = ''
const APP_URL = 'https://xxx.ngrok.io/static/web-plugin'

class UI {
    static displayOnLoadQuick() {
        if (localStorage.scLoad) {
            UI.displayPage(localStorage.scLoad)
        } else {
            localStorage.scLoad = 'home'
            UI.displayPage('home')
        }
    }

    static displayPage(page) {
        // Var Container
        const homeContainer = document.getElementById('home-container')
        const barbareContainer = document.getElementById('barbare-container')
        const ninjaContainer = document.getElementById('ninja-container')
        const homeTab = document.getElementById('homeTab')
        const barbareTab = document.getElementById('barbareTab')
        const ninjaTab = document.getElementById('ninjaTab')

        if (page === 'home') {
            //Set Display Page
            homeContainer.style.display = 'block'
            barbareContainer.style.display = 'none'
            ninjaContainer.style.display = 'none'
            //Set Active Navbar Tab
            homeTab.classList = 'nav-link active'
            barbareTab.classList = 'nav-link'
            ninjaTab.classList = 'nav-link'
            //Store
            localStorage.scLoad = 'home'
        } else if (page === 'barbare') {
            //Set Display Page
            homeContainer.style.display = 'none'
            barbareContainer.style.display = 'block'
            ninjaContainer.style.display = 'none'
            //Set Active Navbar Tab
            homeTab.classList = 'nav-link'
            barbareTab.classList = 'nav-link active'
            ninjaTab.classList = 'nav-link'
            //Store
            localStorage.scLoad = 'barbare'
        } else if (page === 'ninja') {
            //Set Display Page
            homeContainer.style.display = 'none'
            barbareContainer.style.display = 'none'
            ninjaContainer.style.display = 'block'
            //Set Active Navbar Tab
            homeTab.classList = 'nav-link'
            barbareTab.classList = 'nav-link'
            ninjaTab.classList = 'nav-link active'
            //Store
            localStorage.scLoad = 'ninja'
        }
    }
}

var translator = new Translator({
    persist: false,
    languages: ["fr", "en"],
    defaultLanguage: "fr",
    detectLanguage: true,
    filesLocation: "./i18n"
});

const langStored = () => {
    if (localStorage.lang) {
        return localStorage.lang
    } else {
        return "fr"
    }
}

translator.load(langStored());

let lang
localStorage.lang && localStorage.lang === 'en' ? lang = 'va' : lang = 'vf'

const imgBarbare = [
    { src: `img/${lang}/icon/barbare-mots.svg`, width: 125, height: 80, alt: 'barbare-mots' },
    { src: `img/${lang}/icon/barbare-phrases.svg`, width: 125, height: 80, alt: 'barbare-phrases' }
]

const imgNinjas = [
    { src: `img/${lang}/icon/techniques.svg`, width: 125, height: 80, alt: 'techniques' },
    { src: `img/${lang}/icon/objectif.svg`, width: 125, height: 80, alt: 'objectif' },
    { src: `img/${lang}/icon/personnage.svg`, width: 125, height: 80, alt: 'personnage' },
    { src: `img/${lang}/icon/objet.svg`, width: 125, height: 80, alt: 'objet' },
    { src: `img/${lang}/icon/lieu.svg`, width: 125, height: 80, alt: 'lieu' },
    { src: `img/${lang}/icon/vierge.svg`, width: 125, height: 80, alt: 'vierge' }
]

const imgBoard = [
    { src: `img/${lang}/icon/tapis.svg`, width: 258, height: 80, alt: 'tapis' }
]

function getCards(img) {
    return `<div class="small-draggable-item small-image-box">
                        <img src="${img.src}" alt="${img.alt}" data-cartes="cartes" data-image-url="${APP_URL}/img/${lang}/cartes/${img.alt}.svg">
                        </div>
                        `
}

function getImages(img, size) {
    return `<div class="${size}draggable-item ${size}image-box">
                        <img src="${img.src}" alt="${img.alt}" data-image-url="${APP_URL}/img/${lang}/icon/${img.alt}.svg">
                        </div>
                        `
}

function addImages(container, images, size) {
    container.innerHTML += images.map(i => getImages(i, size)).join('')
}

function addCards(container, images) {
    container.innerHTML += images.map(i => getCards(i)).join('')
}
