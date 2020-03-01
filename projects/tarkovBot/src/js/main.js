// >>> FAQ с анимацией <<<

function faq() {

    let accordion = document.querySelector('.faq__accordion');

    document.querySelector('.accordion-active .faq__answer').style.height = document.querySelector('.accordion-active .faq__answer').scrollHeight + "px";

    accordion.addEventListener('click', function () {

        if (event.target.classList.contains('faq__accordion') ||
            event.target.closest('.faq__item').classList.contains('accordion-active')) { return; }

        if (event.target.classList.contains('faq__question') || event.target.classList.contains("faq__question-text") || event.target.tagName == "IMG") {
            if (document.querySelector('.accordion-active') != undefined) {
                document.querySelector('.accordion-active').querySelector('.faq__answer').style.height = "0px";
                document.querySelector('.accordion-active').classList.remove('accordion-active');
            }
            event.target.closest('.faq__item').classList.add('accordion-active');
            event.target.closest('.faq__item').querySelector('.faq__answer').style.height = event.target.closest('.faq__item').querySelector('.faq__answer').scrollHeight + "px";
        }
    })

}

function mobileMenuConfiguration() {

    document.querySelector('.welcome__burgerIcon').addEventListener('click', function () {
        document.getElementById('background-overlay').classList.add('flex');
        setTimeout(() => { document.getElementById('background-overlay').classList.add('opacity-1'); })
        document.querySelector('.mobileMenu').classList.add('flex');
        setTimeout(() => { document.querySelector('.mobileMenu').classList.add('mobileOn'); })
        console.log("wfewfe");
    })

    document.getElementById('background-overlay').addEventListener('click', closeOverlay);
    document.querySelector('.mobileMenu__close').addEventListener('click', closeOverlay);
    document.getElementById('mobileMenu-closeOverlay').addEventListener('click', closeOverlay);

    function closeOverlay() {
        document.getElementById('background-overlay').addEventListener('transitionend', localClose);
        document.getElementById('background-overlay').classList.remove('opacity-1');
        document.querySelector('.mobileMenu').classList.remove('mobileOn');

        function localClose() {
            console.log('opa');
            document.querySelector('.mobileMenu').classList.remove('flex');
            document.getElementById('background-overlay').classList.remove('flex');
            document.getElementById('background-overlay').removeEventListener('transitionend', localClose);
        }

    }

}

function showVideo() {

    let triggerVideo = document.querySelectorAll('.triggerVideo');

    triggerVideo.forEach(element => {
        element.addEventListener('click', () => {
            document.getElementById('video').classList.add('overlay-active');
            setTimeout(() => {
                document.getElementById('video').classList.add('opacity-1');
            })
            let iframe = document.getElementById('iframe-youtube').contentWindow;
            iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        })
    })

}

function closeVideo() {

    let overlay;

    document.getElementById('video').addEventListener('click', () => {
        if (event.target.classList.contains('overlay') || event.target.classList.contains('container')) {
            overlay = event.target.closest('.overlay');
            // здесь ебля с айфрейм
            let iframe = document.getElementById('iframe-youtube').contentWindow;
            iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            overlay.classList.remove('opacity-1');
            overlay.addEventListener('transitionend', correctClosing);
        }
    })

    let correctClosing = () => {
        overlay.classList.remove('overlay-active');
        overlay.removeEventListener('transitionend', correctClosing);
    }

}


faq();
mobileMenuConfiguration();
showVideo();
closeVideo();