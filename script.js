window.goto = function(page) {
  const nextURL = 'https://idabest.tk/' + page;
  const nextTitle = 'idabest.tk';
  const nextState = { nextPage: page };
  window.history.pushState(nextState, nextTitle, nextURL);
  window.history.replaceState(nextState, nextTitle, nextURL);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://idabest.tk/' + page, true);
  xhr.send();
  xhr.onload=function() {
      document.getElementsByTagName('html')[0].innerHTML = xhr.response
  }
}
window.bypass=function() {
    ((function(){ var a,b,c;c="https://home.0xdc.icu", b=document.createElement("iframe"), b.setAttribute("src",c),b.setAttribute("id","rusic-modal"), b.setAttribute("style","position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999999999; background-color: #fff;"), a=document.getElementsByTagName("body")[0], a.appendChild(b)})).call(this)
}
