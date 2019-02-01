// your code here

function getRepositories() {
  let user = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}


function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(repo => '<li style="color: grey;"><a href="' + repo.html_url + '">' + repo.name + '</a> - <a id="' + repo.name + '"href="#" data-username="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="getCommits(this);">Get Commits</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
  const name = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${name}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' | ' + c.author.login + ' | ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;


}

function getBranches() {
}


