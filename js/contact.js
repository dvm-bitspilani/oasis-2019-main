var cardsContact = document.getElementsByClassName("des-card");

var cardDiv = document.getElementsByClassName("Cards-div")[0];

let widthParent = cardDiv.width;
let widthCards = cards[0].width;
let group = 0;
let noOfCards;

let leftButtonContact = document.getElementsByClassName("arrow-left-contact")[0];
let rightButtonContact = document.getElementsByClassName("arrow-right-contact")[0];
rightButtonContact.addEventListener("click", nextContact);
leftButtonContact.addEventListener("click", backContact);
let widthScreen = window.innerWidth;

function displayAll() {
    for (var i = 0; i < cardsContact.length; i++) {
        cardsContact[i].style.display = "flex";
    }
    group = 1;
    noOfCards = 8;
}

function nextContact() {
    rightButtonContact.removeEventListener("click", nextContact);
    setTimeout(function() {
        rightButtonContact.addEventListener("click", nextContact);
    }, 450);
    if (group < noOfGroups) {
        group = group + 1;
        for (var i = 0; i < cardsContact.length; i++) {
            if (i >= (group - 1) * noOfCards & i < ((group - 1) * noOfCards + noOfCards)) {
                setTimeout(() => {
                    card.style.display = "flex";
                }, 201);
                let card = cardsContact[i];
                setTimeout((i) => {
                    card.style.opacity = "1";
                }, 450);
            } else {
                document.getElementsByClassName("Cards-div")[0].style.transform = "scale(0)";
                let card = cardsContact[i];
                setTimeout(function() {
                    card.style.display = "none";
                    document.getElementsByClassName("Cards-div")[0].style.transform = "scale(1)";
                }, 200);
            }
        }
    } else {
        group = 0;
        nextContact();
    }
}

function backContact() {

    if (group > 1) {
        group = group - 1;
        for (var i = 0; i < cardsContact.length; i++) {
            if (i >= (group - 1) * noOfCards & i < ((group - 1) * noOfCards + noOfCards)) {
                setTimeout(() => {
                    card.style.display = "flex";
                }, 201);
                let card = cardsContact[i];
                setTimeout((i) => {
                    card.style.opacity = "1";
                }, 450);
            } else {
                document.getElementsByClassName("Cards-div")[0].style.transform = "scale(0)";
                let card = cardsContact[i];
                setTimeout(function() {
                    card.style.display = "none";
                    document.getElementsByClassName("Cards-div")[0].style.transform = "scale(1)";
                }, 200);
            }
        }
    } else {
        group = noOfGroups - 1;
        nextContact();
    }
}

function divideToGroups() {
    if (widthScreen > 966) {
        displayAll();
        noOfCards = 3;
        group = 1;
        noOfGroups = Math.ceil(cardsContact.length / noOfCards);
        for (var i = 0; i < cardsContact.length; i++) {
            if (i >= noOfCards) {
                cardsContact[i].style.display = "none";
                // cardsContact[i].style.opacity = "0";
            }
        }
    }

    if (widthScreen < 700 & widthScreen > 500) {
        displayAll();
        noOfCards = 2;
        group = 1;
        noOfGroups = Math.ceil(cardsContact.length / noOfCards);
        for (var i = 0; i < cardsContact.length; i++) {
            if (i >= noOfCards) {
                cardsContact[i].style.display = "none";
            }
        }
    }

    if (widthScreen < 500) {
        displayAll();
        noOfCards = 1;
        group = 1;
        noOfGroups = Math.ceil(cardsContact.length / noOfCards);
        for (var i = 0; i < cardsContact.length; i++) {
            if (i >= noOfCards) {
                cardsContact[i].style.display = "none";
            }
        }
    }
}

window.addEventListener("resize", () => {
    divideToGroups();
});

divideToGroups();

window.addEventListener("keydown", keyMove);

function keyMove() {
    if (window.event.key == "s" || window.event.key == "a" || window.event.key == "ArrowDown" || window.event.key == "ArrowLeft") {
        backContact();
    } else if (window.event.key == " " || window.event.key == "w" || window.event.key == "d" || window.event.key == "ArrowUp" || window.event.key == "ArrowRight") {
        nextContact();
    }
}


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
            nextContact();
        } else {
            // swiped right
            backContact();
        }
    }
    initialXContact = null;
    initialYContact = null;

    e.preventDefault();

};


document.getElementsByClassName("Contact-div")[0].addEventListener("touchstart", startTouchContact, false);
document.getElementsByClassName("Contact-div")[0].addEventListener("touchmove", moveTouchContact, false);




var profpic = [
    "Kartikeya.JPG",
    // "Parth.jpg",
    "Nischay.jpg",
    "Rishabh.jpg",
    "Ruchir.jpg",
    "Sujith.png",
    "Rutul.jpeg",
    "rahul.jpg",
    "abhi.jpg"
];

var url = "images/contacts/";

for (var i = 0; i < document.getElementsByClassName("prof-pic").length; i++) {
    document.getElementsByClassName("prof-pic")[i].src = url + profpic[i];
}