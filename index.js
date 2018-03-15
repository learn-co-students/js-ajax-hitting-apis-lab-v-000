const rootURL = "https://api.github.com"

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function displayRepositories() {
 const repos = JSON.parse(this.responseText)
 const repoList = "<ul>" + repos.map(repo => {
  const username = repo.owner.login
  const repoName = repo.name

  return(`
   <li>
   <h2>${repo.name}</h2>
   <a href="${repo.html_url}">${repo.html_url}</a><br>
   <a href="#" data-repository=${repoName} data-username=${username} onclick="getCommits(this)">Get Commits</a><br>
   <a href="#" data-repository=${repoName} data-username=${username} onclick="getBranches(this)">Get Branches</a></li>
   </li>`
  )
 }) + "</ul>"
 document.getElementById("repositories").innerHTML = repoList
}

function getCommits (el) {

  const repoName = el.dataset.repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + el.dataset.repository + "/commits"

  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}

function displayCommits () {

  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = `${rootURL}/repos/${el.dataset.username}/${repoName}/branches`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()

}

function displayBranches () {
 //GET /repos/:owner/:repo/branches
 const branches = JSON.parse(this.responseText)
 const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`

 document.getElementById("details").innerHTML = branchesList

}
