const eventsNames = [
    'Drama',
    'Drama',
    'Drama',
    'Drama',
    'Drama',
    'Drama',
    'Drama',
    'Drama',
    'Drama',
    'Drama'
];
const eventsImgUrl = [
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png',
    'images/events/drama.png'
];

const eventsContainer = document.getElementsByClassName("events-container")[0];

const numberOfEvents = eventsNames.length;
let eventIndex = 1;

const createEvent = () => {
    for (j = 0; j < numberOfEvents; j++) {
        let eventsCard = document.createElement('div');
        eventsCard.className = "events-card";
        if (j == 1) {
            eventsCard.classList.add('active'); 
        }

        let eventsCardFront = document.createElement('div');
        eventsCardFront.className = "events-card-front";

        let eventsNameContainer = document.createElement('div');
        eventsNameContainer.className = "event-name";
        let eventsName = document.createTextNode(eventsNames[j]);
        eventsNameContainer.appendChild(eventsName);
        eventsCardFront.appendChild(eventsNameContainer);

        let eventsCardFrontImg = document.createElement('div');
        eventsCardFrontImg.className = "event-img"
        eventsCardFrontImg.setAttribute('style', "background-image: url('" + eventsImgUrl[j] + "')");
        eventsCardFront.appendChild(eventsCardFrontImg);

        let seperator = document.createElement('hr');
        seperator.align = 'center';
        seperator.width = '35%';
        seperator.size = '5px';
        seperator.color = '#9A6D9A';
        eventsCardFront.appendChild(seperator);

        let eventsCardFrontLink = document.createElement('div');
        eventsCardFrontLink.className = "event-link";
        eventsCardFrontLink.innerHTML = "View Details >";
        eventsCardFront.appendChild(eventsCardFrontLink);

        eventsCard.appendChild(eventsCardFront);

        eventsContainer.appendChild(eventsCard);
    }
}

const createEventDots = () => {
    const dotsContainer = document.getElementsByClassName('events-nav-dots')[0];
    for (i = 0; i < (window.innerWidth > 600) ? (numberOfEvents - 2) : numberOfEvents; i++) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        if (i === 0) {
            dot.classList.add('active-dot');
        }
        dotsContainer.appendChild(dot);
    }
}

createEventDots();
createEvent();




const changeEventSet = () => {
    const limit = numberOfEvents;
    if (eventIndex < limit) {
        eventIndex++;
        if (window.innerWidth > 600) {
            eventsContainer.style.transform = "translate(" + (-27 * (eventIndex - 1)) + "%)";
            document.getElementsByClassName('events-card')[eventIndex].classList.add('active');
        } else {
            eventsContainer.style.transform = "translate(" + (-70 * (eventIndex - 1)) + "%)";
        }
        for (dot of document.getElementsByClassName('event-nav-dot')) {
            dot.classList.remove('active-dot');
        }
        document.querySelectorAll('.events-nav-dots > .event-nav-dot')[eventIndex - 1].classList.add('active-dot')
    } else {
        eventIndex = 0;
        changeEventSet();
    }
}

const navigateEvent = (dotIndex) => {
    if (dotIndex <= 0 || dotIndex > (window.innerWidth > 600) ? (numberOfEvents - 2) : numberOfEvents) {
        for (var i = 0; i < document.querySelectorAll('.events-container .events-card').length; i++) {
            document.querySelectorAll('.events-container .events-card')[i].style.animation = "shake 0.5s";
            if(i == eventIndex){
                document.querySelectorAll('.events-container .events-card')[i].style.animation = "shakeEvents 0.5s";
            }
        }
        setTimeout(() => {
            for (var i = 0; i < document.querySelectorAll('.events-container .events-card').length; i++) {
                document.querySelectorAll('.events-container .events-card')[i].style.animation = "none";
            }
        }, 500);
        return;
    }
    if (eventIndex != dotIndex) {
        document.getElementsByClassName('events-card')[eventIndex].classList.remove('active');
        eventIndex = dotIndex - 1;
        changeEventSet();
    }
}