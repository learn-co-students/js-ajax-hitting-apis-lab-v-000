// your code here
function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li><a href="' + r.html_url + '">' + r.name + '</a><br><a href ="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" onclick="getBranches(this)" data-username="' + r.owner.login + '" data-repository="' + r.name + '">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchList = `<ul>${branches.map(
    b =>
      '<li>' + b.name + '<li>'
  ).join('')}<ul>`;
  document.getElementById('details').innerHTML = branchList
}

function getBranches(el) {
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/branches');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits);
  const commitList = `<ul>${commits.map( c =>
    '<li>' + c.author.login + '-' + c.commit.author.name + '-' + c.commit.message + '</li>'
  ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
  req.send();
}

function getRepositories() {
  const username = document.getElementById('username').value;
  req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos');
  req.send();
}
