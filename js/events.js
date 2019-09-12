const URL = "https://bits-oasis.org/registrations/events_details/";

let ALL_EVENTS;

const eventsNames = [
    'Dance',
    'Drama',
    'Fine Art',
    'Music',
    'Photography',
    'Fashion',
    'Oratory',
    'Quizzing',
    'Humour',
    'Films',
    'Miscellaneous'
];

function fetchEvents() {
    fetch(URL).then(resp => resp.json())
    .then(function(response) {
        ALL_EVENTS = response
    });
}

const eventsImgUrl = [
    'images/events/dance.svg',
    'images/events/drama.svg',
    'images/events/fine arts.svg',
    'images/events/music.svg',
    'images/events/photography.svg',
    'images/events/fashion.svg',
    'images/events/oratory.svg',
    'images/events/quizzing.svg',
    'images/events/humour.svg',
    'images/events/film fest.svg',
    'images/events/misc.svg'
];

const eventsContainer = document.getElementsByClassName("events-container")[0];

const numberOfEvents = eventsNames.length;
let eventIndex = 1;

const createEvent = (parentAppend) => {
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

        parentAppend.appendChild(eventsCard);
        const eventType = eventsNames[j];
        eventsCardFrontLink.addEventListener('click', () => {
            openAllEvents(eventType)
        });
    }
}

const createEventDots = () => {
    const dotsContainer = document.getElementsByClassName('events-nav-dots')[0];
    for (i = 0; i < ((window.innerWidth > 600) ? (numberOfEvents - 2) : numberOfEvents); i++) {
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
createEvent(eventsContainer);
createEvent(document.getElementsByClassName('all-events-type-container')[0]);




const changeEventSet = () => {
    const limit = numberOfEvents;
    if (eventIndex < limit) {
        eventIndex++;
        if (window.innerWidth > 600) {
            eventsContainer.style.transform = "translate(" + (-27 * (eventIndex - 1)) + "%)";
        } else {
            eventsContainer.style.transform = "translate(" + (-100 * (eventIndex - 1)) + "%)";
        }
        (eventIndex == numberOfEvents) ? null : document.getElementsByClassName('events-card')[eventIndex].classList.add('active');
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
    if (dotIndex <= 0 || dotIndex > ((window.innerWidth > 600) ? (numberOfEvents - 2) : numberOfEvents)) {
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
        (eventIndex == numberOfEvents) ? null : document.getElementsByClassName('events-card')[eventIndex].classList.remove('active');
        eventIndex = dotIndex - 1;
        changeEventSet();
    }
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
                navigateEvent(eventIndex + 1);
            } else {
                // swiped right
                navigateEvent(eventIndex - 1);
            }
        }
        initialXContact = null;
        initialYContact = null;

        e.preventDefault();

    };


    document.getElementsByClassName('events')[0].addEventListener("touchstart", startTouchContact, false);
    document.getElementsByClassName('events')[0].addEventListener("touchmove", moveTouchContact, false);
}


function openAllEvents(type) {
    document.getElementById('event-details').style.display = 'flex';
    document.getElementsByClassName('event-type')[0].innerHTML = type;
    setTimeout(() => {
        document.getElementById('event-details').style.opacity = 1;
    }, 10);

    document.getElementsByClassName('all-events')[0].innerHTML = '';

    const eventNames = [];
    ALL_EVENTS.map(event => {
        if (event.category_name == type) {
            event.events.map(eve => {
                eventNames.push(eve.name);
            });
        }
        if (type == 'Miscellaneous') {
            if (event.category_name == 'Entertainment') {
                event.events.map(eve => {
                    eventNames.push(eve.name);
                });
            }
            if (event.category_name == 'Writing') {
                event.events.map(eve => {
                    eventNames.push(eve.name);
                });
            }
        }
    });
    
    eventNames.map(eventName => {
        const event = document.createElement('div');
        const eventText = document.createElement('span');
        eventText.innerHTML = eventName;
        event.className = 'event';
        event.appendChild(eventText);
        document.getElementsByClassName('all-events')[0].appendChild(event);
        eventText.addEventListener('click', () => viewEventDetails(eventName, type));
    });
}

function closeEventDetails() {
    document.getElementById('event-details').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('all-events-tab').style.opacity = 1;
        document.getElementById('event-details-tab').style.opacity = 0;
        document.getElementById('all-events-tab').style.display = 'flex';
        document.getElementById('event-details-tab').style.display = 'none';
        document.getElementById('event-details').style.display = 'none';
    }, 500);
}

function viewEventDetails(eventName, eventType) {
    document.getElementById('all-events-tab').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('all-events-tab').style.display = 'none';
        document.getElementById('event-details-tab').style.display = 'flex';

        document.getElementsByClassName('event-detail-name')[0].innerHTML = eventName;
        ALL_EVENTS.map(event => {
            if (event.category_name == eventType) {
                event.events.map(eve => {
                    if (eve.name == eventName) {
                        changeEventData(eve);
                    }
                });
            }
            if (eventType == 'Miscellaneous') {
                if (event.category_name == 'Entertainment') {
                    event.events.map(eve => {
                        if (eve.name == eventName) {
                            changeEventData(eve);
                        }
                    });
                }
                if (event.category_name == 'Writing') {
                    event.events.map(eve => {
                        if (eve.name == eventName) {
                            changeEventData(eve);
                        }
                    });
                }
            }
        });
        
        setTimeout(() => {
            document.getElementById('event-details-tab').style.opacity = 1;
        }, 10);
    }, 250);
}

function backEventDetails() {
    document.getElementById('event-details-tab').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('event-details-tab').style.display = 'none';
        document.getElementById('all-events-tab').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('all-events-tab').style.opacity = 1;
        }, 10);
    }, 250);
}

function changeEventData(event) {
    document.querySelector('.event-day > span').innerHTML = event.date_time;
    document.querySelector('.event-time > span').innerHTML = event.time;
    document.querySelector('.event-venue > span').innerHTML = event.venue;
    
    document.querySelectorAll('.event-description > div')[1].innerHTML = event.details;
    document.querySelectorAll('.event-rules > div')[1].innerHTML = event.rules;
}


function showAllEvents() {
    document.getElementsByClassName('all-events-type')[0].style.display = 'block';
    setTimeout(() => {
        document.getElementsByClassName('all-events-type')[0].style.opacity = 1;
    }, 10)
}

function backAllEvents() {
    document.getElementsByClassName('all-events-type')[0].style.opacity = 0;
    setTimeout(() => {
        document.getElementsByClassName('all-events-type')[0].style.display = 'none';
    }, 500)
}