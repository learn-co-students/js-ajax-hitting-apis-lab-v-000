const details = document.getElementById('details');
const repositories = document.getElementById('repositories');

function getRepositories(event) {
  // event.preventDefault();
  USERNAME = document.getElementsByName("username")[0].value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + USERNAME + '/repos');
  req.send();
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(r => '<li>' + r.owner.login + " - <a href=" + r.html_url + ">" + r.name + "</a>" + ' - <a href = "#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> <a href = "#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  repositories.innerHTML = repoList;
}

function getCommits(el) {
  let name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open("GET", "https://api.github.com/repos/" + USERNAME + "/" + name + "/commits");
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  let commitsList = `<h4 style="text-align: center;">Commits</h4><br><ul>${commits.map(c => '<li><strong>' + c.commit.author.name + ' ' + c.author.login +'</strong> - ' + c.commit.message + '</li>').join('')}</ul>`;
  details.innerHTML = commitsList;
}

function getBranches(el) {
  let name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open("GET", "https://api.github.com/repos/" + USERNAME + "/" + name + "/branches");
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  let branchesList = `<h4 style="text-align: center;">Branches</h4><br><ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  details.innerHTML = branchesList;
}
