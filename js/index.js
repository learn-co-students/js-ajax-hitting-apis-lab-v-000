// your code here

//Callback Functions
function displayCommits() {
 console.log('In display commits');
 let commits = JSON.parse(this.responseText);
 //github name(c.committer.login), author's full name(c.commit.author.name) and commit message(c.commit.message)
 const commitList = `<ul> ${commits.map(c => '<li>' + c.author.login + '-' + c.commit.author.name + '-' + c.commit.message + '</li>').join('')}</ul>`
 document.getElementById('details').innerHTML = commitList;
}

function displayBranches() {
  console.log('In display Branches');
  const branches = JSON.parse(this.responseText);
  //name of branch
  const branchList = `<ul> ${branches.map(b => '<li>' + b.name + '</li>' ).join('')}</ul>`
  document.getElementById('details').innerHTML = branchList;
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  debugger
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + '-' + repo.html_url +                              //username(repo.owner.login) and repo(repo.name)
' - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList;
}


//Requests
function getRepositories() {
  const username = document.getElementById('username').value;

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);

  req.open('GET', 'https://api.github.com/users/' + username +'/repos');
  req.send();
}

function getCommits(element) {
  const owner = element.dataset.username;
  const repo = element.dataset.repository;

  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);
  //GET /repos/:owner/:repo/commits
  req.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo + '/commits');
  req.send();
}

function getBranches(element) {
  const owner = element.dataset.username;
  const repo = element.dataset.repository;

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  //GET /repos/:owner/:repo/branches
  req.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo + '/branches');
  req.send();
}
