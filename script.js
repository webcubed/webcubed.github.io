function bTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day_night = "am";
  if (hours > 12) {
    day_night = "pm";
    hours = hours - 12;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  let format = hours + ":" + minutes + " " + day_night;
  return format;
}
window.highlightDate = function () {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const bruge = bTime();
  var mon = document.getElementsByTagName("td")[9];
  var tue = document.getElementsByTagName("td")[18];
  var wed = document.getElementsByTagName("td")[26];
  var thu = document.getElementsByTagName("td")[34];
  var fri = document.getElementsByTagName("td")[42];
  if (day == 1) mon.style.backgroundColor = "#5d3fd3";
  var e = 1;
  if (day == 2) tue.style.backgroundColor = "#5d3fd3";
  var e = 2;
  if (day == 3) wed.style.backgroundColor = "#5d3fd3";
  var e = 3;
  if (day == 4) thu.style.backgroundColor = "#5d3fd3";
  var e = 4;
  if (day == 5) fri.style.backgroundColor = "#5d3fd3";
  var e = 5;
};

const ipifyURL = "https://api.ipify.org";
async function grabIp() {
  try {
    const response = await fetch(ipifyURL);
    const ipAddress = await response.text();
    window.ip = ipAddress;
    return ipAddress;
  } catch (error) {
    console.error(error);
  }
}

grabIp();

window.goto = function (page) {
  const nextURL = "https://idabest.tk/" + page;
  const nextTitle = "idabest.tk";
  const nextState = {
    nextPage: page,
  };
  window.history.pushState(nextState, nextTitle, nextURL);
  window.history.replaceState(nextState, nextTitle, nextURL);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://idabest.tk/" + page, true);
  xhr.send();
  xhr.onload = function () {
    document.getElementsByTagName("html")[0].innerHTML = xhr.response;
  };
  if (page === "schedule") {
    setTimeout(() => {
      highlightDate();
    }, 300);
  }
};

window.bypass = function () {
  (function () {
    var a, b, c;
    (c = "https://home.0xdc.icu"),
      (b = document.createElement("iframe")),
      b.setAttribute("src", c),
      b.setAttribute("id", "rusic-modal"),
      b.setAttribute(
        "style",
        "position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999999999; background-color: #fff;"
      ),
      (a = document.getElementsByTagName("body")[0]),
      a.appendChild(b);
  }).call(this);
};
window.getTime = function () {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day_night = "AM";
  if (hours > 12) {
    day_night = "PM";
    hours = hours - 12;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  let format = hours + ":" + minutes + ":" + seconds + " " + day_night;
  window.fulldate = Date().split(" GMT")[0];
  return format;
};
window.addEventListener("load", function () {
  // Get the current time
  const currentTime = new Date();

  // Get the current day of the week (0-6, where 0 is Sunday and 6 is Saturday)
  const currentDay = currentTime.getDay();

  // Get the current hour and minute
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Calculate the current period based on the current time
  let currentPeriod = -1;
  if (
    (currentHour === 8 && currentMinute >= 10) ||
    (currentHour === 8 && currentMinute < 56)
  ) {
    currentPeriod = 1; // Period 1
  } else if (
    (currentHour === 8 && currentMinute >= 58) ||
    (currentHour === 9 && currentMinute < 43)
  ) {
    currentPeriod = 2; // Period 2
  } else if (
    (currentHour === 9 && currentMinute >= 45) ||
    (currentHour === 10 && currentMinute < 30)
  ) {
    currentPeriod = 3; // Period 3
  } else if (
    (currentHour === 10 && currentMinute >= 32) ||
    (currentHour === 11 && currentMinute < 18)
  ) {
    currentPeriod = 4; // Period 4
  } else if (
    (currentHour === 11 && currentMinute >= 20) ||
    (currentHour === 12 && currentMinute < 5)
  ) {
    currentPeriod = 5; // Period 5
  } else if (
    (currentHour === 12 && currentMinute >= 7) ||
    (currentHour === 12 && currentMinute < 53)
  ) {
    currentPeriod = 6; // Period 6
  } else if (
    (currentHour === 12 && currentMinute >= 55) ||
    (currentHour === 1 && currentMinute < 41)
  ) {
    currentPeriod = 7; // Period 7
  } else if (
    (currentHour === 1 && currentMinute >= 43) ||
    (currentHour === 2 && currentMinute <= 30)
  ) {
    currentPeriod = 8; // Period 8
  }

  // Highlight the current period in the table
  const table = document.querySelector("table");
  const rows = table.getElementsByTagName("tr");
  const cells = rows[currentDay + 1].getElementsByTagName("td"); // Add 1 to skip the first row with the day/period labels

  // Remove any existing highlighting
  for (let i = 1; i < cells.length; i++) {
    // Start from 1 to skip the first cell with the day label
    cells[i].style.backgroundColor = "";
  }

  if (currentPeriod !== -1 && currentDay > 0 && currentDay < 6) {
    // Check that it is a weekday and within school hours
    // Highlight the current period, subtract 1 as the index is 0-based
    cells[currentPeriod].style.backgroundColor = "#5d3fd3";
  }
});
