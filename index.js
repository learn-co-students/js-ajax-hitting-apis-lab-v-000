function getRepositories() {
  const username = document.getElementById("username").value;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li> Name: ' + '<strong>'+ r.name + '</strong><br>' +
  'URL: ' + '<a href="' + r.html_url + '">' + r.html_url + '</a><br>' +
  ' - <a href="#" data-repository="' + r.name + '"data-username="' + r.owner.login + '" onclick="getCommits(this); return false;">Get Commits</a><br><a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + '<br>' + commit.author.login + '<br>' + commit.commit.message + '<li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(el) {
  const username = el.dataset.username;
  const repository = el.dataset.repository;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>' ).join('')}</ul>`
  document.getElementById("details").innerHTML = branchList;
}
