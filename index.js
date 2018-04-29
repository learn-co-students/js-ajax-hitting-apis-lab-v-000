function displayRepositories(){
  console.log(this.responseText);
  var repos = JSON.parse(this.responseText);

  var repoList = "<ul>";
  for (var i = 0; i < repos.length; i++){
    repoList += `<li> ${repos[i]["name"]} ${repos[i]["html_url"]} <a href="#" data-repository=${repos[i]["name"]} data-username=${repos[i]["owner"]["login"]} onclick="getCommits(this)">Get Commits</a> <a href="#" data-repository=${repos[i]["name"]} data-username=${repos[i]["owner"]["login"]} onclick="getBranches(this)">Get Branches</a></li>`;
  }
  repoList += "</ul>";
  document.getElementById("repositories").innerHTML = repoList;

}

function getRepositories(){
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();

  const url = `https://api.github.com/users/${username}/repos`;
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();
}

function displayCommits(){
  var commits = JSON.parse(this.responseText);
  var commitList = "<ul>";

  for (var i = 0; i < commits.length; i++){
    const githubName = commits[i]["committer"]["login"]
    const fullName =commits[i]["commit"]["committer"]["name"]
    const message = commits[i]["commit"]["message"]
    commitList += `<li> ${githubName} ${fullName} ${message} </li>`

  }

  commitList += "</ul>";
  document.getElementById("details").innerHTML = commitList;
}

function getCommits(el){
  console.log(el);
  const repo = el.dataset.repository;
  const username = el.dataset.username;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits');
  req.send();

}

function displayBranches(){

  const branches = JSON.parse(this.responseText);
  

  var branchesList = "<ul>";
  for (var i = 0; i < branches.length; i++){
    branchesList += `<li> ${branches[i]["name"]} </li>`;
  }
  branchesList += "</ul>"

  document.getElementById("details").innerHTML += branchesList;

}

function getBranches(el){
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/' + repo + '/branches');
  req.send();

}
