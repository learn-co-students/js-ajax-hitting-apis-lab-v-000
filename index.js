function displayBranches () {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches (element) {
  const username = element.dataset.username;
  const repoName = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/branches');
  req.send();
}

function displayCommits () {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - <em>' + commit.author.login + '</em> - ' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getCommits(element) {
  const username = element.dataset.username;
  const repoName = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/commits');
  req.send();
}

function displayRepositories (e, data) {
  const repositories = JSON.parse(this.responseText);
  const repositoriesList = `<ul>${repositories.map(repo => '<li><a href="' + repo.html_url + '" target="_blank">' + repo.name + '</a> - <a href="#" data-username="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="getCommits(this)">Get Commits</a> ~~ <a href="#" data-username="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repositoriesList;
}

function getRepositories () {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos');
  req.send();
}
