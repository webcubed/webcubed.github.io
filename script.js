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
  selectperiod();
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
var selectperiod;
window.addEventListener("load", function () {
  selectperiod = function () {
    const currentTime = bTime();

    function timeToMinutes(time) {
      const [hours, minutes, period] = time.match(/(\d+):(\d+) (\w+)/).slice(1);
      return ((parseInt(hours) % 12) + (period.toLowerCase() === "pm" ? 12 : 0)) * 60 + parseInt(minutes);
    }

    const currentTimeInMinutes = timeToMinutes(currentTime);

    const periods = {
      Monday: [
        { start: timeToMinutes("8:10 am"), end: timeToMinutes("8:56 am"), period: 1 },
        { start: timeToMinutes("8:58 am"), end: timeToMinutes("9:43 am"), period: 2 },
        { start: timeToMinutes("9:45 am"), end: timeToMinutes("10:30 am"), period: 3 },
        { start: timeToMinutes("10:32 am"), end: timeToMinutes("11:17 am"), period: 4 },
        { start: timeToMinutes("11:19 am"), end: timeToMinutes("12:04 pm"), period: 5 },
        { start: timeToMinutes("12:06 pm"), end: timeToMinutes("12:51 pm"), period: 6 },
        { start: timeToMinutes("12:53 pm"), end: timeToMinutes("1:38 pm"), period: 7 },
        { start: timeToMinutes("1:43 pm"), end: timeToMinutes("2:30 pm"), period: 8 },
      ],
      Tuesday: [
        // Add periods for Tuesday here
        { start: timeToMinutes("8:10 am"), end: timeToMinutes("8:56 am"), period: 1 },
        { start: timeToMinutes("8:58 am"), end: timeToMinutes("9:43 am"), period: 2 },
        { start: timeToMinutes("9:45 am"), end: timeToMinutes("10:30 am"), period: 3 },
        { start: timeToMinutes("10:32 am"), end: timeToMinutes("11:17 am"), period: 4 },
        { start: timeToMinutes("11:19 am"), end: timeToMinutes("12:04 pm"), period: 5 },
        { start: timeToMinutes("12:06 pm"), end: timeToMinutes("12:51 pm"), period: 6 },
        { start: timeToMinutes("12:53 pm"), end: timeToMinutes("1:38 pm"), period: 7 },
        { start: timeToMinutes("1:43 pm"), end: timeToMinutes("2:30 pm"), period: 8 },
      ],
      Wednesday: [
        // Add periods for Wednesday here
        { start: timeToMinutes("8:10 am"), end: timeToMinutes("8:56 am"), period: 1 },
        { start: timeToMinutes("8:58 am"), end: timeToMinutes("9:43 am"), period: 2 },
        { start: timeToMinutes("9:45 am"), end: timeToMinutes("10:30 am"), period: 3 },
        { start: timeToMinutes("10:32 am"), end: timeToMinutes("11:17 am"), period: 4 },
        { start: timeToMinutes("11:19 am"), end: timeToMinutes("12:04 pm"), period: 5 },
        { start: timeToMinutes("12:06 pm"), end: timeToMinutes("12:51 pm"), period: 6 },
        { start: timeToMinutes("12:53 pm"), end: timeToMinutes("1:38 pm"), period: 7 },
        { start: timeToMinutes("1:43 pm"), end: timeToMinutes("2:30 pm"), period: 8 },
      ],
      Thursday: [
        // Add periods for Thursday here
        { start: timeToMinutes("8:10 am"), end: timeToMinutes("8:56 am"), period: 1 },
        { start: timeToMinutes("8:58 am"), end: timeToMinutes("9:43 am"), period: 2 },
        { start: timeToMinutes("9:45 am"), end: timeToMinutes("10:30 am"), period: 3 },
        { start: timeToMinutes("10:32 am"), end: timeToMinutes("11:17 am"), period: 4 },
        { start: timeToMinutes("11:19 am"), end: timeToMinutes("12:04 pm"), period: 5 },
        { start: timeToMinutes("12:06 pm"), end: timeToMinutes("12:51 pm"), period: 6 },
        { start: timeToMinutes("12:53 pm"), end: timeToMinutes("1:38 pm"), period: 7 },
        { start: timeToMinutes("1:43 pm"), end: timeToMinutes("2:30 pm"), period: 8 },
      ],
      Friday: [
        // Add periods for Friday here
        { start: timeToMinutes("8:10 am"), end: timeToMinutes("8:56 am"), period: 1 },
        { start: timeToMinutes("8:58 am"), end: timeToMinutes("9:43 am"), period: 2 },
        { start: timeToMinutes("9:45 am"), end: timeToMinutes("10:30 am"), period: 3 },
        { start: timeToMinutes("10:32 am"), end: timeToMinutes("11:17 am"), period: 4 },
        { start: timeToMinutes("11:19 am"), end: timeToMinutes("12:04 pm"), period: 5 },
        { start: timeToMinutes("12:06 pm"), end: timeToMinutes("12:51 pm"), period: 6 },
        { start: timeToMinutes("12:53 pm"), end: timeToMinutes("1:38 pm"), period: 7 },
        { start: timeToMinutes("1:43 pm"), end: timeToMinutes("2:30 pm"), period: 8 },
      ],
    };

    function isCurrentPeriod(period) {
      return currentTimeInMinutes >= period.start && currentTimeInMinutes <= period.end;
    }

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const currentPeriods = periods[today];

    if (currentPeriods) {
      currentPeriods.forEach((period) => {
        if (isCurrentPeriod(period)) {
          if (!period.period == 6) {
            const periodCells = document.querySelectorAll(`td:nth-child(${period.period + 1})`);
            const date = new Date();
            const day = date.getDay();
            if (day == 1) periodCells[1].style.backgroundColor = "#5d3fd3";
            if (day == 2) periodCells[2].style.backgroundColor = "#5d3fd3";
            if (day == 3) periodCells[3].style.backgroundColor = "#5d3fd3";
            if (day == 4) periodCells[4].style.backgroundColor = "#5d3fd3";
            if (day == 5) periodCells[5].style.backgroundColor = "#5d3fd3";
          } else {
            document.querySelectorAll(`td:nth-child(7)`)[1].style.backgroundColor = "#5d3fd3";
          }
        }
      });
    }
  };
  
});
