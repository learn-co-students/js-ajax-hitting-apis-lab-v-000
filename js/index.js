// your code here
function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      repo =>
      '<li>' +
      repo.name +
      ' <a href="' +
      repo.html_url +
      '">Get Repo</a><br>' +
      ' <a href="#' +
      '" data-username="' +
      repo.owner.login +
      '" data-repository="' +
      repo.name +
      '" onclick="getCommits(this)">Get Commits</a><br>' +
      ' <a href="#' +
      '" data-username="' +
      repo.owner.login +
      '" data-repository="' +
      repo.name +
      '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><strong>' +
      commit.commit.author.name +
      ' ' +
      commit.author.login +
      '</strong> - ' +
      commit.commit.message +
      '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function getRepositories() {
  const name = document.getElementById('username').value;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + name + '/repos');
  req.send();
}

function getCommits(element) {
  const name = element.dataset.username;
  const repo = element.dataset.repository;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/commits');
  req.send();
}

function getBranches(element) {
  const name = element.dataset.username;
  const repo = element.dataset.repository;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + name + '/' + repo + '/branches');
  req.send();
}
