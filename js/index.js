function getRepositories() {
  const req = new XMLHttpRequest();
  const name = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + name + '/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
      '<a href=' + 'https://github.com/'+ r.full_name +'>' + r.name + '</a>'+ '<br>'+
      ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' +
      ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
      '<li><strong>' +
      commit.commit.author.name + ' - ' +
      commit.author.login + '</strong> - ' +
      commit.commit.message +
      '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>' + branch.name + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
