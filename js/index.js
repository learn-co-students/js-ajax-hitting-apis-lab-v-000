// your code here
function getRepositories(){
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+ username +'/repos');
  req.send();
}

function displayRepositories(){
  document.getElementById('repositories').innerHTML = ""
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = `<ul>${repos.map(r =>
  '<li>https://github.com/'+ r.owner.login + '/'+ r.name +
  '<a href="#" onclick="getCommits(this)" data-repository="' + r.name +'" data-username="'+r.owner.login+'">Commits </a>'+
  '<a href="#" onclick="getBranches(this)" data-repository="' + r.name +'" data-username="'+r.owner.login+'">Branches</a></li>').join(" ")}</ul>`;
  document.getElementById('repositories').innerHTML += repoList;
}

function getCommits(el){
  let username = el.dataset.username;
  let repo = el.dataset.repository;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+ username +'/' + repo + '/commits');
  req.send();
}

function displayCommits(){
  document.getElementById("details").innerHTML = ""
  let commits = JSON.parse(this.responseText);
  let commitList = `<ul>${commits.map(function (c){
    if (c.author === null) {
      return '<li>Log In: Unknown' + ' Name: ' + c.commit.committer.name + ' Commit Message: ' + c.commit.message +'</li>'
    } else{
      return '<li>Log In: ' + c.author.login + ' Name: ' + c.commit.committer.name + ' Commit Message: ' + c.commit.message + '</li>'
    }
}).join(" ")}`;
  document.getElementById("details").innerHTML += commitList;
}

function getBranches(el){
  let username = el.dataset.username;
  let repo = el.dataset.repository;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/'+ username +'/' + repo + '/branches');
  req.send();
}

function displayBranches(){
  document.getElementById("details").innerHTML = ""
  let branches = JSON.parse(this.responseText);
  let branchesList = `<ul>${branches.map(b =>
  '<li>'+ b.name + '</li>').join(" ")}</ul>`;
  console.log(branchesList);
  document.getElementById('details').innerHTML += branchesList;
}
