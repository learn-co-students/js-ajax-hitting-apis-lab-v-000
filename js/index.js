// your code here
function getRepositories() {
  //
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  //debugger
  const username = document.getElementById('username').value;
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function displayRepositories() {
  //debugger
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>

        '<li><a href=' + r.html_url + '>' + r.name + '</a> ' +
        '<a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' +
        ' <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'

    )
    .join('')}</ul>`;
  //const repoList = "https://github.com/octocat/Hello-World"
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits (el) {
  //debugger
  const username = document.getElementById('username').value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  // replace octocat with name
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  //debugger

  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' + commit.commit.author.name + commit.author.login + '</strong>' + commit.commit.message + '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches (el) {
  //debugger
  const username = document.getElementById('username').value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  // replace octocat with name
  //GET /repos/:owner/:repo/branches
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}

function displayBranches () {
  //debugger
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' + branch.name + '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
