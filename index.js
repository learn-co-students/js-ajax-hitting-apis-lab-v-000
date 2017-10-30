
function getRepositories() {
  let username = document.getElementById("username").value;
  let req = new XMLHttpRequest;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  let repository = el.dataset.repository;
  let username = el.dataset.username;
  let req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits');
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  let commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + '</strong> - ' + c.commit.committer.name + ' - ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  let repository = el.dataset.repository;
  let username = el.dataset.username;
  let req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches');
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  let branchesList = `<ul>${branches.map(b => '<li><strong>' + b.name + '</strong></li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
