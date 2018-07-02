function getRepositories(){
 let username = document.getElementById("username").value
 const req = new XMLHttpRequest();
 req.addEventListener("load", displayRepositories);
 req.open("GET", "https://api.github.com/users/" + username + "/repos")
 req.send();
}

function displayRepositories(e, data){
 const repos = JSON.parse(this.responseText);
 console.log(repos)
 const repoList = `<ul>${repos.map(r => '<li> <b>Name:</b> ' + r.name + '<br> <b>URL:</b> ' + 
 '<a href="' + r.html_url + '">' + r.html_url + '</a><br>' + 
 '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + 
 '" onclick="getCommits(this)"> Get Commits </a><br><a href="#" data-username="' + r.owner.login + 
 '" data-repository="' + r.name + '" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`
 document.getElementById("repositories").innerHTML = repoList
}

function getCommits(user) {
  const username = user.dataset.username;
  const repoName = user.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits) 
  req.open("GET", 'https://api.github.com/repos/' + username + "/" + repoName + '/commits')
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><strong> ' + commit.author.login + '</strong>' + '<br>' 
    + '<em>' + commit.commit.author.name + '</em>' + '<br>'
    + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
}

//GET /repos/:owner/:repo/branches
function getBranches(user){
 let username = user.dataset.username;
 const repoName = user.dataset.repository;
 const req = new XMLHttpRequest();
 req.addEventListener("load", displayBranches);
 req.open("GET", "https://api.github.com/repos/" + username + "/" + repoName + "/branches");
 req.send();
 
}

function displayBranches(){
 const branches = JSON.parse(this.responseText);
 console.log(branches);
 const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
 document.getElementById("details").innerHTML = branchesList
}