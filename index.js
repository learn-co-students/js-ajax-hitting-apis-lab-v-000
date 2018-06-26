

function username() {
  let username = document.getElementById('username').value;
  return username
}


function getRepositories() { 
  const req = new XMLHttpRequest();
 
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/'+ username() +'/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' url: ' + '<a href="' + r.url +'">Repo</a>'  + ' Author: ' + username() + ' - <a href="#" data-user="'+ username() +'" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}


function getCommits(el) {  
  const repoName = el.dataset.repo
  const user = el.dataset.user;

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+ user + '/' + repoName + '/commits')
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ol>${commits.map(commit => '<li>Name: ' + commit.commit.author.name + ' Username: ' + commit.author.login + ' Message: ' + commit.commit.message + '</li> </br>').join('')}</ol>`
  document.getElementById('details').innerHTML = commitsList
}