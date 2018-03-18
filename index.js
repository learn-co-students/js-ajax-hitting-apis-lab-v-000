const apiURL = "https://api.github.com/"

function getRepositories(){ 
  let userName = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", apiURL + 'users/' + userName + '/repos')
  req.send()
}

function displayRepositories(event, data){
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li><a href src="https://github.com/' + r.owner.login + '/' + r.name + '">' + r.name + '</a> - <a href src="#" data-repository="'+ r.name + '" data-username="' + r.owner.login + '" data-commit-url="'+r.url+'/commits" onclick="getCommits(this);return false;">Get Commits</a> - <a href src="#" data-repository="'+ r.name + '" data-username="' + r.owner.login + '" data-branches-url="'+r.url+'/branches" onclick="getBranches(this); return false;">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el){
  const req = new XMLHttpRequest();
  const username = el.dataset.username
  const repository = el.dataset.repository
  req.addEventListener("load", displayCommits);
  req.open("GET", apiURL + "repos/" + username + "/" + repository + "/commits");
  // req.open("GET", el.dataset.commitUrl);
  req.send();
}

function displayCommits(event, data){  
  let commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit=> '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList;
  
}

function getBranches(el){
  const username = el.dataset.username
  const repository = el.dataset.repository
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", apiURL + "repos/" + username + "/" + repository + "/branches");
  req.send()
}

function displayBranches(event, data){
let branches = JSON.parse(this.responseText);
const branchesList = `<ul>${branches.map(b=> '<li>' + b.name+ '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
