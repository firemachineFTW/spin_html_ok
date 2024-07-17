
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

function scrollToSection(sectionId){
    const section = document.getElementById(sectionId);
    if(section){
        section.scrollIntoView({behavior: 'smooth'});
    }
}

let currentLanguage = 'en';

function changeLanguage(language){
    document.getElementById('btn-es').classList.remove('active');
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-' + language).classList.add('active');

    currentLanguage = language;
    localStorage.setItem('language', language);
    updateContent();
}

function updateContent(){
    let savedLanguage = localStorage.getItem('language');
    currentLanguage = savedLanguage ? savedLanguage : 'en';

    fetch(`${currentLanguage}.json`)
    .then(response => response.json())
    .then(data =>{
        document.getElementById('title-services').textContent = data.services;
        document.getElementById('link-home').textContent = data.home;
        document.getElementById('link-about').textContent = data.about;
        document.getElementById('link-services').textContent = data.services;
        document.getElementById('link-contact').textContent = data.contact;

        document.getElementById('link-home-d').textContent = data.home;
        document.getElementById('link-about-d').textContent = data.about;
        document.getElementById('link-services-d').textContent = data.services;
        document.getElementById('link-contact-d').textContent = data.contact;

        document.getElementById('build-work').textContent = data.build_work;
        document.getElementById('hvac').textContent = data.hvac;
        document.getElementById('e-install').textContent = data.e_install;

        document.getElementById('build-works').textContent = data.build_work;
        document.getElementById('archtc').textContent = data.archtc;
        document.getElementById('struct').textContent = data.struct;
        document.getElementById('hydra').textContent = data.hydr;
        document.getElementById('roadw').textContent = data.roadw;

        document.getElementById('new-build').textContent = data.new_build;
        document.getElementById('masonr').textContent = data.masonr;
        document.getElementById('concrt').textContent = data.concrt;
        document.getElementById('metals').textContent = data.metals;
        document.getElementById('concret').textContent = data.concret;

        document.getElementById('renovation').textContent = data.renovation;
        document.getElementById('finish').textContent = data.finish;
        document.getElementById('drywall').textContent = data.drywall;
        document.getElementById('cancel').textContent = data.cancel;
        document.getElementById('floors').textContent = data.floors;
        document.getElementById('paint').textContent = data.paint;
        document.getElementById('areaa').textContent = data.areaa;

        document.getElementById('hvacs').textContent = data.hvac;
        document.getElementById('confort').textContent = data.confort;
        document.getElementById('humidt').textContent = data.humidt;
        document.getElementById('aircon').textContent = data.aircon;
        document.getElementById('coolin').textContent = data.coolin;
        document.getElementById('heats').textContent = data.heats;

        document.getElementById('cooling').textContent = data.cooling;
        document.getElementById('consrv').textContent = data.consrv;
        document.getElementById('freezr').textContent = data.freezr;
        document.getElementById('tunels').textContent = data.tunels;
        document.getElementById('restr').textContent = data.restr;

        document.getElementById('p-control').textContent = data.p_control;
        document.getElementById('dustc').textContent = data.dustc;
        document.getElementById('odorc').textContent = data.odorc;
        document.getElementById('gasctrl').textContent = data.gasctrl;

        document.getElementById('s-facilities').textContent = data.s_facilities;
        document.getElementById('telecom').textContent = data.telecom;
        document.getElementById('switc').textContent = data.switc;
        document.getElementById('multil').textContent = data.multl;
        document.getElementById('interc').textContent = data.interc;
        document.getElementById('swtchs').textContent = data.swtchs

        document.getElementById('indstr').textContent = data.indstr;
        document.getElementById('nrgsv').textContent = data.nrgsv;

        document.getElementById('special-install').textContent = data.special_install;
        document.getElementById('firdt').textContent = data.firdt;
        document.getElementById('illmn').textContent = data.illmn;
        document.getElementById('ambnt').textContent = data.ambnt;
        document.getElementById('pumpc').textContent = data.pumpc;
        document.getElementById('alert').textContent = data.alert;

        document.getElementById('electric-install').textContent = data.electric_install;

        document.getElementById('project').textContent = data.projct;
        document.getElementById('feeders').textContent = data.feedrs;
        document.getElementById('lighting').textContent = data.lightng;
        document.getElementById('contact-system').textContent = data.cntact_system;
        document.getElementById('grounding').textContent = data.grnding;
        document.getElementById('arrester').textContent = data.arrstr;
        document.getElementById('short-circuit').textContent = data.shrt_crct;
        document.getElementById('protective-device').textContent = data.prtctiv_coord;

        document.getElementById('installation').textContent = data.installation;

        document.getElementById('channeling').textContent = data.chnnlng;
        document.getElementById('cabling').textContent = data.cblng;
        document.getElementById('boards').textContent = data.brds_dstrbtn;
        document.getElementById('engine-control').textContent = data.cntrl_cntr;
        document.getElementById('transformer').textContent = data.trnsfrmr;
        document.getElementById('arrester-system').textContent = data.arrstr_systms;

        document.getElementById('maintenance').textContent = data.mntnnce;

        document.getElementById('substations').textContent = data.sbstns;
        document.getElementById('energy-monitoring').textContent = data.nrg_mntrng;


    })
    .catch(error => console.error("Error loading language file", error))

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


window.addEventListener('scroll', reveal);

function reveal(){
    let reveals = document.querySelectorAll('.reveal');

    for(let i = 0; i < reveals.length; i++){
        windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 250;
      

        if(revealTop < windowHeight - revealPoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i].classList.remove('active');
        }
    }
}

