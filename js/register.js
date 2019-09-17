var textarea = document.getElementById("textarea_type");
var eventlist = document.getElementsByClassName("events_el");
var msg_box = document.getElementsByClassName("msg-box")[0];
var close_box = document.getElementsByClassName("close-box")[0];
var selected_events = document.getElementsByClassName("selected-events")[0];
var eventsinput = document.getElementById("events_input");
var appendevent = document.getElementsByClassName("events-list")[2];
var eventsidarr = [];
var collegeid;
var gender_value;
var yos;
var i = 0;
var no_of_events;
var display = true;
var display2 = true;
var display3 = true;
var display4 = true;
var random = true;
var isChoreo = false;

// document.getElementsByClassName('selected_el')[0].onclick = function() {
//   console.log(1);
// }
console.log(document.getElementsByClassName("events-list"));

function displaylist() {
  if (display == true) {
    document.getElementsByClassName("events-list")[2].style.display = "flex";
    document.getElementsByClassName("events-list")[1].style.display = "none";
    document.getElementsByClassName("events-list")[0].style.display = "none";
    document.getElementsByClassName("events-list")[3].style.display = "none";
    display = false;
  } else if (display == false) {
    document.getElementsByClassName("events-list")[2].style.display = "none";
    display = true;
  }
  console.log(1);
}

function displaylist2() {
  if (display2 == true) {
    document.getElementsByClassName("events-list")[3].style.display = "flex";
    document.getElementsByClassName("events-list")[1].style.display = "none";
    document.getElementsByClassName("events-list")[0].style.display = "none";
    document.getElementsByClassName("events-list")[2].style.display = "none";
    display2 = false;
  } else if (display2 == false) {
    document.getElementsByClassName("events-list")[3].style.display = "none";
    display2 = true;
  }
}

function displaylist3() {
  if (display3 == true) {
    document.getElementsByClassName("events-list")[0].style.display = "flex";
    document.getElementsByClassName("events-list")[1].style.display = "none";
    document.getElementsByClassName("events-list")[3].style.display = "none";
    document.getElementsByClassName("events-list")[2].style.display = "none";
    display3 = false;
  } else if (display3 == false) {
    document.getElementsByClassName("events-list")[0].style.display = "none";
    display3 = true;
  }
}

function displaylist4() {
  if (display4 == true) {
    document.getElementsByClassName("events-list")[1].style.display = "flex";
    document.getElementsByClassName("events-list")[3].style.display = "none";
    document.getElementsByClassName("events-list")[0].style.display = "none";
    document.getElementsByClassName("events-list")[2].style.display = "none";
    display4 = false;
  } else if (display4 == false) {
    document.getElementsByClassName("events-list")[1].style.display = "none";
    display4 = true;
  }
}

function setchoreovalue() {
  isChoreo = true;
  console.log(isChoreo);
  document.getElementById("choreo_input").placeholder = "Yes";
  document.getElementsByClassName("events-list")[3].style.display = "none";
  display2 = true;
}

function setchoreovalue2() {
  isChoreo = false;
  console.log(isChoreo);
  document.getElementById("choreo_input").placeholder = "No";
  document.getElementsByClassName("events-list")[3].style.display = "none";
  display2 = true;
}

function setgendervalue1() {
  gender_value = "M";
  console.log(gender_value);
  document.getElementById("gender_input").placeholder = "Male";
  document.getElementsByClassName("events-list")[1].style.display = "none";
  display4 = true;
}

function setgendervalue2() {
  gender_value = "F";
  console.log(gender_value);
  document.getElementById("gender_input").placeholder = "Female";
  document.getElementsByClassName("events-list")[1].style.display = "none";
  display4 = true;
}

function setgendervalue3() {
  gender_value = "O";
  console.log(gender_value);
  document.getElementById("gender_input").placeholder = "Others";
  document.getElementsByClassName("events-list")[1].style.display = "none";
  display4 = true;
}

function filterFunction() {
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

function geteventsvalue() {
  const val = document.getElementById("events_opt").value;
  const sports_id = document.getElementById("events_opt")[
    document.getElementById("events_opt").selectedIndex
  ].id;
  var div = document.createElement("div");
  div.className += "sports";
  var span = document.createElement("span");
  span.className += "sports-name";
  span.innerHTML = val;
  div.appendChild(span);
  selected_events.appendChild(div);
  div.onclick = function() {
    this.parentNode.removeChild(this);
    const x = this.getElementsByTagName("span");
    for (
      var i = 1;
      i < document.getElementsByClassName("sports-tag").length;
      i++
    ) {
      if (
        x[0].innerHTML ==
        document.getElementsByClassName("sports-tag")[i].innerHTML
      ) {
        document.getElementsByClassName("sports-tag")[i].disabled = false;
        for (var j = 0; j < eventsidarr.length; j++) {
          if (
            eventsidarr[j] ==
            parseInt(document.getElementsByClassName("sports-tag")[i].id)
          ) {
            eventsidarr.splice(j, 1);
            j--;
          }
        }
      }
    }
  };
  document.getElementById("events_opt").options[
    document.getElementById("events_opt").selectedIndex
  ].disabled = true;
  eventsidarr.push(parseInt(sports_id));
}

window.onload = function() {
  const college_select = document.getElementById("city_opt");
  const events_select = document.getElementById("events_opt");
  const URL = "https://bits-oasis.org/registrations/get_college/";
  const URL2 = "https://bits-oasis.org/registrations/events_details/";

  fetch(URL)
    .then(resp => resp.json())
    .then(function(response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        var opt = document.createElement("span");
        opt.innerHTML = response.data[i].name;
        opt.setAttribute("id", response.data[i].id);
        opt.className += "sports-tag";
        opt.onclick = function() {
          document.getElementsByClassName("events-list")[0].style.display =
            "none";
          display3 = true;
          collegeid = parseInt(this.id);
          console.log(this.id);
          console.log(collegeid);
          document.getElementById("college_input").placeholder = this.innerHTML;
        };
        document.getElementsByClassName("events-list")[0].appendChild(opt);
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
          var opt = document.createElement("span");
          opt.innerHTML = response[i].events[j].name;
          opt.setAttribute("id", response[i].events[j].id);
          opt.className += "sports-tag";
          opt.onclick = function() {
            selected_events.style.display = "flex";
            console.log(this.innerHTML);
            console.log(this.id);
            document.getElementById(
              "events_input"
            ).placeholder = this.innerHTML;
            document.getElementsByClassName("events-list")[2].style.display =
              "none";
            display = true;
            var div = document.createElement("div");
            div.className += "sports";
            var span = document.createElement("span");
            span.className += "sports-name";
            span.innerHTML = this.innerHTML;
            span.setAttribute("id", this.id);
            div.appendChild(span);
            div.innerHTML +=
              '<i class="fas fa-times" style="padding-left:1vh;color:red"></i>';
            selected_events.appendChild(div);
            eventsidarr.push(parseInt(this.id));
            div.onclick = function() {
              const innerspan = this.getElementsByTagName("span");
              console.log(innerspan[0].id);
              this.parentNode.removeChild(this);
              for (var i = 0; i < eventsidarr.length; i++) {
                if (eventsidarr[i] == parseInt(innerspan[0].id)) {
                  eventsidarr.splice(i, 1);
                  i--;
                }
                console.log(eventsidarr);
              }
            };
            console.log(eventsidarr);
          };
          appendevent.appendChild(opt);
          no_of_events++;
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

function getgendervalue() {
  const val = document.getElementById("gender_opt").value;
  gender_value = val;
  console.log(val);
}

function getyosvalue() {
  const val = document.getElementById("yos_opt").value;
  yos_value = val;
  console.log(val);
}

function closebox() {
  msg_box.style.transform = "translate(-50%) scale(0)";
}

function prereg() {
  const name = document.getElementById("name").value;
  //   const gender = document.getElementsByName("gender");
  //   for (var i = 0; i < gender.length; i++) {
  //     if (gender[i].checked) {
  //       gender_value = gender[i].value;
  //     }
  //   }
  //   console.log(gender_value);
  //   const yos = document.getElementsByName("yos");
  //   for (var i = 0; i < yos.length; i++) {
  //     if (yos[i].checked) {
  //       yos_value = yos[i].value;
  //     }
  //   }
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  var v = grecaptcha.getResponse();
  console.log(v);
  if (v == "") {
    alert("Please select Captcha");
    return;
  }
  data = {
    email_id: email,
    name: name,
    gender: gender_value,
    city: city,
    year: yos_value,
    phone: phone,
    college_id: collegeid,
    events: eventsidarr,
    choreographer: isChoreo,
    captcha: v
  };
  console.log(data);
  if (
    email == "" ||
    name == "" ||
    gender_value == null ||
    city == "" ||
    yos_value == null ||
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