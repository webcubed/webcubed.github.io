window.goto = function(page) {
  const nextURL = 'https://idabest.tk/' + page;
  const nextTitle = 'idabest.tk';
  const nextState = { nextPage: page };
  window.history.pushState(nextState, nextTitle, nextURL);
  window.history.replaceState(nextState, nextTitle, nextURL);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://idabest.tk/' + page, true);
  xhr.send();
  function stuff() {
      document.getElementsByTagName('html')[0].innerHTML = xhr.response
  }
  setTimeout(() => {
    stuff()
}, 5000)
}
