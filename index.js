function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  var repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this);">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this);">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  var commitsList = `<ul>${commits.map(c => '<li><strong>' + c.commit.author.name + ' (' + c.author.login + ')</strong> - ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  var branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  const apiURL = "https://api.github.com/users/" + username + "/repos";
  req.addEventListener("load", displayRepositories);
  req.open("GET", apiURL);
  req.send();
}

function getCommits(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
  req.send();
}

function getBranches(el) {
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
  req.send();
}
