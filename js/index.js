const scroll = ['home', 'about', 'videos', 'contacts'];

let hue = 0;
setInterval(() => {

    hue += 0.1;

    document.getElementsByClassName("landing-wrapper")[0].style.transition = "filter 5s ease";
    document.querySelectorAll(".landing-wrapper")[0].style.filter =
        "hue-rotate(" + hue + "turn)";
}, 5000);

var nav = document.getElementsByClassName("navigation")[0];

function navigate(x) {
    for (i = 0; i < tagNames.length; i++) {
        const tempTag = tagNames[i];
        document.getElementById(tempTag).style.opacity = 0;
        setTimeout(() => {
            document.getElementById(tempTag).style.display = 'none';
        }, 100);
    }
    
    document.getElementsByTagName('html')[0].style.height = 'initial';
    document.getElementsByTagName('html')[0].style.overflowY = 'auto';

    document.getElementById('home').style.opaty = 1;
    document.getElementById('about').style.opacity = 1;
    
    // location.hash = scroll[x];
    window.scrollTo(0, window.innerHeight * x)
    if (document.documentElement.scrollWidth < 500) {
        closeNav();
    } else {
        const hamIcon = document.getElementsByClassName('toggle-icon')[0];
        const sideBar = document.getElementsByClassName('side-bar')[0];
        hamIcon.classList.remove("pushed");
        sideBar.style.transform = "translateX(25vw)";
        document.getElementsByClassName('backdrop')[0].style.display = 'none';
    }
    var navItems = document.querySelectorAll(".navigation .nav-item");
    if (window.innerWidth < 600) {
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].style.display = "inline-block";
        }
    } else {
        navItems[0].style.display = "inline-block";
        navItems[2].style.display = "inline-block";
        navItems[3].style.display = "inline-block";
    }
    const hamItems = document.querySelectorAll('.side-bar .nav-item');
    hamItems[0].style.display = "none";
    hamItems[2].style.display = "none";
    hamItems[3].style.display = "none";
}

function openNav() {
    window.scrollTo(0, 0);
    nav.style.transform = "translateX(0)";
    document.getElementsByTagName('html')[0].style.height = '100vh';
    document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    document.getElementsByClassName('backdrop')[0].style.display = 'block';
}

function closeNav() {
    nav.style.transform = "translateX(-100vw)";
    document.getElementsByTagName('html')[0].style.height = 'initial';
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
    document.getElementsByClassName('backdrop')[0].style.display = 'none';
}


if (window.innerWidth < 500) {
    let initialXContact = null;
    let initialYContact = null;

    function startTouchContact(e) {
        initialXContact = e.touches[0].clientX;
        initialYContact = e.touches[0].clientY;
    };

    function moveTouchContact(e) {

        if (initialXContact === null) {
            return;
        }

        if (initialYContact === null) {
            return;
        }

        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;

        let diffX = initialXContact - currentX;
        let diffY = initialYContact - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
                // swiped left
                closeNav();
            } else {
                // swiped right
                openNav();
            }
        }
        initialXContact = null;
        initialYContact = null;

        e.preventDefault();

    };


    document.getElementById('home').addEventListener("touchstart", startTouchContact, false);
    document.getElementById('home').addEventListener("touchmove", moveTouchContact, false);
    document.getElementsByClassName('navigation')[0].addEventListener("touchstart", startTouchContact, false);
    document.getElementsByClassName('navigation')[0].addEventListener("touchmove", moveTouchContact, false);
    document.getElementsByClassName('backdrop')[0].addEventListener("touchstart", startTouchContact, false);
    document.getElementsByClassName('backdrop')[0].addEventListener("touchmove", moveTouchContact, false);
    document.getElementsByClassName('spons-wrapper')[0].addEventListener("touchstart", startTouchContact, false);
    document.getElementsByClassName('spons-wrapper')[0].addEventListener("touchmove", moveTouchContact, false);
}


window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}


const tagNames = ['events', 'sponsors', 'developers'];
function openTags(tagName) {
    for (i = 0; i < tagNames.length; i++) {
        const tempTag = tagNames[i];
        if (tempTag != tagName) {
            document.getElementById(tempTag).style.opacity = 0;
            setTimeout(() => {
                document.getElementById(tempTag).style.display = 'none';
            }, 100);
        }
    }
    document.getElementById('home').style.opacity = 0;
    document.getElementById('about').style.opacity = 0;
    var tagPage = document.getElementById(tagName);
    tagPage.style.display = 'block';
    setTimeout(() => {
        tagPage.style.opacity = 1;
        document.getElementsByTagName('html')[0].style.height = '100vh';
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, 100);

    if (window.innerWidth < 600) {
        closeNav();
    } else {        
        const hamIcon = document.getElementsByClassName('toggle-icon')[0];
        const sideBar = document.getElementsByClassName('side-bar')[0];
        hamIcon.classList.remove("pushed");
        sideBar.style.transform = "translateX(25vw)";
    }
    
    setTimeout(() => {
        const hamItems = document.querySelectorAll('.side-bar .nav-item');
        hamItems[0].style.display = "inline-block";
        hamItems[2].style.display = "inline-block";
        hamItems[3].style.display = "inline-block";
    }, 100);

    var navItems = document.querySelectorAll(".navigation .nav-item");

    if (window.innerWidth > 600) {
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].style.display = "none";
        }
    }
}



"use strict";

// loader
let loaderWrapper = document.getElementById("loader-wrapper");
let mainLoader = document.getElementById("main-loader");
let oasisTitle = document.getElementsByClassName("oasis-li");
let oasisSlogan = document.getElementById("oasis-slogan");
let oasisText = document.getElementById("oasis-text");
let oasisDate = document.getElementById("oasis-date");
let contentWrapper = document.getElementById("content-wrapper");

let about = document.getElementsByClassName("about")[0];
let landingWrapper = document.getElementsByClassName("landing-wrapper")[0];
let navigation = document.getElementsByClassName("navigation")[0];
let register = document.getElementsByClassName("mobile-register")[0];
let hamIcon = document.getElementsByClassName("toggle-icon")[0];

landingWrapper.style.transition = "opacity ease-out 0.5s"; // fade-in effect for content on loading
about.style.transition = "opacity ease-out 0.5s"; // fade-in effect for content on loading
navigation.style.transition = "ease-in-out 0.5s"; // fade-in effect for content on loading
register.style.transition = "opacity ease-out 0.5s";
hamIcon.style.transition = "opacity ease-out 0.5s";
document.getElementById('hamburger').style.transition = "opacity ease-out 0.5s";
document.getElementsByClassName('mobile-register')[0].style.transition = "opacity ease-out 0.5s";

window.onload = function() {
    for (let i = 0; i < oasisTitle.length; i++)
        oasisTitle[i].classList.add("title-smoke");
    oasisSlogan.classList.add("slogan-fade-in");
    loaderWrapper.classList.add("wrapper-fade-out");
    mainLoader.classList.add("loader-transition");
    oasisText.classList.add("text-fade-out");
    oasisDate.classList.add("text-fade-out");

    setTimeout(function() {
        loaderWrapper.style.display = "none";

        document.getElementsByTagName("body")[0].style.overflowY = "auto";
        loaderWrapper.style.display = "none";
        // document.getElementsByClassName("bottom-div")[0].style.opacity = "1";
        landingWrapper.style.opacity = 1;
        about.style.opacity = 1;
        navigation.style.opacity = 1;
        register.style.opacity = 1;
        hamIcon.style.opacity = 1;
        document.getElementById('hamburger').style.opacity = 1
        document.getElementsByClassName('mobile-register')[0].style.opacity = 1;
        document.getElementsByTagName('html')[0].style.overflowY = 'auto';
        // document.getElementsByClassName("nav-bar")[0].style.display = "flex";
        // document.getElementsByClassName("sidebar")[0].style.display = "flex";
        // if (window.innerWidth > 500)
        //   document.getElementsByClassName("navigator")[0].style.display = "flex";
        // if (window.innerWidth < 500) {
        //   document.getElementsByClassName("navigator")[0].style.display = "none";
    }, 3500);
    fetchEvents();
};


// -------------------------------------toggle desktop hamburger--------------------------------------------------
document.getElementsByClassName('toggle-icon')[0].addEventListener('click', toggleDesktopHam)
function toggleDesktopHam() {
    const hamIcon = document.getElementsByClassName('toggle-icon')[0];
    const sideBar = document.getElementsByClassName('side-bar')[0];
    if (hamIcon.classList.contains('pushed')) {
        hamIcon.classList.remove("pushed");
        sideBar.style.transform = "translateX(25vw)";
        document.getElementsByClassName('backdrop')[0].style.display = 'none';
        document.getElementsByTagName('html')[0].style.overflowY = 'auto';
    } else {
        hamIcon.classList.add('pushed');
        sideBar.style.transform = "translateX(0)";
        document.getElementsByClassName('backdrop')[0].style.display = 'block';
        document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    }
}
