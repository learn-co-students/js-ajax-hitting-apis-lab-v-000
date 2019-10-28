// your code here
function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(repo =>
        '<li><h2>' + repo.name + '</h2>' +
        '<a href="' + repo.html_url + '">' + repo.html_url + '</a><br>' +
        '<a href="#" data-repository="' + repo.name + '" ' + 'data-username="' + repo.owner.login + '"' + '" onclick="getCommits(this)"> Get Commits</a><br>' +
        '<a href="#" data-repository="' + repo.name + '" ' + 'data-username="' + repo.owner.login + '"' + '" onclick="getBranches(this)"> Get Branches</a><br>' +
        '</li>'
    ).join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element) {
  const name = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + element.dataset.username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(commit =>
     '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' +
     commit.commit.message + '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(element) {
  const name = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + element.dataset.username + '/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
