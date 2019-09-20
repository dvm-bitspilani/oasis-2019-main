let screenWidth = window.innerWidth;
let cards = document.getElementsByClassName("cards");
let currentCard = 1;
let numberOfCards = cards.length;

// window.addEventListener("resize", () => {
//     screenWidth = window.innerWidth;
//     currentCard = 1;
//     if (screenWidth < 700) {
//         for (let i = 1; i < cards.length; i++) {
//             cards[i].style.opacity = 0;
//         }
//         cards[0].style.display = "grid";
//     } else {
//         for (let i = 0; i < cards.length; i++) {
//             // cards[i].style.display = "grid";
//             cards[i].style.opacity = 1;
//             cards[i].style.transform = "scale(1)";
//         }
//     }
// });

if (screenWidth < 700) {
    currentCard = 1;
    for (let i = 1; i < cards.length; i++) {
        // cards[i].style.display = "none";
        cards[i].style.opacity = 0;
    }
    cards[currentCard - 1].style.display = "grid";
} else {
    for (let i = 0; i < cards.length; i++) {
        // cards[i].style.display = "grid";
        cards[i].style.opacity = 1;

    }

}

let leftButton = document.getElementsByClassName("arrow-left")[0];
let rightButton = document.getElementsByClassName("arrow-right")[0];
rightButton.addEventListener("click", next);
leftButton.addEventListener("click", back);


function next() {
    cards[currentCard - 1].style.transform = "scale(0.5) translateX(-50%) translateY(-50%)";
    currentCard = currentCard + 1;
    if (currentCard > numberOfCards) {
        currentCard = 1;
    }
    for (let i = 0; i < cards.length; i++) {
        // cards[i].style.display = "none";
        cards[i].style.opacity = 0;
    }
    cards[currentCard - 1].style.opacity = 1;
    cards[currentCard - 1].style.transform = "scale(1.05) translateX(-50%) translateY(-50%)";
    // cards[currentCard-1].style.transition = "0.25s";
    setTimeout(() => {
        cards[currentCard - 1].style.transform = "scale(1) translateX(-50%) translateY(-50%)";
    }, 350);

}

function back() {
    cards[currentCard - 1].style.transform = "scale(0.5) translateX(-50%) translateY(-50%)";

    currentCard = currentCard - 1;
    if (currentCard == 0) {
        currentCard = cards.length;
    }
    for (let i = 0; i < cards.length; i++) {
        // cards[i].style.display = "none";
        cards[i].style.opacity = 0;
    }
    cards[currentCard - 1].style.opacity = 1;
    cards[currentCard - 1].style.transform = "scale(1.05) translateX(-50%) translateY(-50%)";
    setTimeout(() => {
        cards[currentCard - 1].style.transform = "scale(1) translateX(-50%) translateY(-50%)";
    }, 350);

}

let initialX = null;
let initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;

    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            next();
        } else {
            // swiped right
            back();
        }
    }
    initialX = null;
    initialY = null;

    e.preventDefault();

};

document.getElementsByClassName("video-wrapper")[0].addEventListener("touchstart", startTouch, false);
document.getElementsByClassName("video-wrapper")[0].addEventListener("touchmove", moveTouch, false);