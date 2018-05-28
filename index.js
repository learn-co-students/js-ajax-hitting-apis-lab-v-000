
function getRepositories(){
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/users/' + username.value + '/repos')
  req.send()
}

function displayRepositories(event,data){

  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = repos.map(r => {
    return '<li>' + r.full_name + ' - <a href="#" data-repo="' + r.html_url + '" onclick="getCommits(this)">Get Commits</a></li>'}).join('')
  document.getElementById("repositories").innerHTML = repoList

}


function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = commits.map(commit =>{
    return '<li><strong>' + commit.author.login  + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>'}).join('')

  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const repo_name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/'+ username + '/' + repo_name + '/branches')
  req.send()
}
function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = branches.map(branch =>{return branch.name})
  document.getElementById("details").innerHTML = branchesList

}
