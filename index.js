function displayRepositories(event, data) {
  let dest = document.getElementById("repositories");
  var repos = JSON.parse(this.responseText)
  console.log(repos.length)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-username="' + r.owner.login + '" data-repository='"+r.name"' onclick="getCommits(this)">"+r.html_url+"</a>- <a href='#' data-username='"+r.owner.login+"'data-repository='"+r.name+"'onclick='getBranches(this)'>Get Branches</li>').join('')}</ul>`;
  dest.innerHTML = repoList
}

function getRepositories() {
  const username = document.getElementsByName("username")[0].value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/"+username+"/repos");
  req.send();
}

function getCommits(el) {
  const repoName = el.dataset.repo;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits');
  req.send();
}

function displayCommits() {
  let dest = document.getElementById('details');
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + ' - <a href="#" data-author='"+"' onclick='getCommits(this)'>Get Commits</a></li>').join('')}</ul>`
  dest.innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repo;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches');
  get.send();
}

function displayBranches() {
  let dest = document.getElementById('details');
  const commits = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches.map(b=>"<li>"+b.name+"</li>")}`;
  dest.innerHTML = branchesList;
}
