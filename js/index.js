// your code here
function getRepositories() {
  let req = new XMLHttpRequest();
  let username = document.querySelector('input').value;

  req.addEventListener('load', displayRepositories);

  req.open('GET', 'https://api.github.com/users/' + username + '/repos');

  req.send;
}


function displayRepositories() {
  const myRepos = JSON.parse(this.responseText);

  console.log(myRepos);

  const repoList = `<ul> ${myRepos.map( repo =>
    '<li>' + repo.name + '- <a href="' + repo.html_url + '">' + repo.html_url + '</a> - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + repo.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;

    document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();

  req.addEventListener('onclick', displayCommits);

  req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits');

  req.send;
}


function displayCommits() {
  const myCommits = JSON.parse(this.responseText);
  const commitList = `<ul> ${myCommits.map( commit =>
    '<li><strong>' + commit.commit.author.name + '</strong>' + commit.author.login + ' ' + commit.commit.message + '</li>').join('')}</ul>`;

  document.getElementById('details').innerHTML = commitList;
}


function getBranches(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();

  req.addEventListener('onclick', displayBranches);

  req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches');

  req.send;
}


function displayBranches() {
  const myBranches = JSON.parse(this.responseText);
  const branchesList = `<ul> ${myBranches.map( branch =>
    '<li>' + branch.name + '</li>').join('')}</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}
