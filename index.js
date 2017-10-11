function getRepositories() {
  let user = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `${'https://api.github.com/users/' + user + '/repos'}`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  // console.log(repos);
  var repoList = `<ul>${repos.map(r => '<li>' + r.name + " " + r.html_url + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a><br><a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository
  let user = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `${'https://api.github.com/repos/' + user + '/' + repoName + '/commits'}`);
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  // console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + " " + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join("")}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository
  let user = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `${'https://api.github.com/repos/' + user + '/' + repoName + '/branches'}`);
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  //console.log(branches);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList;
}
