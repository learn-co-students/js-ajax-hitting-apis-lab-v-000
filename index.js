const rootURL = "https://api.github.com"

function getRepositories() {
   const name = document.getElementById("username").value
   //debugger 
   const uri = rootURL + "/users/" + name + "/repos"
   const xhr = new XMLHttpRequest()
   xhr.addEventListener("load", displayRepositories);
   xhr.open("GET", uri)
   xhr.send()
   return false;
}



function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  //const repoList = `${repos.map(r => r)}`
  //const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  const repoList = "<ul>" + repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return(`
          <li>
            <h2>${r.name}</h2>
            <a href="${r.html_url}">${r.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>"; 
  document.getElementById("repositories").innerHTML = repoList
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

function getCommits(el) {
    //debugger
    const user = el.dataset.username
    const name = el.dataset.repository 
    //debugger
    const uri = rootURL + "/repos/" + user + "/" + name + "/commits"
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", uri)
    req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText)
  //debugger
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
  
}

