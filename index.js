const rootURL = 'https://api.github.com/users/';

function getRepositories() {
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}
function getRepositories(){
  let username = document.getElementById("username").value;
  let url = rootURL + `${username}` + "/repos";
  const req = new XMLHttpRequest()  
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText)
  let repoList = "<ul>" + repos.map(repo =>{
    let dataUserName = 'data-username="' + repo.owner.login + '"'
    let dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataUserName} ${dataRepoName} onclick="getCommits(this)"> Get Commits </a><br>
            <a href="#" ${dataUserName} ${dataRepoName} onclick="getBranches(this)"> Get Branches </a>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  const repoName = el.dataset.repository + '/'
  const username = el.dataset.username + '/'
  const req = new XMLHttpRequest()
  const url = 'https://api.github.com/' + 'repos/' + username + repoName
  req.addEventListener("load", displayCommits)
  req.open("GET", `${url}` + 'commits')
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
//GET /repos/:owner/:repo/branches/:branch
function getBranches(el){
  const repoName = el.dataset.repository + '/'
  const username = el.dataset.username + '/'
  const req = new XMLHttpRequest()
  const url = 'https://api.github.com/' + 'repos/' + username + repoName + 'branches'
  req.addEventListener("load", displayBranches)
  req.open("GET", `${url}`)
  req.send()
}

function displayBranches(el){
  let branches = JSON.parse(this.responseText)
  let branchesList = `<ul> ${branches.map(branch => '<li><h3>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}




