function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li><a href="'+ r.html_url +'">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + '(' + commit.author.login + ') - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}