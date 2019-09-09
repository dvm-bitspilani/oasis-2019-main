const scroll = ['home', 'about', 'videos', 'contacts'];

let hue = 0;
setInterval(() => {
    if (hue < 360) hue += 30;
    else hue = 0;

    document.getElementsByClassName("landing-wrapper")[0].style.transition = "1s";
    document.querySelectorAll(".landing-wrapper")[0].style.filter =
        "hue-rotate(" + hue + "deg)";
}, 5000);

var nav = document.getElementsByClassName("navigation")[0];

function navigate(x) {
    var sponsWrapper = document.getElementsByClassName('spons-wrapper')[0];
    if (sponsWrapper.style.display == 'block') {
        sponsWrapper.style.opacity = 0;
        setTimeout(() => {
            sponsWrapper.style.display = 'none';
        }, 600);
        document.getElementsByTagName('html')[0].style.height = 'initial';
        document.getElementsByTagName('html')[0].style.overflow = 'auto';

        document.getElementById('home').style.opacity = 1;
        document.getElementById('about').style.opacity = 1;
    }
    // location.hash = scroll[x];
    window.scrollTo(0, window.innerHeight * x)
    if (document.documentElement.scrollWidth < 500) {
        closeNav();
    }
    if (x === 0) {
        var navItems = document.getElementsByClassName("nav-item");
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].style.display = "block";
        }
        navItems[0].style.marginRight = "initial";
    }
}

function openNav() {
    nav.style.transform = "translateX(0)";
    document.getElementsByTagName('html')[0].style.height = '100vh';
    document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
}

function closeNav() {
    nav.style.transform = "translateX(-100vw)";
    document.getElementsByTagName('html')[0].style.height = 'initial';
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
}

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}


function openSpons() {
    document.getElementById('home').style.opacity = 0;
    document.getElementById('about').style.opacity = 0;
    var sponsWrapper = document.getElementsByClassName('spons-wrapper')[0];
    sponsWrapper.style.display = 'block';
    setTimeout(() => {
        sponsWrapper.style.opacity = 1;
        document.getElementsByTagName('html')[0].style.height = '100vh';
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, 100);
    if (window.innerWidth < 600) {
        closeNav();
        document.querySelectorAll("#hamburger > div")[0].style.transform = "rotate(0deg)";
        document.querySelectorAll("#hamburger > div")[2].style.transform = "rotate(0deg)";
        document.querySelectorAll("#hamburger > div")[1].style.opacity = "1";
    }

    var navItems = document.getElementsByClassName("nav-item");

    for (var i = 0; i < navItems.length; i++) {
        navItems[i].style.display = "none";
    }
    navItems[0].style.display = "block";
    navItems[0].style.marginRight = "8vw";

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

landingWrapper.style.transition = "opacity ease-out 0.5s"; // fade-in effect for content on loading
about.style.transition = "opacity ease-out 0.5s"; // fade-in effect for content on loading
navigation.style.transition = "ease-in-out 0.5s"; // fade-in effect for content on loading
register.style.transition = "opacity ease-out 0.5s";
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
};