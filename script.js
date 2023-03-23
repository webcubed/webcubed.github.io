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
    let format = hours + ':' + minutes + ' ' + day_night;
  return format;
}
window.highlightDate = function() {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const bruge = bTime();
    var mon = document.getElementsByTagName('td')[9]
    var tue = document.getElementsByTagName('td')[18]
    var wed = document.getElementsByTagName('td')[26]
    var thu = document.getElementsByTagName('td')[34]
    var fri = document.getElementsByTagName('td')[42]
    if (day=1) mon.style.backgroundColor = '#5d3fd3'
    if (day=2) tue.style.backgroundColor = '#5d3fd3'
    if (day=3) wed.style.backgroundColor = '#5d3fd3'
    if (day=4) thu.style.backgroundColor = '#5d3fd3'
    if (day=5) fri.style.backgroundColor = '#5d3fd3'
}

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

grabIp()

window.goto = function(page) {
    const nextURL = 'https://idabest.tk/' + page;
    const nextTitle = 'idabest.tk';
    const nextState = {
        nextPage: page
    };
    window.history.pushState(nextState, nextTitle, nextURL);
    window.history.replaceState(nextState, nextTitle, nextURL);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://idabest.tk/' + page, true);
    xhr.send();
    xhr.onload = function() {
        document.getElementsByTagName('html')[0].innerHTML = xhr.response
    }
    if (page === 'schedule') {
        setTimeout(() => {
            highlightDate();
        }, 300);
    }
}

window.bypass = function() {
    ((function() {
        var a, b, c;
        c = "https://home.0xdc.icu", b = document.createElement("iframe"), b.setAttribute("src", c), b.setAttribute("id", "rusic-modal"), b.setAttribute("style", "position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999999999; background-color: #fff;"), a = document.getElementsByTagName("body")[0], a.appendChild(b)
    })).call(this)
}
window.getTime = function() {
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
    let format = hours + ':' + minutes + ':' + seconds + ' ' + day_night;
    window.fulldate = Date().split(' GMT')[0] 
  return format;
}
