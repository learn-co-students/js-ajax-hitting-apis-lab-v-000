// your code here

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits
    .map(c => '<li>Name: ' + c.commit.author.name + '<br>Username: ' + c.author.login + '<br>Commit Message: ' + c.commit.message + '<br></li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getCommits(el) {
  const req = new XMLHttpRequest();
  const repoName = el.dataset.repository;
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repoName + '/commits');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li>Repo Name: ' + r.name + '<br>Author: ' + r.owner.login + '<br>URL: ' + r.html_url + '<br><a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a><br><a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li><br>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(b => '<li>Branch: ' + b.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  const repoName = el.dataset.repository;
  const username = document.getElementById('username').value;
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repoName + '/branches');
  req.send();
}
