function showRepositories(event, data){
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href="' + r.html_url + '"> ' + r.name  + '</a> - <a href="#" data-repo= "' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo= "' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function showCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' - ' + commit.commit.message + '</li>' ).join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function showBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branches => '<li>' + branches.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}

function getRepositories(){
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits(el){
  document.getElementById("details").innerHTML = "";
  const username = document.getElementById('username').value;
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function getBranches(el){
  document.getElementById("details").innerHTML = "";
  const username = document.getElementById('username').value;
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}
