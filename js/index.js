// your code here
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.author.login + ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
      '<li>' +
      branch.name +
      '</li>'
    ).join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name + " - " +
        r.html_url + " - " +
        r.owner.login +
        ' - <a href="#" data-username="' +
        r.owner.login +
        '" - <a href="#" data-repository="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  let user = document.getElementById('username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', "https://api.github.com/users/" + user + "/repos");
  req.send();
}

function getCommits(el) {
  const userName = el.dataset.username;
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', "https://api.github.com/repos/" + userName + "/" + repoName + "/commits");
  req.send();
}

function getBranches(el) {
  const userName = el.dataset.username;
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + userName + "/" + repoName + "/branches");
  req.send();
}
