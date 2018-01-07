function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Details</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits)
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(c => '<li>' + c.author.login + ' - ' + c.commit.author.name + ' - ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList;
}
