'use-strict'

const toggleBtn = document.querySelector('.toggle-btn')
const toggleBtnIcon = document.querySelector('.toggle-btn i')
const dropdownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function () {
    dropdownMenu.classList.toggle('open')
    const isOpen = dropdownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}

const items = document.querySelectorAll('.slider .list .item');
const next = document.querySelector('.arrows .next');
const prev = document.querySelector('.arrows .prev');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 10000)
function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    itemActiveOld.classList.remove('active');


    // active new item
    items[itemActive].classList.add('active');


    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 10000)
}

let currentLanguage = 'en'; // Establece el idioma predeterminado

function changeLanguage(language) {
    document.getElementById('btn-es').classList.remove('active');
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-' + language).classList.add('active');

    currentLanguage = language;
    localStorage.setItem('language', language);
    updateContent();
}

function updateContent() {
    let savedLanguage = localStorage.getItem('language');
    currentLanguage = savedLanguage ? savedLanguage : 'en';

    fetch(`${currentLanguage}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('tittle-home').textContent = data.home;
            document.getElementById('link-home').textContent = data.home;
            document.getElementById('link-about').textContent = data.about;
            document.getElementById('link-services').textContent = data.services;
            document.getElementById('link-contact').textContent = data.contact;

            document.getElementById('link-home-d').textContent = data.home;
            document.getElementById('link-about-d').textContent = data.about;
            document.getElementById('link-services-d').textContent = data.services;
            document.getElementById('link-contact-d').textContent = data.contact;

            document.getElementById('slogan').textContent = data.slogan;

            document.getElementById('quienes-somos').textContent = data.about_us;
            document.getElementById('quienes-somos-p').textContent = data.about_us_p;

            document.getElementById('seguridad-i').textContent = data.safety_i;
            document.getElementById('seguridad-p').textContent = data.safety_p;



            // Actualiza más textos aquí según sea necesario
        })
        .catch(error => console.error('Error loading language file:', error));

        document.getElementById('btn-' + currentLanguage).classList.add('active');

}

document.addEventListener('DOMContentLoaded', ()=>{
    let savedLanguage = localStorage.getItem('language');
    if(savedLanguage){
        currentLanguage = savedLanguage;
    }else{
        currentLanguage = 'en';
    }
    document.getElementById('btn-' + currentLanguage).classList.add('active');
    updateContent();
});







