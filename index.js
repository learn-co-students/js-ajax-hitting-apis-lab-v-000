const rootEndpoint = "https://api.github.com/";

function getRepositories() {
  const username = document.getElementById('username').value;
  const url = rootEndpoint + 'users/' + username + '/repos';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', url);
  req.send()
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const url = rootEndpoint + 'repos/' + username + '/' + repo + '/commits';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', url);
  req.send();
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const url = rootEndpoint + 'repos/' + username + '/' + repo + '/branches';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', url);
  req.send();
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' ' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' ' + r.owner.login + ' ' + r.html_url + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}


