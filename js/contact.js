const toggleBtn = document.querySelector('.toggle-btn')
        const toggleBtnIcon = document.querySelector('.toggle-btn i')
        const dropdownMenu = document.querySelector('.dropdown_menu')

        toggleBtn.onclick = function(){
            dropdownMenu.classList.toggle('open')
            const isOpen = dropdownMenu.classList.contains('open')

            toggleBtnIcon.classList = isOpen
                ? 'fa-solid fa-xmark'
                : 'fa-solid fa-bars'
        }

let currentLanguage = 'en';

function changeLanguage(language){
    document.getElementById('btn-es').classList.remove('active');
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-' + language).classList.add('active');

    currentLanguage = language;
    updateContent();
}

function updateContent(){
    fetch(`${currentLanguage}.json`)
    .then(response => response.json())
    .then(data =>{
        document.getElementById('title-contact').textContent = data.btn_contact;
        document.getElementById('link-home').textContent = data.btn_home;
        document.getElementById('link-about').textContent = data.btn_about;
        document.getElementById('link-services').textContent = data.btn_services;
        document.getElementById('link-contact').textContent = data.btn_contact;
    })
    .catch(error => console.error("Error loading language file", error))
}

updateContent();