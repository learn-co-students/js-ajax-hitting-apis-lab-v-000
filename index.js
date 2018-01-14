
function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href=' + r.html_url+ '>' + r.name + '</a> - <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + '- <a href="#" data-repo="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/'+ username + '/repos');
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name +' - '+ commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el){
  const repoName = el.dataset.repository
  const username = el.dataset.username
  // var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/commits');
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches(el){
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repoName + '/branches');
  req.send()
}
