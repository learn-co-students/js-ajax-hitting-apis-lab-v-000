const rootURL = "https://api.github.com"
function getRepositories(){
    const req = new XMLHttpRequest();
    let username = document.getElementById("username").value;
    req.addEventListener("load", displayRepositories);
    req.open("GET",'https://api.github.com/users/' + username + '/repos')
    req.send();
}

function displayRepositories(){
    let repos = JSON.parse(this.responseText)
    //console.log(repos)
    const repoList = `<ul>${repos.map(repo=>'<li>' + repo.name + ' - https://github.com/' + repo.full_name + ' <a href="#" data-repo="' + repo.name + '" data-username="' + repo["owner"]["login"]   + '" onclick="getCommits(this)">Get Commits</a>' + ' <a href="#" data-repo="' + repo.name + '" data-username="' + repo["owner"]["login"] + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
    const repoName = el.dataset.repository
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayCommits)
    xhr.open("GET", uri)
    xhr.send()
  }

function displayCommits(){
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit=>'<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>')}</ul>`;
    document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
    const repoName = el.dataset.repository
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayBranches)
    xhr.open("GET", uri)
    xhr.send()
  }
  function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList
  }
