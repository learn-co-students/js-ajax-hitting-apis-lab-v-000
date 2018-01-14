function getRepositories() {
  const req = new XMLHttpRequest();
  const user = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + r.html_url + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + '<li>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  const user = el.dataset.username;
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/commits');
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' - ' + commit.commit.author.name + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  const user = el.dataset.username;
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/branches');
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
