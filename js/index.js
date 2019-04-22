// your code here

function getRepositories() {
  const username = document.querySelector('input').value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username +'/repos');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(
    r =>
      '<li>' + r.name + ' - <a href="' + r.html_url + '"> Github</a> - <a href="#" data-username="' + username + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-username="' + username + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
  ).join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(
    c =>
      '<li>' + c.commit.author.name + '(' + c.author.login + ') - ' + c.commit.message + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const username = el.dataset.username;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches')
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(
    b =>
      '<li>' + b.name + '</li>'
  ).join('')}</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}
