function displayRepositories (event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${ repos.map(r => '<li>' + r.name + ' -- ' + '<a href=' + r.html_url + '>View on Github</a>' + ' -- ' +  '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + ' -- ' + '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('') }</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories () {
  let username = document.getElementById("username").value;
  let uri = "https://api.github.com/users/" + username + "/repos";

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send();
}

function displayCommits () {
  var commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + '</strong> -- ' + c.commit.author.name + ' -- ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function getCommits (el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const uri = "https://api.github.com/repos/" + username + "/" + repoName + "/commits"

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", uri);
  req.send();
}

function displayBranches () {
  var branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches (el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const uri = "https://api.github.com/repos/" + username + "/" + repoName + "/branches";

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", uri);
  req.send();
}
