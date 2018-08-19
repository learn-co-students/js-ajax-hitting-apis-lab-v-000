function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;
  
  req.addEventListener("load", displayRepositories);
  
  req.open("GET", 'https://api.github.com/users/' + username +'/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  
  const repoList = `<ul> ${ repos.map (r => 
  '<li>' + r.name + ' - <a href="' + r.html_url +'"></a>'
     + ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '"' +'" onclick="getCommits(this)">Get Commits</a>'
     + ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '"' +'" onclick="getBranches(this)">Get Branches</a></li>'
   ).join('')}</ul>`;
  
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(com) {
  const name = com.dataset.repository;
  const req = new XMLHttpRequest();
  const username = com.dataset.username;
  
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ username +'/' + name + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  
  // for each commit, the list item starts with author name (author login)
  // then the commit message
  
  const commitList = `<ul>${commits.map(commit => 
  '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(br) {
  const name = br.dataset.repository;
  const req = new XMLHttpRequest();
  const username = br.dataset.username;
  
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/'+ username +'/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${ branches.map(branch => 
  '<li>' + branch.name + '</li>').join('') }</ul>`;

  document.getElementById("details").innerHTML = branchList
}