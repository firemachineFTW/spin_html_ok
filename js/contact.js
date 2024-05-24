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
        document.getElementById('title-contact').textContent = data.contact;
        document.getElementById('link-home').textContent = data.home;
        document.getElementById('link-about').textContent = data.about;
        document.getElementById('link-services').textContent = data.services;
        document.getElementById('link-contact').textContent = data.contact;
    })
    .catch(error => console.error("Error loading language file", error))
}

updateContent();

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('formEmail').addEventListener('submit', function(event){
        event.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('number').value;
        var message = document.getElementById('message').value;
        var captchaResp = grecaptcha.getResponse();
       

        if(!captchaResp){
            alert('Por favor completa el reCAPTCHA');
            return;
        }

        const data = {
            name : name,
            email : email,
            phone : phone,
            message : message,
            recaptcha : captchaResp 
        };

        fetch('php/send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data =>{
            console.log('Success', data);
            alert('Correo enviado exitosamente');
            grecaptcha.reset();
            


        })
        .catch((error)=>{
            console.error('Error', error);
            alert('Error al enviar el correo');
        });

    });

});

