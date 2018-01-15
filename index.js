function getRepositories() {
  const username = document.getElementById("username").value;
  const url = "https://api.github.com/users/" + username + "/repos";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET",url);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '"data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + '- <a href="#" data-repository="' + r.name + '"data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const data = el.dataset;
  const name = data.repository;
  const username = data.username;
  const url = "https://api.github.com/repos/" + username + "/" + name + "/commits";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + "-" + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const data = el.dataset;
  const name = data.repository;
  const username = data.username;
  debugger;
  const url = "https://api.github.com/repos/" + username + "/" + name + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", url);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>' + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
