// your code here

function getRepositories(){
  
  const username = document.getElementById("username").value;
  //xmlRequest
  const req = new XMLHttpRequest();
  
  //listener for shower to act on
  req.addEventListener('load', displayRepositories);
  
  //abstracted link to url
  const url = `https://api.github.com/users/${username}/repos`;
  
  //open with abstracted url
  req.open('GET', url)
  
  //send request 
  req.send()
}

function displayRepositories(){
  //parse JSON file
  var repos = JSON.parse(this.responseText);
  
  //print readable JSON
  console.log(repos);
  
  //map list of repositories to const  
  const repoList = `<ul>${repos.map(r => "<li>" +
        `<a href="https://github.com/${r.full_name}">${r.full_name}</a>` +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get branches</a>' +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  
  //set element in index.html to stored repositories const
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  const username = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  
  req.addEventListener('load', displayCommits);
  
  const url = `https://api.github.com/repos/${username}/${name}/commits`;
  
  req.open('GET', url);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + " - " + commit.author.login + '</li>').join('')}</ul>`;
  
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const username = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  
  req.addEventListener('load', displayCommits);
  
  const url = `https://api.github.com/repos/${username}/${name}/branches`;
  
  req.open('GET', url);
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  
  document.getElementById('details').innerHTML = branchesList;
}