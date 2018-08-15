// Request
function getRepositories() {
  const username = document.getElementsByName('username')[0].value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/"+username+"/repos");
  req.send();
}

// Response
// called within getRepos: Handle + Display
function displayRepositories(event, data) {
  // parse responseText as JSON
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  // iterate and format the output
  const repoList = `<ul>${repos.map(r => `<li>${r.name} - <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a></li><li>${r.html_url}</li><li><a href="#" onclick="getBranches(this)">Get Branches</a>`)}</ul>`
  // place the formatted output into our DOM
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repo + '/commits');
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
 document.getElementById("details").innerHTML = commitList
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repo + '/branches');
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}
