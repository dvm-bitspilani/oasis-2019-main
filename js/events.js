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
let setNumber = 1;
let numberOfEventsinOneSet;
if (window.innerWidth < 600) {
    numberOfEventsinOneSet = 3;
} else {
    numberOfEventsinOneSet = 3;
}
let numberOfSet = parseInt(numberOfEvents / numberOfEventsinOneSet);
let numberOfEventsinLastSet = numberOfEvents % numberOfEventsinOneSet;

const createEvent = () => {
    for (i = 0; i < numberOfSet; i++) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "events-set";
        for (j = 0; j < numberOfEventsinOneSet; j++) {
            let eventsCard = document.createElement('div');
            eventsCard.className = "events-card";

            let eventsCardFront = document.createElement('div');
            eventsCardFront.className = "events-card-front";

            let eventsNameContainer = document.createElement('div');
            eventsNameContainer.className = "event-name";
            let eventsName = document.createTextNode(eventsNames[numberOfEventsinOneSet * i + j]);
            eventsNameContainer.appendChild(eventsName);
            eventsCardFront.appendChild(eventsNameContainer);

            let eventsCardFrontImg = document.createElement('div');
            eventsCardFrontImg.className = "event-img"
            eventsCardFrontImg.setAttribute('style', "background-image: url('" + eventsImgUrl[numberOfEventsinOneSet * i + j] + "')");
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

            eventsSet.appendChild(eventsCard);
        }
        eventsContainer.appendChild(eventsSet);
    }
    if (numberOfEventsinLastSet != 0) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "events-set";
        eventsSet.style.justifyContent = 'center';
        for (j = 0; j < numberOfEventsinLastSet; j++) {
            let eventsCard = document.createElement('div');
            eventsCard.className = "events-card";

            let eventsCardFront = document.createElement('div');
            eventsCardFront.className = "events-card-front";

            let eventsNameContainer = document.createElement('div');
            eventsNameContainer.className = "event-name";
            let eventsName = document.createTextNode(eventsNames[numberOfSet * numberOfEventsinOneSet + j]);
            eventsNameContainer.appendChild(eventsName);
            eventsCardFront.appendChild(eventsNameContainer);

            let eventsCardFrontImg = document.createElement('div');
            eventsCardFrontImg.className = "event-img";
            eventsCardFrontImg.setAttribute('style', "background-image: url('" + eventsImgUrl[numberOfSet * numberOfEventsinOneSet + j] + "')");
            eventsCardFront.appendChild(eventsCardFrontImg);

            // let seperator = document.createElement('div');
            // seperator.classList = 'seperator';
            // eventsCardFront.appendChild(seperator);

            let seperator = document.createElement('hr');
            seperator.align = 'center';
            seperator.width = '3px';
            seperator.size = '20%';
            seperator.color = '#9A6D9A';
            eventsCardFront.appendChild(seperator);

            let eventsCardFrontLink = document.createElement('div');
            eventsCardFrontLink.className = "event-link";
            eventsCardFrontLink.innerHTML = "View Details >";
            eventsCardFront.appendChild(eventsCardFrontLink);

            eventsCard.appendChild(eventsCardFront);

            eventsSet.appendChild(eventsCard);
        }
        eventsContainer.appendChild(eventsSet);
    }
}

const createEventDots = () => {
    const dotsContainer = document.getElementsByClassName('events-nav-dots')[0];
    for (i = 0; i < numberOfSet; i++) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        if (i === 0) {
            dot.classList.add('active-dot');
        }
        dotsContainer.appendChild(dot);
    }
    if (numberOfEventsinLastSet != 0) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        dotsContainer.appendChild(dot);
    }
}

createEventDots();
createEvent();




const changeEventSet = () => {
    const limit = (numberOfEventsinLastSet == 0) ? numberOfSet : (numberOfSet + 1);
    if (setNumber < limit) {
        setNumber++;
        eventsContainer.style.transform = "translate(" + (-100 * (setNumber - 1)) + "%)";
        for (dot of document.getElementsByClassName('event-nav-dot')) {
            dot.classList.remove('active-dot');
        }
        document.querySelectorAll('.events-nav-dots > .event-nav-dot')[setNumber - 1].classList.add('active-dot')
    } else {
        setNumber = 0;
        changeEventSet();
    }
}

const navigateEvent = (dotIndex) => {
    if (setNumber != dotIndex) {
        setNumber = dotIndex - 1;
        changeEventSet();
    }
}