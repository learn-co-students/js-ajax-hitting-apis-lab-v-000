function getRepositories(){
  const req = new XMLHttpRequest();
  const username = getUsername();
  req.addEventListener('load', displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits(el){
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send();
}

function getBranches(el){
  const repository = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send();
}

function getUsername(){
  return document.getElementById("username").value;
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit =>
    '<li><strong>' + 'Username: </strong>' + commit.committer.login + ' ' + '<strong>Author: </strong>'
    + commit.commit.author.name + '<strong> Message: </strong>' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch =>
    '<li><strong> Branch Name: </strong>' + branch.name + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML += branchList
}

function displayRepositories(){
  const repositories = JSON.parse(this.responseText);
  const repoList = `<ul>${repositories.map(repo =>
  `<li><a href="` + repo.html_url + `">` + repo.name + '</a> - <a href="#" onclick="getCommits(this);return false;" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '">'
  + 'Get Commits' + '</a> <a href="#" onclick="getBranches(this);return false;" data-repository="' + repo.name + '" data-username="'+ repo.owner.login + '">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}
