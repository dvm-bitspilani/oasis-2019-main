var textarea = document.getElementById("textarea_type");
var eventlist = document.getElementsByClassName("events_el");
var msg_box = document.getElementsByClassName("msg-box")[0];
var close_box = document.getElementsByClassName("close-box")[0];
var selected_events = document.getElementsByClassName("selected-events")[0];
var eventsinput = document.getElementById("events_input");
var appendevent = document.getElementsByClassName("events-list")[2];
var eventsidarr = [];
var collegeid;
var i = 0;
var no_of_events;
var display = true;
var display2 = true;
var display3 = true;
var display4 = true;
var random = true;


function displaylist() {
  if (display == true) {
    document.getElementsByClassName("events-list")[2].style.display = "flex";
    document.getElementsByClassName("events-list")[1].style.display = "none";
    document.getElementsByClassName("events-list")[0].style.display = "none";
    display = false;
  } else if (display == false) {
    document.getElementsByClassName("events-list")[2].style.display = "none";
    display = true;
  }
}

function displaylist3() {
  if (display3 == true) {
    document.getElementsByClassName("events-list")[0].style.display = "flex";
    document.getElementsByClassName("events-list")[1].style.display = "none";
    document.getElementsByClassName("events-list")[2].style.display = "none";
    display3 = false;
  } else if (display3 == false) {
    document.getElementsByClassName("events-list")[0].style.display = "none";
    display3 = true;
  }
}

function filterFunction(e) {
  e.target.value += e.key;
  var input, filter, a, i;
  input = document.getElementById("events_input");
  filter = input.value.toUpperCase();
  a = appendevent.getElementsByTagName("span");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function filterFunction2() {
  var input, filter, a, i;
  input = document.getElementById("college_input");
  filter = input.value.toUpperCase();
  a = document
    .getElementsByClassName("events-list")[0]
    .getElementsByTagName("span");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function geteventsvalue(e) {
  eventsidarr.push(e.target.id);
  document.getElementById('events_input').selectedIndex = 0;
  e.target.disabled = true;
  var div = document.createElement("div");
  div.id = e.target.id;
  div.className += "sports";
  var span = document.createElement("span");
  span.className += "sports-name";
  span.innerHTML = e.target.innerHTML;
  div.appendChild(span);
  var close = document.createElement('i');
  close.className = 'fas fa-times';
  close.style.paddingLeft = '1vh';
  close.style.color = 'red';
  div.appendChild(close);
  selected_events.appendChild(div);
  selected_events.style.display = 'flex';
  const that = e.target;
  div.onclick = function(e) {
    this.parentNode.removeChild(this);
    eventsidarr.map(ev => {
      if(ev == this.id) {
        eventsidarr.splice(eventsidarr.indexOf(ev), 1);
      }
    });
    that.disabled = false;
    if (eventsidarr.length == 0) {
      selected_events.style.display = 'none';
    }
  };
}

window.onload = function() {
  const college_select = document.getElementById("city_opt");
  const events_select = document.getElementById("events_opt");
  const URL = "https://bits-oasis.org/registrations/get_college/";
  const URL2 = "https://bits-oasis.org/registrations/events_details/";

  fetch(URL)
    .then(resp => resp.json())
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        const collegeContainer = document.getElementById('college_input');
        const college = document.createElement('option');
        college.id = response.data[i].id;
        college.value = response.data[i].id;
        college.text = response.data[i].name;
        collegeContainer.appendChild(college);
      }
    })
    .catch(function(error) {
      console.log(error);
    });

  fetch(URL2)
    .then(resp => resp.json())
    .then(function(response) {
      for (var i = 0; i < response.length; i++) {
        for (var j = 0; j < response[i].events.length; j++) {
          const eventsContainer = document.getElementById('events_input');
          const events = document.createElement('option');
          events.id = response[i].events[j].id;
          events.value = response[i].events[j].id;
          events.text = response[i].events[j].name;
          eventsContainer.appendChild(events);
          events.addEventListener('click', geteventsvalue);
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

function getcollegeid() {
  const val = document.getElementById("city_opt").value;
  console.log(val);
  collegeid = parseInt(val);
  console.log(collegeid);
}

function closebox() {
  msg_box.style.transform = "translate(-50%) scale(0)";
}

function prereg() {
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const year = document.getElementById("yos_opt").value;
  const gender = document.getElementById('gender_input').value;
  const isChoreo = (document.getElementById("choreo").value == 'true');
  const isHeaOfSoc = (document.getElementById("head-of-soc").value == 'true');
  var v = grecaptcha.getResponse();
  console.log(v);
  // if (v == "") {
  //   alert("Please select Captcha");
  //   return;
  // }
  data = {
    email_id: email,
    name: name,
    gender,
    city: city,
    year,
    phone: phone,
    college_id: collegeid,
    events: eventsidarr,
    choreographer: isChoreo,
    head_of_society: isHeaOfSoc,
    // captcha: v
  };
  console.log(data);

  if (
    email == "" ||
    name == "" ||
    gender == null ||
    city == "" ||
    year == null ||
    phone == "" ||
    collegeid == "" ||
    eventsidarr == []
  ) {
    alert("Please enter all the selected feilds");
  } else {
    fetch("https://bits-oasis.org/registrations/Register/", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result.message);
        document.getElementsByClassName("inner-text")[0].innerHTML =
          result.message;
        msg_box.style.transform = "translate(-50% , -50%) scale(1)";
        grecaptcha.reset();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}