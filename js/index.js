function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + document.getElementById('username').value + '/repos');
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = '<ul>';
  for (var i = 0; i < repos.length; i++) {
    repoList += '<li><a href="' + repos[i]['html_url'] + '">' + repos[i]['name'] + '</a> <a href="#" data-repository="' + repos[i]['name'] + '" data-username="' + repos[i]['owner']['login'] + '" onclick="getCommits(this)">Commits</a> <a href="#" data-repository="' + repos[i]['name'] + '" data-username="' + repos[i]['owner']['login'] + '" onclick="getBranches(this)">Branches</a></li>';
  }
  repoList += '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  console.log('worked');
  let repo = el.dataset.repository;
  let username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  console.log(commits);
  let commitList = '';
  for (var i = 0; i < commits.length; i++) {
    commitList += '<ul><li>' + commits[i].committer.login + '</li><li>' + commits[i]['commit']['author']['name'] + '</li><li>' + commits[i]['commit']['message'] + '</li></ul>';
  }
  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  console.log('worked');
  let repo = el.dataset.repository;
  let username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repo + '/branches');
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  console.log(branches);
  let branchList = '<ul>';
  for (var i = 0; i < branches.length; i++) {
    branchList += '<li>' + branches[i].name + '</li>';
  }
  document.getElementById('details').innerHTML = branchList;
}
