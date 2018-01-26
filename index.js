//My Code: works but does not pass test specs due to specificity of tests.

//function getRepositories () {
//  var username = document.getElementById("username").value;
//  const req = new XMLHttpRequest()
//  req.addEventListener("load", displayRepositories); //when the event fires showRepositories() gets called.
//  req.open("GET", `https://api.github.com/users/${username}/repos`)
//  req.send()
//}

//function displayRepositories(event, data) {
//  //this is set to the XMLHttpRequest object that fired the event
//  var repos = JSON.parse(this.responseText) //this tells the program that it is working with a JSON object
//  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>'
//  + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
//  document.getElementById("repositories").innerHTML = repoList

//}

//function getCommits(el) {
//  var username = document.getElementById("username").value;
//  const name = el.dataset.repo
//  const req = new XMLHttpRequest()
//  req.addEventListener("load", displayCommits)
//  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits')
//  req.send()
//}

//function displayCommits() {
//  const commits = JSON.parse(this.responseText)
//  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
//  document.getElementById("details").innerHTML = commitsList
//}

//function getBranches (el) {
//  var username = document.getElementById("username").value;
//  const name = el.dataset.repo
//  const req = new XMLHttpRequest()
//  req.addEventListener("load", displayBranches)
//  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/branches')
//  req.send()
//}

//function displayBranches() {
//  const branches = JSON.parse(this.responseText)
//  const branchesList = `<ul>${branches.map(branches => '<li><strong>' + branches.name + '</strong> - ' + '</li>').join('')}</ul>`
//  document.getElementById("details").innerHTML = branchesList
//}

//Solution

const rootURL = "https://api.github.com"

function getRepositories() {
  const name = document.getElementById("username").value
  const uri = rootURL + "/users/" + name + "/repos"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}
function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}
function getCommits(el) {
  const repoName = el.dataset.repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}
function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
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
