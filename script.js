window.goto = function(page) {
  const nextURL = 'https://my-website.com/' + page;
  const nextTitle = 'idabest.tk';
  const nextState = { nextPage: page };
  window.history.pushState(nextState, nextTitle, nextURL);
  window.history.replaceState(nextState, nextTitle, nextURL);
}
