function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + document.getElementById('username').value +'/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
          '<a href=' +
              r.html_url +
          '>' +
              r.name +
          '</a> - ' +
          '<a href="#" data-repo="' +
              r.name + '" data-username="' + document.getElementById('username').value  +
          '" onclick=getCommits(this)>Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  console.log(this.responseText)
}

function getBranches() {

}
function displayBranches() {

}
