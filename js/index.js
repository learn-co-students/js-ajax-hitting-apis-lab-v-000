function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos)
  if (repos.length) {
    const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository ="' + repo.name + '" data-username="' + repo.name + '" onclick="getBranches(this)">Get Branches</a> - <a href="' + repo.html_url + '">Repo URL</a></li>').join('')}</ul>`
    document.getElementById('repositories').innerHTML = repoList
  }
  else {
    document.getElementById('repositories').innerHTML = "No matching repositories"
  }
}

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  if (commits.message !== 'Not Found') {
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login + '</strong> ('+ commit.commit.author.name + ') - ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById('details').innerHTML = commitsList
  }
  else {
    document.getElementById('details').innerHTML ="There are no commits"
  }
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/'+ repo + '/commits')
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  if (branches.message !== 'Not Found') {
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>' ).join('')}</ul>`
    document.getElementById('details').innerHTML = branchesList
  }
  else {
    document.getElementById('details').innerHTML ="There are no branches"
  }
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  req.send();
}
