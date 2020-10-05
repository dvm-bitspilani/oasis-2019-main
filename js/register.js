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
var events_arr = [
  { id: 165, name: 'Pitch Perfect' },
  { id: 166, name: 'Swaranjali' },
  { id: 167, name: 'Desert Duel' },
  { id: 168, name: 'Unspoken' },
  { id: 169, name: 'And...Scene' }
]







var addFileContainer = document.getElementById("addFileContainer");
// var videoLink = document.getElementById("videoLink");

var realFile = document.getElementById("real-file");
var customButton = document.getElementById("custom-button");
var customText = document.getElementById("custom-text");

function showLink(events) {
  if (events.length !== 0) {
    if (events.length === 1) {
      if (events[0] === "168") {
        addFileContainer.style.display = "flex";
        // videoLink.style.display = "none";
      }
      else {
        // videoLink.style.display = "block";
        addFileContainer.style.display = "none";
      }
    }
    else {
      if (events.includes("168")) {
        addFileContainer.style.display = "flex";
      }
      else {
        addFileContainer.style.display = "none";
      }
      // videoLink.style.display = "block";
    }
  }
  else {
    // videoLink.style.display = "none";
    addFileContainer.style.display = "none";
  }
}

customButton.addEventListener("click", function () {
  realFile.click();
})

realFile.addEventListener("change", function () {
  if (realFile.value) {
    customText.innerHTML = realFile.value;
  }
  else {
    customText.innerHTML = "No File Chosen";
  }
})

// function displaylist() {
//   if (display == true) {
//     document.getElementsByClassName("events-list")[2].style.display = "flex";
//     document.getElementsByClassName("events-list")[1].style.display = "none";
//     document.getElementsByClassName("events-list")[0].style.display = "none";
//     display = false;
//   } else if (display == false) {
//     document.getElementsByClassName("events-list")[2].style.display = "none";
//     display = true;
//   }
// }

// function displaylist3() {
//   if (display3 == true) {
//     document.getElementsByClassName("events-list")[0].style.display = "flex";
//     document.getElementsByClassName("events-list")[1].style.display = "none";
//     document.getElementsByClassName("events-list")[2].style.display = "none";
//     display3 = false;
//   } else if (display3 == false) {
//     document.getElementsByClassName("events-list")[0].style.display = "none";
//     display3 = true;
//   }
// }

// function filterFunction(e) {
//   e.target.value += e.key;
//   var input, filter, a, i;
//   input = document.getElementById("events_input");
//   filter = input.value.toUpperCase();
//   a = appendevent.getElementsByTagName("span");
//   for (i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }

// function filterFunction2() {
//   var input, filter, a, i;
//   input = document.getElementById("college_input");
//   filter = input.value.toUpperCase();
//   a = document
//     .getElementsByClassName("events-list")[0]
//     .getElementsByTagName("span");
//   for (i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }


document.querySelector('input[list="events_input"]').addEventListener('input', geteventsvalue)

function geteventsvalue(e) {
  var input = e.target,
    val = input.value;
  list = input.getAttribute('list'),
    options = document.getElementById(list).childNodes;

  selected_events.innerHTML = ''
  for (var i = 0; i < options.length; i++) {
    options[i].disabled = false
  }

  for (var i = 0; i < options.length; i++) {
    if (options[i].innerText === val) {

      // if (eventsidarr.includes(options[i].id)) {
      //   return;
      // }
      eventsidarr = []
      eventsidarr.push(options[i].id);
      e.target.value = '';
      e.target.blur();
      options[i].disabled = true;
      var div = document.createElement("div");
      div.id = options[i].id;
      div.className += "sports";
      var span = document.createElement("span");
      span.className += "sports-name";
      span.innerHTML = options[i].innerText;
      div.appendChild(span);
      var close = document.createElement('i');
      close.className = 'fas fa-times';
      close.style.paddingLeft = '1vh';
      close.style.color = 'red';
      div.appendChild(close);
      selected_events.appendChild(div);
      selected_events.style.display = 'flex';
      const that = options[i];
      div.onclick = function (e) {
        this.parentNode.removeChild(this);
        eventsidarr.map(ev => {
          if (ev == this.id) {
            eventsidarr.splice(eventsidarr.indexOf(ev), 1);
          }
        });
        that.disabled = false;
        if (eventsidarr.length == 0) {
          selected_events.style.display = 'none';
        }

        showLink(eventsidarr);
      };
      break;
    }
  }
  showLink(eventsidarr);
}

window.onload = function () {
  const college_select = document.getElementById("city_opt");
  const events_select = document.getElementById("events_opt");
  const URL = "https://bits-oasis.org/registrations/get_college/";
  const URL2 = "https://bits-oasis.org/registrations/events_details/";



  fetch(URL)
    .then(resp => resp.json())
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        const collegeContainer = document.getElementById('college_input');
        const college = document.createElement('option');
        college.id = response.data[i].id;
        college.value = response.data[i].name;
        college.text = response.data[i].name;
        collegeContainer.appendChild(college);
      }
    })
    .catch(function (error) {
      console.log(error);
    });



  for (var i = 0; i < events_arr.length; i++) {
    const eventsContainer = document.getElementById('events_input');
    const events = document.createElement('option');
    events.id = events_arr[i].id;
    events.value = events_arr[i].name;
    events.text = events_arr[i].name;
    eventsContainer.appendChild(events);
    events.addEventListener('click', geteventsvalue);
  }



  // fetch(URL2)
  //   .then(resp => resp.json())
  //   .then(function (response) {
  //     for (var i = 0; i < response.length; i++) {
  //       console.log(response[i])
  //       for (var j = 0; j < response[i].events.length; j++) {
  //         const eventsContainer = document.getElementById('events_input');
  //         const events = document.createElement('option');
  //         events.id = response[i].events[j].id;
  //         events.value = response[i].events[j].name;
  //         events.text = response[i].events[j].name;
  //         eventsContainer.appendChild(events);
  //         events.addEventListener('click', geteventsvalue);

  //       }
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};

document.querySelector('input[list="college_input"]').addEventListener('input', getcollegeid)

function getcollegeid(e) {
  var input = e.target,
    val = input.value;
  list = input.getAttribute('list'),
    options = document.getElementById(list).childNodes;

  for (var i = 0; i < options.length; i++) {
    if (options[i].innerText === val) {
      collegeid = options[i].id;
      break;
    }
  }
}

function closebox() {
  msg_box.style.transform = "translate(-50%) scale(0)";
}
function clear() {
  document.getElementById('email').value = ''
  document.getElementById("phone").value = ''
  document.getElementById("videoLink").value = ''
  document.getElementById('name').value = ''
  document.getElementsByClassName('events-input')[0].value = ''
  document.getElementsByClassName('selected-events')[0].innerHTML = ''
  document.getElementsByClassName('selected-events')[0].style.display = 'none';
  var events = document.getElementById('events_input').options
  for (var i = 0; i < events.length; i++) {
    events[i].disabled = false
  }
  console.log(document.getElementById("real-file").value)

  document.getElementsByClassName('file')[0].value = ''
  console.log(document.getElementById("real-file").value)
  document.getElementById("custom-text").innerHTML = "No File Chosen";
  document.getElementById("addFileContainer").style.display='none'
}
function prereg() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  // const college_name = document.getElementById('college_name').value;
  const file = document.querySelector("input[type='file']");
  const link = document.getElementById("videoLink").value;
  var v = grecaptcha.getResponse();
  
  console.log(v);
  if (v == "") {
    alert("Please select Captcha");
    return;
  }
  data = {
    email: email,
    name: name,
    phone: phone,
    college: collegeid,
    // college: college_name,
    event: parseInt(eventsidarr[0]),
    captcha: v
  };
  if (link) {
    console.log("helolini")
    data["link"] = link;
  }
  else {
    data["link"] = "";
  }
  if (file && eventsidarr[0] == '168') {
    console.log("helofiel")
    data["file"] = file;


  }
  console.log(data);

  if (
    email == "" ||
    name == "" ||
    // gender == null ||
    // city == "" ||
    // year == null ||
    phone == "" ||
    collegeid == "" ||
    // college_name == "" ||
    eventsidarr == []
  ) {
    alert("Please enter all the selected feilds");
  } else {

    const form_data = new FormData();
    for (var key in data) {
      if (key === "file") {
        form_data.append('file', file.files[0]);
      }
      form_data.append(key, data[key]);
    }
    fetch("https://www.bits-oasis.org/registration/atkt/", {
      method: "post",
      body: form_data
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result.message);
        
        document.getElementsByClassName("inner-text")[0].innerHTML =
          result.message;
        if(result.message=='Successfully registered'){
          clear()
        }
        msg_box.style.transform = "translate(-50% , -50%) scale(1)";
        grecaptcha.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function showData(id) {
  const eOpts = document.querySelectorAll('#' + id + ' > option');
  for (i = 0; i < eOpts.length; i++) {
    eOpts[i].style.display = 'block';
  }

}

