function getRepositories(){
  const user = document.getElementById("username").value
  const url = "https://api.github.com/users/" + user + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}
function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '>' + r.name + '</a>'+ r.owner.login + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' + ' - '+'<a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
function getCommits(el){
  const data = el.dataset;
  const name = data.repository;
  const username = data.username;
  const url = 'https://api.github.com/repos/' + username + '/' + name + '/commits'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}
function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + " - " + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
function getBranches(el){
  const data = el.dataset;
  const name = data.repository;
  const username = data.username;
  const url = 'https://api.github.com/repos/' + username + '/' + name + '/branches'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}
function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchList;
}
